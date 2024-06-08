import html
import math
import os
import re

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
        limit = int(page) * 9
        offset = limit - 9
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
            dict_return["comments"] = self.__charge_default_picture(self.__get_comments(id))

            return dict_return
        else:
            return {"error": "game not found", "code": 403}

    def search_game(self, value: str, page: int, genders, plataforms):
        limit = page * 9
        offset = limit - 9
        sql = f"SELECT id, title, front_page FROM {self.__tables["games"]} WHERE title LIKE '%{value}%' "
        query = f"SELECT count(*) FROM {self.__tables["games"]} WHERE title LIKE '%{value}%' "

        if len(genders) > 0:
            if len(genders) == 1:
                query += f"AND id IN (SELECT DISTINCT gg.id_game FROM games_genders gg WHERE gg.id_gender = {genders[0]}) "
                sql += f"AND id IN (SELECT DISTINCT gg.id_game FROM games_genders gg WHERE gg.id_gender = {genders[0]}) "
            else:
                query += f"AND id IN (SELECT DISTINCT gg.id_game FROM games_genders gg WHERE gg.id_gender IN {genders}) "
                sql += f"AND id IN (SELECT DISTINCT gg.id_game FROM games_genders gg WHERE gg.id_gender IN {genders}) "

        if len(plataforms) > 0:
            if len(plataforms) == 1:
                query += f"AND id IN (SELECT DISTINCT gp.id_game FROM games_plataforms gp WHERE gp.id_plataform = {plataforms[0]}) "
                sql += f"AND id IN (SELECT DISTINCT gp.id_game FROM games_plataforms gp WHERE gp.id_plataform = {plataforms[0]}) "
            else:
                query += f"AND id IN (SELECT DISTINCT gp.id_game FROM games_plataforms gp WHERE gp.id_plataform IN {plataforms}) "
                sql += f"AND id IN (SELECT DISTINCT gp.id_game FROM games_plataforms gp WHERE gp.id_plataform IN {plataforms}) "

        sql += f" ORDER BY games.release_date DESC LIMIT 9 OFFSET {offset}"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()

            total_games = self.__total_games(query)

            if total_games == -1:
                return {"error": "Unknown error", "code": 400}
            else:
                total_page = math.ceil(total_games/9)

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
                return {"prev": None,
                        "next": None,
                        "current_page": 1,
                        "total_page": 1,
                        "min_result": offset+1,
                        "max_result": offset + len(dict_return),
                        "count_results": 0,
                        "results": dict_return}

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

    def insert_comment(self, username, id_game, content_comment, parent_comment):

        sql = (f"INSERT INTO comments (user, id_game, content_comment, parent_comment) "
               f"values ('{username}', {id_game}, '{content_comment}'")
        if parent_comment != None:
            sql += f", {parent_comment})"
        else:
            sql += ", NULL)"

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            cursor.close()
            self.__connection.commit()

            return {"success": "comment inserted successfully"}
        except mysql.connector.Error:
            return {"error": "Unknown error, try again", "code": 400}

    def insert_maps(self, id_game, maps):
        try:
            cursor = self.__connection.cursor()
            for map in maps:
                sql = f"INSERT INTO {self.__tables["own_maps"]} (id_game, url_map) values ({id_game}, '{map}')"
                cursor.execute(sql)
            cursor.close()
            self.__connection.commit()

            return {"success": "maps inserted successfully"}
        except mysql.connector.Error as error:
            self.__connection.rollback()
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

    def __total_games(self, query: str) -> int:
        sql = query

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
        sql = (f"SELECT name_gender, id_type_gender FROM {self.__tables["type_genders"]} " 
               f"INNER JOIN games_genders ON games_genders.id_gender = type_genders.id_type_gender "
               f"where id_game = {id}")
        genders = ''

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get genders: {error.msg}')
            return []

        return data

    def __get_plataforms(self, id) -> str:
        sql = (f"SELECT name_plataform, id_type_plataform FROM {self.__tables["type_plataforms"]} " 
               f"INNER JOIN games_plataforms ON games_plataforms.id_plataform = type_plataform.id_type_plataform "
               f"where id_game = {id}")
        plataforms = ''

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get plataforms: {error.msg}')
            return []

        return data

    #SELECT * FROM comments where id_game = 1 and parent_comment = 3
    #ESTA CONSULTA SIRVE PARA LOS HIJOS DEL COMENTARIO
    def __get_comments(self, id) -> str:
        sql = ("SELECT "
                "c.id_comment AS id_comment, "
                "c.user, "
                "u.profile_picture,"
                "c.content_comment, "
                "c.comment_date "
                "FROM "
                    "comments c "
                "JOIN "
                    "users u ON c.user = u.username "
                "WHERE "
                    f"c.id_game = {id} "
                    "AND c.parent_comment IS NULL "
                "LIMIT "
                    "10;")

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            return {'error': 'get comments'}

        for comment in data:
            if int(self.__total_comments(id, comment["id_comment"])) > 0:
                comment["next"] = f'/comment/{id}/{comment["id_comment"]}/'
            else:
                comment["next"] = None

            comment["insert"] = f'/insert_comment/{id}/{comment["id_comment"]}/'

        return data

    def get_child_comments(self, id_game, id_comment, offset):
        sql = ("SELECT "
                "c.id_comment, "
                "c.user, "
                "u.profile_picture,"
                "c.content_comment, "
                "c.comment_date "
            "FROM "
                "comments c "
            "JOIN "
                "users u ON c.user = u.username "
            "WHERE "
                f"c.id_game = {id_game} "
                f"AND c.parent_comment = {id_comment} "
            "LIMIT "
                f"10 OFFSET {offset};")

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

            for comment in data:
                html.unescape(comment["content_comment"])

            data = self.__charge_default_picture(data)
        except mysql.connector.Error as error:
            print(f'Error get child comments: {error.msg}')
            return {'error': 'Cannot get child comments'}

        return {"next": next, "insert": f"/insert_comment/{id_game}/{id_comment}/", "comments": data}

    def __get_username_parentcomment(self, id_comment):
        sql = f"SELECT parent_comment FROM comments WHERE id_comment = {id_comment}"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchone()
            cursor.close()
        except mysql.connector.Error as error:
            return ''

        return dict_return["parent_comment"]

    def get_maps(self, id_game):
        sql = f"SELECT url_map FROM {self.__tables['own_maps']} WHERE id_game = {id_game}"
        maps = []

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            return {}

        for map in dict_return:
            maps.append(map.get('url_map'))

        return {'maps': maps, 'code': 200}

    def get_filters(self):
        genders = self.__get_filter_genders()
        platforms = self.__get_filter_plataforms()

        if len(genders) != 0 or len(platforms) != 0:
            return {'genders': genders, 'platforms': platforms}
        else:
            return {'error': 'Cannot get filters'}

    def __get_filter_genders(self):
        sql = f"SELECT * FROM {self.__tables['type_genders']}"
        genders = []

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get plataforms: {error.msg}')
            return []

        for gender in data:
            genders.append(gender)

        return genders

    def __get_filter_plataforms(self):
        sql = f"SELECT * FROM {self.__tables['type_plataforms']}"
        plataforms = []

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            data = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            print(f'Error get plataforms: {error.msg}')
            return []

        for plataform in data:
            plataforms.append(plataform)

        return plataforms

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

    def __charge_default_picture(self, dict_return):
        with open(os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Images', 'Profile', 'default.txt')),'r') as file:
            picture_profile = file.read()

        for value in dict_return:
            if value["profile_picture"] == None:
                value["profile_picture"] = picture_profile

        return dict_return

    def insert_game(self, title, synopsis, developer, link_download, link_trailer, release_date, front_page,
                    background_picture, plataforms, genders, maps):
        sql = (f"INSERT INTO {self.__tables["games"]} "
               "(title, synopsis, developer, link_download, link_trailer, release_date, front_page,background_picture) "
               "VALUES "
               f"('{title}', '{synopsis}', '{developer}', '{link_download}', '{link_trailer}', '{release_date}', "
               f"'{front_page}', '{background_picture}')")

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)

            id = self.__find_id_game(title, cursor)

            if id == -1:
                return {"error": "Fatal error (id)", "code": 400}

            if not self.__insert_plataforms(id, plataforms, cursor):
                return {"error": "Fatal error (plataforms)", "code": 400}

            if not self.__insert_genders(id, genders, cursor):
                return {"error": "Fatal error (genders)", "code": 400}

            if not self.__insert_maps(id, maps, cursor):
                return {"error": "Fatal error (maps)", "code": 400}

            self.__connection.commit()
            cursor.close()

            return {"success": "Insert game was success"}
        except mysql.connector.Error as e:
            return {"error": "Cannot insert game", "code": 400}


    def __insert_plataforms(self, id_game, plataforms, cursor):
        sql = (f"DELETE FROM {self.__tables['own_plataforms']} "
               f"WHERE id_game = {id_game}")

        try:
            cursor.execute(sql)
            for plataform in plataforms:
                cursor.execute(f"INSERT INTO {self.__tables["own_plataforms"]} (id_plataform, id_game) VALUES ({plataform}, {id_game})")

            return True
        except mysql.connector.Error:
            return False

    def __insert_genders(self, id_game, genders, cursor):
        sql = (f"DELETE FROM {self.__tables['own_genders']} "
               f"WHERE id_game = {id_game}")

        try:
            cursor.execute(sql)
            for gender in genders:
                cursor.execute(f"INSERT INTO {self.__tables["own_genders"]} (id_gender, id_game) VALUES ({gender}, {id_game})")

            return True
        except mysql.connector.Error:
            return False

    def __insert_maps(self, id_game, maps, cursor):
        sql = (f"DELETE FROM {self.__tables['own_maps']} "
               f"WHERE id_game = {id_game}")

        try:
            cursor.execute(sql)
            for map in maps:
                cursor.execute(f"INSERT INTO {self.__tables["own_maps"]} (url_map, id_game) VALUES ('{map}', {id_game})")

            return True
        except mysql.connector.Error:
            return False

    def __find_id_game(self, title, cursor):
        sql = (f"SELECT id FROM {self.__tables["games"]} where title = '{title}'")

        try:
            cursor.execute(sql)
            data = cursor.fetchone()

            if data is None:
                return -1

            return data[0]
        except mysql.connector.Error as error:
            return -1

    def update_game(self, id, title, synopsis, developer, link_download, link_trailer, release_date, front_page,
                    background_picture, plataforms, genders, maps):
        sql = (f"UPDATE {self.__tables['games']} "
               f"SET title = '{title}', synopsis = '{synopsis}', developer = '{developer}', "
               f"link_download = '{link_download}', link_trailer = '{link_trailer}', "
               f"release_date = '{release_date}', front_page = '{front_page}', "
               f"background_picture = '{background_picture}' "
               f"WHERE id = {id}")

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            #self.__connection.commit()

            if not self.__insert_plataforms(id, plataforms, cursor):
                return {"error": "Fatal error (plataforms)", "code": 400}

            if not self.__insert_genders(id, genders, cursor):
                return {"error": "Fatal error (genders)", "code": 400}

            if not self.__insert_maps(id, maps, cursor):
                return {"error": "Fatal error (maps)", "code": 400}

            self.__connection.commit()
            cursor.close()

            return {"success": "Insert game was success"}
        except mysql.connector.Error as e:
            return {"error": "Cannot insert game", "code": 400}

    def delete_game(self, id):
        sql = f"DELETE FROM games WHERE id = {id}"

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            cursor.close()
            self.__connection.commit()

            return {"success": "Game deleted successfully"}
        except mysql.connector.Error:
            return {"error": "Unknown error, try again", "code": 400}
