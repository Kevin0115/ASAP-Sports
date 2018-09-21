import json

from django.http import HttpResponse, HttpResponseBadRequest
from django.core.mail import send_mail


def index(request):
    res = {'page': 'This is the index'}
    return HttpResponse(json.dumps(res), content_type="application/json")


def endpoint_example(request):
    if 'team1' not in request.GET or 'team2' not in request.GET:
        return HttpResponseBadRequest('Bad request')

    res = {
        'team1': request.GET['team1'],
        'team2': request.GET.getlist('team2')
    }
    return HttpResponse(json.dumps(res), content_type="application/json")


def params(request, number, slug):
    res = {'number': number, 'slug': slug}
    return HttpResponse(json.dumps(res), content_type="application/json")


def params_regex(request, regex_var):
    res = {'data_you_sent': regex_var}
    return HttpResponse(json.dumps(res), content_type="application/json")
