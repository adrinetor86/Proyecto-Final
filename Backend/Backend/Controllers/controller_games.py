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


    def get_games(self):
        self.__games_model = Games()
        return {"games": self.__games_model.select_games()}

    def get_game(self, id):
        self.__games_model = Games()
        return {"game": self.__games_model.select_game(id)}

    def insert_game(self):
        if not self.__validate_fields():
            return {"error": "Invalid type fields"}

        print("intentas insertar un juego")


    def __validate_fields(self):

        if len(self.__title) > 200 or len(self.__title) == 0:
            return False

        if len(self.__synopsis) > 500 or len(self.__synopsis) < 10:
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
