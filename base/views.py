from html import entities
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .mongo import grievances_collection
from .nlp import google_entity_check
# Create your views here.

@api_view(['POST'])
def create_grievances(request):
    data = request.data

    if not data.get("category") or not data.get("description"):
        return Response(
            {"error": "Category and description are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    grievance = {
        'category': data.get('category'),
        'description': data.get('description'),
        'location' : data.get('location',{}),
        'status' : 'Submitted',
        'flagged': False,
        'created_at': datetime.now(),
    }

    entities = google_entity_check(data.get("description"))

    if entities:
        return Response(
            {
                "error": "Your grievance contains potentially identifying information.",
                "entities": entities
            },
            status=status.HTTP_400_BAD_REQUEST
        )

    grievances_collection.insert_one(grievance)

    return Response(
        {"message": "Grievance created successfully"},
        status=status.HTTP_201_CREATED
    )