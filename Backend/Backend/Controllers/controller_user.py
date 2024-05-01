import datetime
import re
from Backend.Models.user import User

class ControllerUser:

    def __init__(self, email = "", username = "", password = "", rol = 3):
            self.__email = email.lower()
            self.__username = username
            self.__password = password
            self.__rol = rol

    def register(self):
        self.__user_model = User()
        self.__user_model.insert_user(self.__email, self.__username, self.__password, self.__rol)

    def login(self):
        self.__user_model = User()
        return self.__user_model.confirm_user(self.__email.lower(), self.__password)