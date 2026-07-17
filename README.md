# 🛡️ Civic Shield

An AI-powered anonymous grievance platform designed to enable citizens to report issues securely and efficiently.

---

## 🚀 Overview

Civic Shield allows users to submit complaints anonymously while leveraging AI to automatically classify content and enrich location data. The system is designed to be scalable, secure, and easy to use for public grievance redressal.

---

## ✨ Features

- 🛡️ Anonymous grievance submission
- ⚡ RESTful APIs for real-time submission and retrieval
- 🧠 AI-based content classification using Google Natural Language API
- 📍 Location tagging using Google Geocoding / Maps API
- 🖼️ Multimedia support with Firebase image uploads
- 🔐 Secure and scalable backend architecture

---

## 🛠️ Tech Stack

| Layer     | Technology                                      |
|-----------|-------------------------------------------------|
| Frontend  | React 19 + Vite                                 |
| Backend   | Django 5.2 + Django REST Framework              |
| Database  | MongoDB Atlas + SQLite (Django internal)        |
| ML        | scikit-learn (TF-IDF + Logistic Regression)     |
| APIs      | Google Natural Language, Google Maps Geocoding  |
| Cloud     | Firebase Storage                                |

---

## 📂 Project Structure

```
anonymousGrievance/
├── Backend/
│   ├── anonymousGrievance/   # Django project settings & URLs
│   ├── base/                 # Main Django app (views, models, NLP, ML, Firebase)
│   │   ├── firebase.py
│   │   ├── geocode.py
│   │   ├── ml.py
│   │   ├── mongo.py
│   │   ├── nlp.py
│   │   └── views.py
│   ├── data/                 # Training data (grievances.csv)
│   ├── manage.py
│   ├── train_model.py        # Script to train and save the ML model
│   ├── model.pkl             # Pre-trained ML model
│   ├── vectorizer.pkl        # Pre-trained TF-IDF vectorizer
│   ├── firebase_key.json     # Firebase service account key (not committed)
│   ├── google_key.json       # Google Cloud service account key (not committed)
│   ├── googleApi.env         # Environment variables file
│   └── requirements.txt
└── frontend/
    ├── src/
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Python 3.10+
- Node.js 18+
- A MongoDB Atlas account and connection URI
- A Firebase project with Storage enabled + service account key (`firebase_key.json`)
- A Google Cloud project with **Natural Language API** and **Geocoding API** enabled + service account key (`google_key.json`)

---

### 🔧 Backend Setup

#### 1. Clone the repository

```bash
git clone https://github.com/Zade907/anonymousGrievance
cd anonymousGrievance
```

#### 2. Create and activate a virtual environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### 3. Install Python dependencies

```bash
cd Backend
pip install -r requirements.txt
```

#### 4. Add credential files

Place the following files inside the `Backend/` directory (these are **not committed** to git):

- `firebase_key.json` — Firebase service account key
- `google_key.json` — Google Cloud service account key

#### 5. Configure environment variables

Create (or update) `Backend/googleApi.env` with the following keys:

```env
GOOGLE_API_KEY=your_google_api_key
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
MONGO_URI=your_mongodb_atlas_uri
```

#### 6. (Optional) Train the ML model

> Skip this step if `model.pkl` and `vectorizer.pkl` already exist.

```bash
# From inside the Backend/ directory
python train_model.py
```

#### 7. Run database migrations

```bash
python manage.py migrate
```

#### 8. Start the Django development server

```bash
python manage.py runserver
```

The backend will be available at: **http://localhost:8000**

---

### 🎨 Frontend Setup

#### 1. Navigate to the frontend directory

```bash
cd frontend
```

#### 2. Install Node.js dependencies

```bash
npm install
```

#### 3. Start the Vite development server

```bash
npm run dev
```

The frontend will be available at: **http://localhost:5173**

---

## 🔌 API Endpoints

| Method | Endpoint      | Description                        |
|--------|---------------|------------------------------------|
| `POST` | `/grievance/` | Submit an anonymous grievance      |
| `GET`  | `/grievance/` | Retrieve grievances (with filters) |

### Query Parameters for `GET /grievance/`

| Parameter     | Description                  |
|---------------|------------------------------|
| `city`        | Filter by city name          |
| `category`    | Filter by grievance category |
| `postal_code` | Filter by postal code        |
| `status`      | Filter by status             |

---

## 📌 Future Improvements

- Admin dashboard for moderation
- Real-time analytics
- Notification system

---

## 👨‍💻 Author

Developed as part of a project exploring AI-driven public systems.
