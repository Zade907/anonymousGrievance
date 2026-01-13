import os
from google.cloud import language_v1
from dotenv import load_dotenv
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=BASE_DIR / "googleApi.env")


client = language_v1.LanguageServiceClient()

def google_entity_check(text):
    

    document = language_v1.Document(
        content=text,
        type_=language_v1.Document.Type.PLAIN_TEXT
    )

    response = client.analyze_entities(
        request={
            "document": document,
            "encoding_type": language_v1.EncodingType.UTF8
        }
    )

    entities = []

    for entity in response.entities:
        entities.append({
            "name": entity.name,
            "type": language_v1.Entity.Type(entity.type_).name,
            "salience": entity.salience
        })

    return entities

def is_sensitive_google(text):
    entity = google_entity_check(text)

    for e in entity:
        if e['type'] in ['PERSON', 'ORGANIZATION'] and e['salience'] > 0.35:
            return True,e["name"]
        
    return False,None
