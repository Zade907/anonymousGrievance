from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes

from .mongo import grievances_collection
from .nlp import is_sensitive_google, google_entity_check
from .geocode import reverse_geocode
from .ml import is_sensitive_ml
from .firebase import upload_image  
import uuid 

# Create your views here.

@api_view(['POST', 'GET'])
@parser_classes([MultiPartParser, FormParser])
def create_grievances(request):
    if request.method == 'GET':
        filters = {}

        city = request.GET.get('city')
        category = request.GET.get('category')
        postal_code = request.GET.get('postal_code')
        status_filter = request.GET.get('status')
        date_str = request.GET.get('date')  # Format: YYYY-MM-DD
        sort_order = request.GET.get('sort', 'latest')

        if city:
            filters['location.city'] = city
        if category:
            filters['category'] = category
        if postal_code:
            filters['location.postal_code'] = postal_code
        if status_filter:
            filters['status'] = status_filter
        
        if date_str:
            try:
                # Parse date and match complaints created on that day
                day_start = datetime.strptime(date_str, "%Y-%m-%d")
                from datetime import timedelta
                day_end = day_start + timedelta(days=1)
                filters['created_at'] = {
                    "$gte": day_start,
                    "$lt": day_end
                }
            except ValueError:
                pass

        # Determine sort ordering
        # default to latest (created_at desc)
        sort_field = [("created_at", -1)]
        if sort_order == 'oldest':
            sort_field = [("created_at", 1)]

        grievances = list(grievances_collection.find(filters, {'_id': 0}).sort(sort_field))
        return Response(grievances)

    data = request.data

    if not data.get("category") or not data.get("description"):
        return Response(
            {"error": "Category and description are required"},
            status=status.HTTP_400_BAD_REQUEST
        )
    

    lat = data.get('latitude')
    lng = data.get('longitude')

    location = reverse_geocode(lat, lng)

    is_sensitive, entity_name = is_sensitive_google(data.get("description"))

    if is_sensitive:
        return Response(
            {
                "error": "Your grievance contains potentially identifying information.",
                "flagged_entity": entity_name
            },
            status=status.HTTP_400_BAD_REQUEST
        )


    ml_flag = is_sensitive_ml(data.get("description"))

    if ml_flag:
        return Response(
            {"error": "Your grievance contains sensitive information"},
            status=400
        )

    image_url = None
    if 'image' in request.FILES:
        image = request.FILES['image']
        filename = f"{uuid.uuid4()}_{image.name}"
        image_url = upload_image(image, filename)

    grievance = {
        'category': data.get('category'),
        'description': data.get('description'),
        "location": location,
        'image_url': image_url,
        'status' : 'Submitted',
        'flagged': False,
        'created_at': datetime.now(),
    }

    grievances_collection.insert_one(grievance)

    return Response(
        {"message": "Grievance created successfully"},
        status=status.HTTP_201_CREATED
    )



