"""
Django settings for anonymousGrievance project.
"""

from pathlib import Path
from dotenv import load_dotenv
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load env variables from local googleApi.env if it exists
load_dotenv(dotenv_path=BASE_DIR / "googleApi.env")

# ── Write Credentials from Env Vars at Runtime (For Cloud Deploys) ───
_google_creds_json = os.getenv("GOOGLE_CREDENTIALS_JSON")
if _google_creds_json:
    _creds_path = BASE_DIR / "google_key.json"
    _creds_path.write_text(_google_creds_json)

_firebase_creds_json = os.getenv("FIREBASE_CREDENTIALS_JSON")
if _firebase_creds_json:
    _firebase_path = BASE_DIR / "firebase_key.json"
    _firebase_path.write_text(_firebase_creds_json)

# Only set the credentials path when the file actually exists
_google_key_path = BASE_DIR / "google_key.json"
if _google_key_path.exists():
    os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = str(_google_key_path)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# ── Security & Host Config ───────────────────────────────────────────
SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-bc*rpc-&%*8s6$29zkd%v#9w^&+-@e2*scxhzrzq9&0tjhs_=")

DEBUG = os.getenv("DEBUG", "False") == "True"

ALLOWED_HOSTS_ENV = os.getenv("ALLOWED_HOSTS", "")
if ALLOWED_HOSTS_ENV:
    ALLOWED_HOSTS = [h.strip() for h in ALLOWED_HOSTS_ENV.split(",") if h.strip()]
else:
    # Wildcard subdomain match covers all *.onrender.com internal addresses
    ALLOWED_HOSTS = [".onrender.com", "anonymousgrievance.onrender.com", "localhost", "*"]

# Always allow Render's internal proxy / health-checker addresses
for _internal_host in ["127.0.0.1", "localhost", "anonymousgrievance.onrender.com"]:
    if _internal_host not in ALLOWED_HOSTS and "*" not in ALLOWED_HOSTS:
        ALLOWED_HOSTS.append(_internal_host)

# ── Application definition ───────────────────────────────────────────
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'base',
    'django_extensions',
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # WhiteNoise serving static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'anonymousGrievance.urls'

# ── CORS Config ──────────────────────────────────────────────────────
_cors_origins = os.getenv("CORS_ALLOWED_ORIGINS", "")
if _cors_origins:
    # django-cors-headers requires origins to be strictly scheme + host (no trailing slash or path)
    CORS_ALLOWED_ORIGINS = []
    for o in _cors_origins.split(","):
        origin = o.strip()
        if origin:
            # strip trailing slash if present
            if origin.endswith("/"):
                origin = origin[:-1]
            CORS_ALLOWED_ORIGINS.append(origin)
else:
    # Explicitly whitelist the deployed frontend and local Vite dev servers.
    CORS_ALLOWED_ORIGINS = [
        "https://civic-shield-kappa.vercel.app",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    CORS_ALLOW_ALL_ORIGINS = False

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates',
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'anonymousGrievance.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
