import json
from urllib import request

from django.http import JsonResponse, HttpResponse
from Backend.Controllers.controller_games import ControllerGames
from Backend.Controllers.controller_user import ControllerUser
from Backend.Libs.jsonWebTokken import create_token, decode_token, confirm_user, confirm_email, confirm_user_rol
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

@csrf_exempt
def search(request):
    if request.method == 'GET':
        value = request.GET.get("value", "")
        plataforms = request.GET.get("plataforms", [])
        genders = request.GET.get("genders", [])
        page = request.GET.get("page", 1)

        try:
            page = int(page)
        except ValueError:
            page = 1

        controller = ControllerGames(title=value, plataforms=plataforms, genders=genders)
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
            token = create_token(email, response.get("username", ""), response.get("rol_user", 3))
            response["token"] = token

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
    #FALTA VERIFICAR TOKKEN
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
            email = request.POST.get("email", "")
            if confirm_email(authorization_token, email):
                controller = ControllerUser(email=request.POST.get("email", ""), password=request.POST.get("new_password", ""))
                response = controller.change_password()

                if response.get("success", "") != "":
                    return JsonResponse({"success": response.get("success", "")}, status=200)
                else:
                    return JsonResponse({"error": response.get("error", "")}, status=response.get("code", ""))
            else:
                return JsonResponse({"error": "Invalid token"}, status=400)
        else:
            return JsonResponse({"error": "email is void"}, status=409)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def your_profile(request, username):
    if request.method == 'POST':
        authorization_token = request.headers.get("Authorization", "").strip()

        if confirm_user(authorization_token, username):
            controller = ControllerUser(username=username)
            response = controller.get_your_profile()

            if response.get("error", "") == "":
                return JsonResponse(response, status=200)
            else:
                return JsonResponse({"error": response.get("error", "Unknown error")}, status=response.get("code", 400))
        else:
            return JsonResponse({"error": "Invalid access token"}, status=401)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def view_profile(request, username):
    if request.method == 'POST':
        controller = ControllerUser(username=username)
        response = controller.get_other_profile()

        if response.get("error", "") == "":
            return JsonResponse(response, status=200)
        else:
            return JsonResponse({"error": response.get("error", "Unknown error")}, status=response.get("code", 400))
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def change_picture(request, username):
    if request.method == 'POST':
        authorization_token = request.headers.get("Authorization", "").strip()

        if not confirm_user(authorization_token, username):
            return JsonResponse({"error": "Invalid access token"}, status=401)

        #data = json.loads(request.body)
        #picture = data.get('picture', None)

        picture = request.POST.get("new_picture", None)

        controller = ControllerUser(username=username, picture=picture)

        response = controller.change_picture()

        if response.get("error", "") == "":
            return JsonResponse({"success": response}, status=200)
        else:
            return JsonResponse({"error": response.get("error", "Unknown error")}, status=response.get("code", 400))
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def new_game(request):
    if request.method == 'POST':
        controller2 = ControllerUser(username=request.POST.get("username"))
        data_user = controller2.get_a_user()

        print(request.POST.get("username"))

        if data_user is None:
            return JsonResponse({"error": "No authorizated"}, status=400)

        authorization_token = request.headers.get("Authorization", "").strip()

        if not confirm_user_rol(authorization_token, data_user):
            return JsonResponse({"error": "Access denied"}, status=400)

        print(request.POST)

        data = json.loads(request.body)
        maps = data.get('maps', []) #no se si la mandar por body
        plataforms = data.get('plataforms', []) #no se si la mandar por body
        genders = data.get('genders', []) #no se si la mandar por body

        controller = ControllerGames(
            title=request.POST.get("title"),
            synopsis=request.POST.get("synopsis"),
            developer=request.POST.get("developer"),
            link_download=request.POST.get("link_download"),
            link_trailer=request.POST.get("link_trailer"),
            release_date=request.POST.get("release_date"),
            background_image=request.POST.get("background_picture"),
            front_page=request.POST.get("front_page"),
            plataforms=request.POST.get("plataforms", plataforms),
            genders=request.POST.get("genders", genders),
            maps=maps,
        )
        response = controller.new_game()

        if response.get("error", "") == "":
            return JsonResponse({"success": response}, status=200)
        else:
            return JsonResponse({"error": response.get("error", "Unknown error")}, status=response.get("code", 400))
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def portada(request):
    if request.method == 'POST':
        controller = ControllerGames(id=request.POST.get("id", 0), front_page=request.POST.get("front_page", ""))
        response = controller.update_front_page()

        if response.get("error", "") == "":
            return JsonResponse(response, status=200)
        else:
            return JsonResponse({"error": response.get("error", "Unknown error")}, status=response.get("code", 400))
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def resend_email(request):
    if request.method == 'POST':
        controller = ControllerUser(email=request.POST.get("email", ""))
        response = controller.resend_email()

        if response:
            return JsonResponse({"success": "Send code successfully"}, status=200)
        else:
            return JsonResponse({"error": "Cannot send code"}, status=400)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def insert_comment(request, id_game, father_comment=None):
    if request.method == 'POST':
        username = request.POST.get("username", "")
        authorization_token = request.headers.get("Authorization", "").strip()

        if confirm_user(authorization_token, username):
            content_comment = request.POST.get("content_comment", "").strip()
            if username == "" or content_comment == "":
                return JsonResponse({"error": "A username is required"}, status=409)

            controller = ControllerGames(id=id_game)
            response = controller.insert_comment(username, content_comment, father_comment)

            if response.get("error", "") == "":
                return JsonResponse({"success": response.get("success")}, status=200)
            else:
                return JsonResponse({"error": response.get("error", "")}, status=response.get("code", 400))
        else:
            return JsonResponse({"error": "Access denied, invalid token"}, status=401)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)


@csrf_exempt
def insert_map(request, id_game):
    if request.method == 'POST':
        #maps = request.POST.getlist("maps", [])
        data = json.loads(request.body)
        maps = data.get('maps', [])

        if len(maps) == 0:
            return JsonResponse({"error": "Map is empty"}, status=400)

        controller = ControllerGames(id=id_game)
        response = controller.insert_map(maps)

        if response.get("error", "") == "":
            return JsonResponse({"success": response.get("success")}, status=200)
        else:
            return JsonResponse({"error": response.get("error", "")}, status=response.get("code", 400))
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def get_filters(request):
    if request.method == 'GET':
        controller = ControllerGames()
        response = controller.get_filters()

        if response.get("error", "") == "":
            return JsonResponse(response, status=200)
        else:
            return JsonResponse({"error": response.get("error", "")}, status=400)
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)

@csrf_exempt
def get_maps(request, id_game):
    if request.method == 'GET':
        controller = ControllerGames(id=id_game)
        response = controller.get_maps()

        return JsonResponse({"maps": response.get("maps", [])}, status=response.get("code", 400))
    else:
        return JsonResponse({"error": "Bad Request"}, status=405)
