
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime

from .mongo import grievances_collection
from .nlp import is_sensitive_google, google_entity_check
from .geocode import reverse_geocode
# Create your views here.

@api_view(['POST'])
def create_grievances(request):
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

    grievance = {
        'category': data.get('category'),
        'description': data.get('description'),
        "location": location,
        'status' : 'Submitted',
        'flagged': False,
        'created_at': datetime.now(),
    }

    grievances_collection.insert_one(grievance)

    return Response(
        {"message": "Grievance created successfully"},
        status=status.HTTP_201_CREATED
    )