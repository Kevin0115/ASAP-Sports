"""ASAP Sports URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.urls import path
from django.conf.urls import url, include, static
from django.contrib import admin
import asapsports.views as views

urlpatterns = [
    url(r'^admin$', admin.site.urls),
    path('', views.index),
    url(r'^endpoint_example$', views.endpoint_example),
    url(r'^params/(?P<regex_var>[abc][0-9]{2})/$', views.params_regex),
    path('params/<int:number>/<slug:slug>/', views.params)
]

if settings.DEBUG:
    urlpatterns += static.static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
