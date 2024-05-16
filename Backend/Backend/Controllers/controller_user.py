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
            self.__user_model = User()

    def register(self):
        print(f"Email: {self.__email}")
        print(f"Username: {self.__username}")
        print(f"Password: {self.__password}")
        if validator.validate_email(self.__email) and validator.validate_username(self.__username) and validator.validate_password(self.__password):

            return self.__user_model.insert_user(self.__email, self.__username, self.__password, self.__rol)
        else:
            return {"error": "Void or incorrect fields", "code": 409}

    def login(self):
        return self.__user_model.confirm_user(self.__email.lower(), self.__password)

    def confirm_exist_user(self):
        if self.__email != "":
            return self.__user_model.confirm_exist_user(self.__email.lower())
        else:
            return {"error": "Void fields", "code": 409}

    def confirm_code(self, code):
        return self.__user_model.confirm_code(self.__email, code)

    def change_password(self):
        if validator.validate_password(self.__password):
            return self.__user_model.change_password(self.__email, self.__password)
        else:
            return {"error": "Void or incorrect fields", "code": 409}