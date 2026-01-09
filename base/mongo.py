import os
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(dotenv_path=Path('.') / 'googleApi.env')

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client['grievance_db']
grievances_collection = db['grievances']

