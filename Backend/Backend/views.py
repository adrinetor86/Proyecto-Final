from django.http import JsonResponse, HttpResponse
from Backend.Controllers.controller_games import ControllerGames
from Backend.Controllers.controller_user import ControllerUser
from Backend.Libs.jsonWebTokken import create_token, decode_token
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def games(request, page='1'):
    if request.method == 'GET':
        if page.isnumeric():
            controller = ControllerGames()
            response = controller.get_games(page)

            if response.get("error", "") == "":
                return JsonResponse(response, status=200)
            else:
                error = response.get("error", "")
                code = response.get("code", 400)

                return JsonResponse({"error": error}, status=code)
        else:
            return JsonResponse({"Error": "Invalid page"}, status=400)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def game(request, id):
    if request.method == 'GET':
        if id.isnumeric():
            controller = ControllerGames()
            response = controller.get_game(id)

            if response.get("error", "") == "":
                return JsonResponse(response, status=200)
            else:
                error = response.get("error", "")
                code = response.get("code", 400)

                return JsonResponse({"error": error}, status=code)
        else:
            return JsonResponse({"Error": "Invalid ID"}, status=400)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

def search(request):
    if request.method == 'GET':
        value = request.GET.get("value", "")
        page = request.GET.get("page", 1)

        try:
            page = int(page)
        except ValueError:
            page = 1

        controller = ControllerGames(title=value)
        response = controller.search(page)

        if response.get("error", "") == "":
            return JsonResponse(response, status=200)
        else:
            error = response.get("error", "")
            code = response.get("code", 403)

            return JsonResponse({"error": error}, status=code)
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
def child_comments(request, id_game, id_comment, offset=0):
    if request.method == 'GET':
        try:
            offset = int(offset)
        except ValueError:
            offset = 0

        controller = ControllerGames()
        data = controller.child_comments(id_game, id_comment, offset)

        return JsonResponse(data)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def error_url(request):
    return JsonResponse({"error": "Page not found, check url"}, status=404)

@csrf_exempt
def confirm_exist_user(request):
    if request.method == 'POST':
        controller = ControllerUser(email=request.POST.get("email", ""))
        response = controller.confirm_exist_user()

        if response.get("success", "") != "":
            return JsonResponse({"success": response.get("success", "")}, status=200)
        else:
            error = response.get("error", "Unknown error")
            code = response.get("code", 400)
            return JsonResponse({"error": error}, status=code)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def confirm_code(request):
    if request.method == 'POST':
        if request.POST.get("email", "") != "":
            controller = ControllerUser(email=request.POST.get("email", ""))
            code = request.POST.get("code", "")
            if controller.confirm_code(code):
                token = create_token(request.POST.get("email", ""), "")
                return JsonResponse({"success": "Correct code", "token": token}, status=200)
            else:
                return JsonResponse({"error": "Incorrect code or expired code"}, status=400)
        else:
            return JsonResponse({"error": "email is void"}, status=409)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def change_password(request):
    if request.method == 'POST':
        if request.POST.get("email", "") != "":
            authorization_token = request.headers.get("Authorization", "")
            response_token = decode_token(authorization_token)
            if response_token.get("success", "") != "":
                controller = ControllerUser(email=request.POST.get("email", ""), password=request.POST.get("new_password", ""))
                response = controller.change_password()

                if response.get("success", "") != "":
                    return JsonResponse({"success": response.get("success", "")}, status=200)
                else:
                    return JsonResponse({"error": response.get("error", "")}, status=response.get("code", ""))
            else:
                return JsonResponse({"error": response_token.get("error", "Unknown error")}, status=response_token.get("code", 400))
        else:
            return JsonResponse({"error": "email is void"}, status=409)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

def profile(request, username):
    if request.method == 'GET':
        controller = ControllerUser(username=username)

        response = controller.get_profile()

        if response.get("error", "") == "":
            return JsonResponse(response, status=200)
        else:
            return JsonResponse({"error": response.get("error", "Unknokn error")}, status=response.get("code", 400))
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

def change_picture(request):
    if request.method == 'POST':
        picture = request.POST.get("picture")
        username = request.POST.get("username")
        controller = ControllerUser(username=username ,picture=picture)

        response = controller.change_picture()


    else:
        return JsonResponse({"error": "Bad Request"}, status=405)