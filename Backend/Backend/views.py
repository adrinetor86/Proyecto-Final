import json
from datetime import datetime
from django.http import JsonResponse
import mysql
import mysql.connector as bd
from django.http import HttpResponse

def get_connection():
    dataBase = {
        'host': 'localhost',
        'port': 3306,
        'user': 'root',
        'password': '',
        'database': 'tfg'
    }

    return bd.connect(**dataBase)

def getAll() -> dict | None:
    sql = "SELECT * FROM games"
    dict_return = None

    try:
        conection = get_connection()
        cursor = conection.cursor(dictionary=True)
        cursor.execute(sql)
        dict_return = cursor.fetchall()
        cursor.close()
    except mysql.connector.Error as error:
        print(f'\033[91mError while connecting to: {error.msg}')
        return [{'error': 'error en la conexion en la base de datos'}]

    return dict_return

def games(request):
    data = getAll()

    if data[0].get("error", "") == "":
        dict_games = {'games': data}
    else:
        dict_games = {'error': data}
    return JsonResponse(dict_games)

def index(request):
    return HttpResponse("primera pagina prueba")

def current_date(request):
    mi_fecha = """
    <h1> {0} </h1>
    """

    return HttpResponse(mi_fecha.format(datetime.now()))