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
from django.http import HttpResponse
import asapsports.views as views

def doc(request):
    res = []
    for url, func in [('authentication/login', views.login),
                      ('games/upcoming_games', views.upcoming_games),
                      ('games/search', views.search),
                      ('games/join/<int:game_id>', views.join),
                      ('games/host', views.host),
                      ('games/view/<int:game_id>', views.view),
                      ('notifications/subscribe/game/<int:game_id>', views.subscribe2game)]:
        res.append(url)
        res.append(func.__doc__)
        res.append('')

    return HttpResponse('\n'.join(res), content_type="text/plain")

urlpatterns = [
    # url(r'^admin$', admin.site.urls),
    path('', doc),
    # url(r'^endpoint_example$', views.endpoint_example),
    # url(r'^params/(?P<regex_var>[abc][0-9]{2})/$', views.params_regex),
    # path('params/<int:number>/<slug:slug>/', views.params),
    path('authentication/login', views.login),
    path('games/upcoming_games', views.upcoming_games),
    path('games/search', views.search),
    path('games/join/<int:game_id>', views.join),
    path('games/host', views.host),
    path('games/view/<int:game_id>', views.view),
    path('notifications/subscribe/game/<int:game_id>', views.subscribe2game)
]

if settings.DEBUG:
    urlpatterns += static.static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

