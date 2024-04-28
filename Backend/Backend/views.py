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

def login(request):
    print('hola')

def register(request):
    print('hola')

#DEBERE PASAR UN COUNT DE LOS COMENTARIOS QUE HAYA, SI ES INFERIOR A 10 EN EL
#FRONT NO DEBERA INDICAR "MOSTRAR MAS COMENTARIOS", YA QUE NO QUEDAN MAS.
def child_comments(request, id_game, id_comment):
    print('Funcion para comentarios hijo')