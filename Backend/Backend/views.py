from django.http import JsonResponse, HttpResponse
from Backend.Controllers.controller_games import ControllerGames

def games(request):
    controller = ControllerGames()
    data = controller.get_games()

    return JsonResponse(data)

def game(request, id):
    controller = ControllerGames()
    data = controller.get_game(id)

    return JsonResponse(data)