import os
from google.cloud import language_v1

os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\Users\athni\Onedrive\desktop\anonymousgrievance\google_key.json"


client = language_v1.LanguageServiceClient()

doc = language_v1.Document(
    content="Officer Rajesh at Pune police station took a bribe",
    type_=language_v1.Document.Type.PLAIN_TEXT
)

response = client.analyze_entities(request={"document": doc})

for e in response.entities:
    print(e.name, e.type_)
