import datetime
import html
import re
from Backend.Models.games import Games
from Backend.conf import KEY_IDENTIFIED_USER
from bs4 import BeautifulSoup

class ControllerGames:

    def __init__(self, id=0, title="", synopsis="", developer="", link_download="", link_trailer="", release_date="", front_page=None,
                background_picture=None,plataforms = [], genders = [], maps = []):
            self.__id = id
            self.__title = title.strip()
            self.__synopsis = synopsis.strip()
            self.__developer = developer.strip()
            self.__link_download = link_download.strip()
            self.__link_trailer = link_trailer.strip()
            self.__release_date = release_date
            self.__background_picture = background_picture
            self.__front_page = front_page
            self.__plataforms = plataforms
            self.__genders = genders
            self.__maps = maps
            self.__games_model = Games()

    def get_games(self, page):
        return self.__games_model.select_games(page)

    def get_game(self, id):
        return self.__games_model.select_game(id)

    def child_comments(self, id_game, id_comment, offset):
        if id_game and id_comment:
            return self.__games_model.get_child_comments(id_game, id_comment, offset)
        else:
            return {"comments": "no params"}

    def insert_game(self):
        if not self.__validate_fields():
            return {"error": "Invalid type fields"}

        print("intentas insertar un juego")

    def search(self, page):
        self.__genders = tuple(self.__genders)
        self.__plataforms = tuple(self.__plataforms)
        return self.__games_model.search_game(self.__title, page, self.__genders, self.__plataforms)

    def update_front_page(self):
        if self.__front_page != "":
            return self.__games_model.update_front_page(self.__id, self.__front_page)
        else:
            return {"error": "Front page is void", "code": 409}

    def insert_comment(self, username, content_comment, father_comment):
        users_link = []

        content_comment = BeautifulSoup(content_comment, "html.parser")
        content_comment = content_comment.get_text()

        if father_comment is not None:
            users = re.findall(r"@\w+[-\w_]*(?=\s|$|,)", content_comment)

            for i in range(0, len(users)):
                users_link.append(f"<a href=\"/view_profile/{re.sub("@", "", users[i])}/\">{users[i]}<a>")

            for j in range(0, len(users)):
                content_comment = re.sub(users[j], users_link[j], content_comment)

        return self.__games_model.insert_comment(username, self.__id, content_comment, father_comment)

    def insert_map(self, maps):
        return self.__games_model.insert_maps(self.__id, maps)

    def get_maps(self):
        return self.__games_model.get_maps(self.__id)

    def get_filters(self):
        return self.__games_model.get_filters()

    def new_game(self):
        if self.__validate_fields():
            return self.__games_model.insert_game(self.__title, self.__synopsis,
                                                  self.__developer, self.__link_download,
                                                  self.__link_trailer, self.__release_date,
                                                  self.__front_page, self.__background_picture,
                                                  self.__plataforms, self.__genders, self.__maps)
        else:
            return {"error": "Invalid fields", "code": 409}

    def __validate_fields(self):

        if len(self.__title) > 200 or len(self.__title) == 0:
            return False

        if len(self.__synopsis) <= 0:
            return False

        if len(self.__developer) > 50 or len(self.__developer) == 0:
            return False

        if len(self.__link_download) > 500 or len(self.__link_download) == 0:
            return False

        if len(self.__link_trailer) > 500 or len(self.__link_trailer) == 0:
            return False

        if len(self.__genders) == 0:
            return False

        if len(self.__plataforms) == 0:
            return False

        if len(self.__maps) < 1:
            return False

        #try:
            #    self.__release_date = re.sub("/", "-", self.__release_date)
            #    date = self.__release_date.split("-")
        #    datetime.date(date[0], date[1], date[2])
        #except Exception as e:
        #   print("Error: " + e)
        #   return False

        return True
