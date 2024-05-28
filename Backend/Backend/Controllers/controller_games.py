import datetime
import re
from Backend.Models.games import Games

class ControllerGames:

    def __init__(self, id=0, title="", synopsis="", developer="", link_download="", link_trailer="", release_date="", front_page=""):
            self.__id = id
            self.__title = title.strip()
            self.__synopsis = synopsis.strip()
            self.__developer = developer.strip()
            self.__link_download = link_download.strip()
            self.__link_trailer = link_trailer.strip()
            self.__release_date = release_date
            self.__front_page = front_page
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
        return self.__games_model.search_game(self.__title, page)

    def update_front_page(self):
        if self.__front_page != "":
            return self.__games_model.update_front_page(self.__id, self.__front_page)
        else:
            return {"error": "Front page is void", "code": 409}

    def insert_comment(self, username, content_comment, father_comment):
        content_comment = re.sub(f"@{username}", f"<a href='/view_profile/{username}/'>@{username}</a>", content_comment)
        return self.__games_model.insert_comment(username, self.__id, content_comment, father_comment)

    def insert_map(self, maps):
        return self.__games_model.insert_maps(self.__id, maps)

    def get_maps(self):
        return self.__games_model.get_maps(self.__id)

    def get_filters(self):
        return self.__games_model.get_filters()

    def __validate_fields(self):

        if len(self.__title) > 200 or len(self.__title) == 0:
            return False

        if len(self.__synopsis) > 1000 or len(self.__synopsis) < 10:
            return False

        if len(self.__developer) > 50 or len(self.__developer) == 0:
            return False

        if len(self.__link_download) > 200 or len(self.__link_download) == 0:
            return False

        if len(self.__link_trailer) > 200 or len(self.__link_trailer) == 0:
            return False

        try:
            self.__release_date = re.sub("/", "-", self.__release_date)
            date = self.__release_date.split("-")
            datetime.date(date[0], date[1], date[2])
        except Exception as e:
            print("Error: " + e)
            return False

        return True
