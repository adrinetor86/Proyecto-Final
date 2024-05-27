import math
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

    def select_games(self, page) -> dict | None:
        limit = int(page) * 15
        offset = limit - 15
        sql = f"SELECT id, title, release_date FROM {self.__tables["games"]} LIMIT {limit} OFFSET {offset}"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()

            if len(dict_return) == 0:
                return {"error": "No games in this page", "code": 404}
            else:
                return {"games": dict_return}

        except mysql.connector.Error as error:
            print(f'\033[91mError get all games: {error.msg}')
            return {"error": "unknown error, check values given", "code": 404}

    def select_game(self, id) -> dict | None:
        sql = f"SELECT * FROM {self.__tables["games"]} WHERE id = {id}"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error:
            return {'error': 'unknown error, check values given'}

        if len(dict_return) != 0:
            dict_return = dict_return[0]
            dict_return["genders"] = self.__get_genders(id)
            dict_return["plataforms"] = self.__get_plataforms(id)
            dict_return["comments"] = self.__get_comments(id)

            return dict_return
        else:
            return {"error": "game not found", "code": 403}

    def search_game(self, value: str, page: int):
        limit = page * 15
        offset = limit - 15
        sql = f"SELECT id, title, front_page FROM {self.__tables["games"]} WHERE title LIKE '%{value}%' LIMIT 15 OFFSET {offset}"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()

            total_games = self.__total_games(value)

            if total_games == -1:
                return {"error": "Unknown error", "code": 400}
            else:
                total_page = math.ceil(total_games/15)

            if len(dict_return) != 0:
                prev = self.__get_prev(page, value)
                next = self.__get_next(page, total_page, value)

                return {"prev": prev,
                        "next": next,
                        "current_page": page,
                        "total_page": total_page,
                        "min_result": offset+1,
                        "max_result": offset + len(dict_return),
                        "count_results": total_games,
                        "results": dict_return}
            else:
                return {"error": "Currently this page not found", "code": 403}

        except mysql.connector.Error:
            return {"error": "unknown error, check values given", "code": 400}

    def update_front_page(self, id, front_page):
        sql = f"UPDATE {self.__tables["games"]} SET front_page = '{front_page}' WHERE id = {id}"

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            cursor.close()
            self.__connection.commit()

            return {"success": "front_page change successfully"}
        except mysql.connector.Error:
            return {"error": "Unknown error, try again", "code": 400}

    def __get_next(self, page, total_page, value):
        if page != total_page:
            next = f'/api/v1/games/?page={page+1}'

            if value != "":
                next = next + '&value=' + value
        else:
            next = None

        return next

    def __get_prev(self, page, value):
        if page != 1:
            prev = f'/api/v1/games/?page={page-1}'

            if value != "":
                prev = prev + '&value=' + value
        else:
            prev = None

        return prev

    def __total_games(self, value: str) -> int:
        sql = f"SELECT count(*) FROM {self.__tables["games"]} WHERE title LIKE '%{value}%'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()

            total_games = dict_return[0]["count(*)"]

            return total_games
        except mysql.connector.Error:
            return -1

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
                genders += data_genders[0] + ', '
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get genders: {error.msg}')
            return ""

        return genders.strip(", ")

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
                plataforms += data_genders[0] + ', '
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get plataforms: {error.msg}')
            return ""

        return plataforms.strip(", ")

    #SELECT * FROM comments where id_game = 1 and parent_comment = 3
    #ESTA CONSULTA SIRVE PARA LOS HIJOS DEL COMENTARIO
    def __get_comments(self, id) -> str:
        sql = f"SELECT id_comment AS next, user, content_comment, comment_date FROM comments where id_game = {id} and parent_comment IS NULL LIMIT 10"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get plataforms: {error.msg}')
            return {'error': 'get comments'}

        for comment in data:
            if int(self.__total_comments(id, comment["next"])) > 0:
                comment["next"] = f'/comment/{id}/{comment["next"]}/'
            else:
                comment["next"] = None

        return data

    def get_child_comments(self, id_game, id_comment, offset):
        sql = (f"SELECT id_comment, user, content_comment, comment_date FROM comments "
               f"where id_game = {id_game} and parent_comment = {id_comment} LIMIT 10 OFFSET {offset}")

        total = self.__total_comments(id_game, id_comment)

        if total == -1:
            return {'error': 'Cannot get child comments'}
        else:
            if (offset+10) >= int(total):
                next = None
            else:
                next = f"/comment/{id_game}/{id_comment}/{offset+10}/"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get child comments: {error.msg}')
            return {'error': 'Cannot get child comments'}

        return {"next": next, "comments": data}

    def __total_comments(self, id_game, id_comment):
        sql = (f"SELECT count(*) FROM comments where id_game = {id_game} and parent_comment = {id_comment}")

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get child comments: {error.msg}')
            return -1

        return data[0]['count(*)']
