from django.http import JsonResponse, HttpResponse
from Backend.Controllers.controller_games import ControllerGames
from Backend.Controllers.controller_user import ControllerUser
from Backend.Libs.jsonWebTokken import create_token, decode_token
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def games(request):
    if request.method == 'GET':
        controller = ControllerGames()
        data = controller.get_games()

        return JsonResponse(data, status=200)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def game(request, id):
    if request.method == 'GET':
        if id.isnumeric():
            controller = ControllerGames()
            data = controller.get_game(id)

            return JsonResponse(data)
        else:
            return JsonResponse({"Error": "Invalid ID"}, status=400)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

#Loguea al usuario y genera un codigo de error distinto segun el fallo
@csrf_exempt
def login(request):
    if request.method == 'POST':
        email = request.POST.get("email", "")
        controller = ControllerUser(email=email, password=request.POST.get("password", ""))

        response = controller.login()

        if response.get("error", "") == "":
            tokken = create_token(email, response.get("username", ""))
            response["token"] = tokken[0]
            response["token_refresh"] = tokken[1]

            return JsonResponse(response, status=200)
        else:
            error = response.get("error", "")
            code = response.get("code", 403)

            return JsonResponse({"error": error}, status=code)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

#Permite al usuario registrarse
@csrf_exempt
def register(request):
    if request.method == 'POST':
        controller = ControllerUser(email=request.POST.get("email", ""), username=request.POST.get("username", ""), password=request.POST.get("password", ""))
        response = controller.register()

        if response.get("error", "") == "":
            return JsonResponse({"success": response.get("success")}, status=200)
        else:
            error = response.get("error", "")
            code = response.get("code", 403)

            return JsonResponse({"error": error}, status=code)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

#DEBERE PASAR UN COUNT DE LOS COMENTARIOS QUE HAYA, SI ES INFERIOR A 10 EN EL
#FRONT NO DEBERA INDICAR "MOSTRAR MAS COMENTARIOS", YA QUE NO QUEDAN MAS.
@csrf_exempt
def child_comments(request, id_game, id_comment, offset = 0):
    controller = ControllerGames()
    data = controller.child_comments(id_game, id_comment, offset)

    return JsonResponse(data)