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
        sql = "SELECT * FROM " + self.__tables["games"]

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

        genders = self.__get_genders(id)
        plataforms = self.__get_plataforms(id)

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'\033[91mError get games {id}: {error.msg}')
            return [{'error': 'error en la conexion en la base de datos'}]

        dict_return[0]["genders"] = genders
        dict_return[0]["plataforms"] = plataforms

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