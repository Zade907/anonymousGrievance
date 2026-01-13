import firebase_admin
from firebase_admin import credentials, storage, initialize_app


    # Path to your Firebase service account key JSON file
    # cred_path = "path/to/your/serviceAccountKey.json"
    
    # Initialize the Firebase app with the service account credentials
cred = credentials.Certificate("firebase_key.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'anonymous-grievance.firebasestorage.app'
    })

bucket = storage.bucket()

def upload_image(file,filename):
    blob = bucket.blob(f"grievances/{filename}")

    blob.upload_from_file(file)
    blob.make_public()

    return blob.public_url