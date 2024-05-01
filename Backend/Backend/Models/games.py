import mysql
import mysql.connector as bd
import Backend.conf as config

class Games:
    def __init__(self):
        self.__tables = {
            "games": "games",
            "own_genders": "games_genders",
            "own_plataforms": "games_plataforms",
            "own_maps": "games_maps",
            "type_genders": "type_genders",
            "type_plataforms": "type_plataform",
        }
        self.__connection = bd.connect(**config.DATABASE)

    def select_games(self) -> dict | None:
        sql = "SELECT id, title, release_date FROM " + self.__tables["games"]

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'\033[91mError get all games: {error.msg}')
            return [{'error': 'error en la conexion en la base de datos'}]

        return dict_return

    def select_game(self, id) -> dict | None:
        sql = f"SELECT * FROM {self.__tables["games"]} WHERE id = {id}"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'\033[91mError get games {id}: {error.msg}')
            return [{'error': 'error en la conexion en la base de datos'}]

        if len(dict_return) != 0:
            dict_return = dict_return[0]
            dict_return["genders"] = self.__get_genders(id)
            dict_return["plataforms"] = self.__get_plataforms(id)
            dict_return["comments"] = self.__get_comments(id)
        else:
            return {}

        return dict_return

    def __get_genders(self, id) -> str:
        sql = (f"SELECT name_gender FROM {self.__tables["type_genders"]} " 
               f"INNER JOIN games_genders ON games_genders.id_gender = type_genders.id_type_gender "
               f"where id_game = {id}")
        genders = ''

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            data = cursor.fetchall()
            for data_genders in data:
                genders += data_genders[0] + ','
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get genders: {error.msg}')
            return ""

        return genders.strip(",")

    def __get_plataforms(self, id) -> str:
        sql = (f"SELECT name_plataform FROM {self.__tables["type_plataforms"]} " 
               f"INNER JOIN games_plataforms ON games_plataforms.id_plataform = type_plataform.id_type_plataform "
               f"where id_game = {id}")
        plataforms = ''

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            data = cursor.fetchall()
            for data_genders in data:
                plataforms += data_genders[0] + ','
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get plataforms: {error.msg}')
            return ""

        return plataforms.strip(",")

    #SELECT * FROM comments where id_game = 1 and parent_comment = 3
    #ESTA CONSULTA SIRVE PARA LOS HIJOS DEL COMENTARIO
    def __get_comments(self, id) -> str:
        sql = f"SELECT id_comment, user, content_comment, comment_date FROM comments where id_game =  {id} and parent_comment IS NULL LIMIT 10"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get plataforms: {error.msg}')
            return {'error': 'get comments'}

        return data

    def get_child_comments(self, id_game, id_comment, offset):
        sql = (f"SELECT id_comment, user, content_comment, comment_date FROM comments "
               f"where id_game = {id_game} and parent_comment = {id_comment} LIMIT 10 OFFSET {offset}")

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get child comments: {error.msg}')
            return {'error': 'get child comments'}

        return data

    def __get_comments_vega(self, id):
        # Crear un cursor para ejecutar consultas
        cursor = self.__connection.cursor()

        # Consulta SQL para relacionar comentarios con sus comentarios padres
        consulta = (f"SELECT c1.id_comment AS Comentario_ID, c1.user AS Comentario_Usuario, "
                    f"c1.parent_comment AS Comentario_Padre_ID, c2.user AS Comentario_Padre_Usuario, c1.id_game AS Juego FROM "
                    f"comments c1 LEFT JOIN comments c2 ON c1.parent_comment = c2.id_comment")

        # Ejecutar la consulta
        cursor.execute(consulta)

        # Obtener los resultados de la consulta
        resultados = cursor.fetchall()

        # Crear un diccionario para almacenar los comentarios
        comentarios = {}

        # Iterar sobre los resultados y construir el diccionario de comentarios
        for resultado in resultados:
            comentario_id = resultado[0]
            comentario_usuario = resultado[1]
            comentario_padre_id = resultado[2]
            comentario_padre_usuario = resultado[3]
            juego = resultado[4]
            print (comentario_padre_id)

            # Crear un diccionario para almacenar la información del comentario
            comentario_json = {
                "Comentario_ID": comentario_id,
                "Comentario_Usuario": comentario_usuario,
                "Comentario_Padre_ID": comentario_padre_id,
                "Comentario_Padre_Usuario": comentario_padre_usuario,
                "Juego": juego,
                "Comentarios_Hijos": []  # Lista para almacenar comentarios hijos
            }

            # Si el comentario tiene un padre, agregarlo a la lista de comentarios hijos del padre
            if comentario_padre_id:
                # Verificar si ya existe una lista de comentarios hijos para el comentario padre
                if comentario_padre_id not in comentarios:
                    comentarios[comentario_padre_id] = {
                        "Comentario_ID": comentario_padre_id,
                        "Comentario_Usuario": comentario_padre_usuario,
                        "Comentarios_Hijos": []  # Inicializar lista de comentarios hijos
                    }
                # Agregar el comentario a la lista de comentarios hijos del padre
                comentarios[comentario_padre_id]["Comentarios_Hijos"].append(comentario_json)
            else:
                print("por aqui pasa el comentario: " + str(comentario_id))
                # Si no tiene padre, agregarlo directamente al diccionario de comentarios
                comentarios[comentario_id] = comentario_json

        # Convertir el diccionario de comentarios en una lista para la salida JSON
        #comentarios_list = list(comentarios.values())

        # Convertir la lista de comentarios en formato JSON a una cadena JSON
        #resultados_json_str = json.dumps(comentarios_list, indent=4)

        # Mostrar la cadena JSON resultante
        #print(resultados_json_str)

        return comentarios

        # Cerrar el cursor y la conexión
        #cursor.close()
        #conexion.close()
