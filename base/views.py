from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .mongo import grievances_collection
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
        'title': data.get('title'),
        'description': data.get('description'),
        'location' : data.get('location',{}),
        'status' : 'Submitted',
        'flagged': False,
        'created_at': datetime.datetime.now(),
    }

    grievances_collection.insert_one(grievance)

    return Response(
        {"message": "Grievance created successfully"},
        status=status.HTTP_201_CREATED
    )