import datetime
import re
from Backend.Models.user import User
import Backend.Libs.validate_data as validator
import base64

class ControllerUser:

    def __init__(self, email="", username="", password="", rol=3, picture=""):
            self.__email = email.lower()
            self.__username = username
            self.__password = password
            self.__rol = rol
            self.__picture = picture
            self.__user_model = User()

    def register(self):
        if validator.validate_email(self.__email) and validator.validate_username(self.__username) and validator.validate_password(self.__password):
            return self.__user_model.insert_user(self.__email.lower().strip(), self.__username.strip(), self.__password.strip(), self.__rol)
        else:
            return {"error": "Void or incorrect fields", "code": 409}

    def login(self):
        return self.__user_model.confirm_user(self.__email.lower(), self.__password)

    def confirm_exist_user(self):
        if self.__email != "":
            return self.__user_model.confirm_exist_user(self.__email.lower().strip())
        else:
            return {"error": "Void fields", "code": 409}

    def confirm_code(self, code):
        return self.__user_model.confirm_code(self.__email.lower().strip(), code)

    def change_password(self):
        if validator.validate_password(self.__password):
            return self.__user_model.change_password(self.__email.lower().strip(), self.__password)
        else:
            return {"error": "Void or incorrect fields", "code": 409}

    def get_your_profile(self):
        return self.__user_model.get_your_profile(self.__username.strip())

    def get_other_profile(self):
        return self.__user_model.get_other_profile(self.__username.strip())

    def change_picture(self):

        if self.__picture is not None:
            return self.__user_model.change_picture(self.__picture, self.__username.strip())
        else:
            return {"error": "Picture was bad sent", "code": 409}

    def resend_email(self):
        return self.__user_model.resend_email(self.__email.lower().strip())

    def get_a_user(self):
        return self.__user_model.get_a_user(self.__username)

    def send_warn_email(self, subject, message):
        if subject is None or message is None:
            return {"error": "Void or incorrect fields", "code": 409}

        return self.__user_model.send_warn_email(self.__username, subject, message)