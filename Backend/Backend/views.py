from django.http import JsonResponse, HttpResponse
from Backend.Controllers.controller_games import ControllerGames
from Backend.Controllers.controller_user import ControllerUser
from Backend.Libs.jsonWebTokken import create_token, decode_token
from django.views.decorators.csrf import csrf_exempt

def games(request):
    controller = ControllerGames()
    data = controller.get_games()

    return JsonResponse(data)

def game(request, id):
    controller = ControllerGames()
    data = controller.get_game(id)

    return JsonResponse(data)

def login(request):
    #controller = ControllerUser(email = email, password = password)
    controller = ControllerUser()

    response = controller.login()

    if response.get("return"):
        #tokken = create_token(email, response.get("username", ""))
        verify = decode_token('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvcmdlQGhvdG1haWwuY29tIiwidXNlcm5hbWUiOiJqb3JnZUxPTCIsImV4cCI6MTcxNDYxNTQ0Nn0.fj2p-tKZ015D065U2igzLERNgaGDwtZhUNuVLbqd2Xs')
        if verify:
            pista = 'Todo bien'
        else:
            pista = 'todo mal my G'
        return HttpResponse(pista, status=200)
    else:
        return HttpResponse(status=403)
def register(request):
    controller = ControllerUser()
    controller.register()
    return HttpResponse(status=200)

#DEBERE PASAR UN COUNT DE LOS COMENTARIOS QUE HAYA, SI ES INFERIOR A 10 EN EL
#FRONT NO DEBERA INDICAR "MOSTRAR MAS COMENTARIOS", YA QUE NO QUEDAN MAS.
def child_comments(request, id_game, id_comment, offset = 0):
    controller = ControllerGames()
    data = controller.child_comments(id_game, id_comment, offset)

    return JsonResponse(data)