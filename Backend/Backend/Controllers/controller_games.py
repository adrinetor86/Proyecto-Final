import datetime
import re
from Backend.Models.games import Games

class ControllerGames:

    def __init__(self, title = "", synopsis = "", developer = "", link_download = "", link_trailer = "", release_date = ""):
            self.__title = title
            self.__synopsis = synopsis
            self.__developer = developer
            self.__link_download = link_download
            self.__link_trailer = link_trailer
            self.__release_date = release_date
            self.__games_model = None

    def get_games(self, page):
        self.__games_model = Games()

        return self.__games_model.select_games(page)

    def get_game(self, id):
        self.__games_model = Games()

        return self.__games_model.select_game(id)

    def child_comments(self, id_game, id_comment, offset):
        if id_game and id_comment:
            self.__games_model = Games()
            return {"comments": self.__games_model.get_child_comments(id_game, id_comment, offset)}
        else:
            return {"comments": "no params"}

    def insert_game(self):
        if not self.__validate_fields():
            return {"error": "Invalid type fields"}

        print("intentas insertar un juego")

    def search(self):
        self.__games_model = Games()

        return self.__games_model.search_game(self.__title)

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
