import os

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
PROJECT_APP_PATH = os.path.dirname(os.path.abspath(__file__)) # {project_root}/asapsports
PROJECT_APP = os.path.basename(PROJECT_APP_PATH) # asapsports
PROJECT_ROOT = BASE_DIR = os.path.dirname(PROJECT_APP_PATH) # {project_root} ex. /home/aidan/ASAP-Sports/django

# SECURITY WARNING: keep the secret key used in production secret!
secret_key_path = f'{PROJECT_APP_PATH}/secret_key.txt'
if os.path.exists(secret_key_path):
    with open(secret_key_path) as f:
        SECRET_KEY = f.read()
else:
    import secrets
    chars = 'abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)'
    SECRET_KEY = ''.join([chars[secrets.randbelow(len(chars))] for _ in range(50)])
    with open(secret_key_path, 'w') as f:
        f.write(SECRET_KEY)

APP_NAME = 'asapsports'

DEBUG = False
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
    'asapsports',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'asapsports.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'asapsports.wsgi.application'

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": APP_NAME,
        # 'USER': 'asapsports',
        # 'PASSWORD': 'password',
        # 'HOST': 'localhost',
        # 'PORT': 5432
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators
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
# https://docs.djangoproject.com/en/1.10/topics/i18n/
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(PROJECT_ROOT, "static")

MEDIA_URL = '/static/media/'
MEDIA_ROOT = os.path.join(STATIC_ROOT, "media")

ADMINS = [('Aidan', 'aidoraide@gmail.com')]

EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'asapsports123@gmail.com'
EMAIL_HOST_PASSWORD = 'A$apSports123'
EMAIL_PORT = 587

try:
    from .local_settings import *
except ImportError:
    pass
