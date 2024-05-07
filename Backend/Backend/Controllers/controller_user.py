import datetime
import re
from Backend.Models.user import User
import Backend.Libs.validate_data as validator

class ControllerUser:

    def __init__(self, email = "", username = "", password = "", rol = 3):
            self.__email = email.lower()
            self.__username = username
            self.__password = password
            self.__rol = rol

    def register(self):
        print(f"Email: {self.__email}")
        print(f"Username: {self.__username}")
        print(f"Password: {self.__password}")
        if validator.validate_email(self.__email) and validator.validate_username(self.__username) and validator.validate_password(self.__password):
            self.__user_model = User()

            return self.__user_model.insert_user(self.__email, self.__username, self.__password, self.__rol)
        else:
            return {"error": "Void fields", "code": 409}

    def login(self):
        self.__user_model = User()
        return self.__user_model.confirm_user(self.__email.lower(), self.__password)