import requests
import os 
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path('.') / 'googleApi.env')

API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

def reverse_geocode(lat,lng):
    url = f"https://maps.googleapis.com/maps/api/geocode/json"
    
    params = {
        "latlng" : f"{lat},{lng}",
        "key":API_KEY
    }

    response = requests.get(url, params=params).json()


    if response["status"] != "OK":
        return None 
    
    components = response["results"][0]["address_components"]

    data = {
        "route": None,
        "neighbourhood": None,
        "sublocality": None,
        "locality": None,
        "city": None,
        "postal_code": None
    }

    for c in components:
        types = c["types"]

        if "route" in types:
            data["route"] = c["long_name"]
        if "neighborhood" in types:
            data["neighborhood"] = c["long_name"]
        if "sublocality" in types:
            data["sublocality"] = c["long_name"]
        if "locality" in types:
            data["city"] = c["long_name"]
        if "postal_code" in types:
            data["postal_code"] = c["long_name"]

    return data