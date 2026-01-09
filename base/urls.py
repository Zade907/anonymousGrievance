from django.urls import path
from .views import create_grievances

urlpatterns = [
    path("grievances/", create_grievances),
]

