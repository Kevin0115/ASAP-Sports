import json

from django.http import HttpResponse, HttpResponseBadRequest
from django.core.mail import send_mail


# def index(request):
#     res = {'page': 'This is the index'}
#     return HttpResponse(json.dumps(res), content_type="application/json")
#
#
# def endpoint_example(request):
#     if 'team1' not in request.GET or 'team2' not in request.GET:
#         return HttpResponseBadRequest('Bad request')
#
#     res = {
#         'team1': request.GET['team1'],
#         'team2': request.GET.getlist('team2')
#     }
#     return HttpResponse(json.dumps(res), content_type="application/json")
#
#
# def params(request, number, slug):
#     res = {'number': number, 'slug': slug}
#     return HttpResponse(json.dumps(res), content_type="application/json")
#
#
# def params_regex(request, regex_var):
#     res = {'data_you_sent': regex_var}
#     return HttpResponse(json.dumps(res), content_type="application/json")


##### AUTHENTICATION #####

def login(request):
    res = {'asap_access_token': 'abc123def456'}
    return HttpResponse(json.dumps(res), content_type="application/json")


##### GAMES #####

def upcoming_games(request):
    user = {'user_id': 1,
            'user_first': 'Aidan',
            'user_last': 'Rosswood',
            'profile_pic_url': 'https://scontent.fcxh3-1.fna.fbcdn.net/v/t1.0-1/c0.0.160.160/p160x160/21317726_10214068166328388_5020288671420429824_n.jpg?_nc_cat=109&oh=7ce11e566fa123e591ee7398db99272b&oe=5C55462C',
           }
    res = {'auth_user': user,
           'games_in_progess': [],
           'games_upcoming': [],
           'past_games': []}
    return HttpResponse(json.dumps(res), content_type="application/json")


def search(request):
    res = []
    return HttpResponse(json.dumps(res), content_type="application/json")


def join(request, game_id):
    res = {'status': 'success'}
    return HttpResponse(json.dumps(res), content_type="application/json")


def host(request):
    """
    :param request: has data like:
        {
          “sport”: enum,
          “title”: string,
          “description”: string,
          “max_players”: int,
          “location_lat”: double,
          “locations_lng”: double,
          “location_name”: string
        }
    :return: {'game_id': game_id}
    """
    res = {'game_id': 3}
    return HttpResponse(json.dumps(res), content_type="application/json")


def view(request, game_id):
    res = {'game_id': game_id,
           'host_id': 1,
           'game_title': 'Real competitive motherfuckers ONLY!',
           'game_description': 'NO PUSSIES ALLOWED LETS FUCKIN GOOOOOOO!',
           'max_players': 4,
           'sport': 'tennis_2v2',
           'start_time': '2018-10-20 14:30',
           'end_time': '2018-10-20 16:30',
           'location_lng': 112.33342,
           'location_lat': 47.122231,
           'location_name': 'UBC Tennis Center'
           }
    return HttpResponse(json.dumps(res), content_type="application/json")


##### NOTIFICATIONS #####

def subscribe2game(request, game_id):
    res = {'status': 'success'}
    return HttpResponse(json.dumps(res), content_type="application/json")