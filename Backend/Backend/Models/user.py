import mysql
import mysql.connector as bd
import Backend.conf as config
from argon2 import PasswordHasher
import argon2

class User:

    def __init__(self):
        self.__tables = {
            "users": "users",
            "rol": "rols",
            "log": "log_actions",
            "type_actions": "action"
        }
        self.__connection = bd.connect(**config.DATABASE)
        self.__ph = PasswordHasher()

    def insert_user(self, email, username, password, role=3):
        hashed_password = self.__ph.hash(config.SALT + password)

        sql = f"INSERT INTO users VALUES ('{email}', '{username}', '{hashed_password}', CURDATE(), {role})"

        if not self.__exist_username(username):
            if not self.__exist_email(email):
                try:
                    cursor = self.__connection.cursor()
                    cursor.execute(sql)
                    cursor.close()
                    self.__connection.commit()

                    return {"success": "Account created successfully"}
                except mysql.connector.Error as error:
                    return {"error": "Unknown error, try again", "code": 400}
            else:
                return {"error": "Email already exists", "code": 409}
        else:
            return {"error": "Username already exists", "code": 409}

    def __exist_username(self, username):
        sql = f"SELECT * FROM users WHERE username = '{username}'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            return False

        if len(dict_return) == 0:
            return False
        else:
            return True

    def __exist_email(self, email):
        sql = f"SELECT * FROM users WHERE email = '{email}'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            return False

        if len(dict_return) == 0:
            return False
        else:
            return True



    #Confirma el usuario
    def confirm_user(self, email, password):
        try:
            data = self.__get_data_user(email)
            if len(data) > 0:
                dict_access = data[0]
                if dict_access.get("error", "") == "":
                    password_hashed = dict_access.get("password", "")
                    username = dict_access.get("username", "")
                    self.__ph.verify(password_hashed, (config.SALT + password))
                    return {"username": username}
                else:
                    return {"error": "Unknown error", "code": 400}
            else:
                return {"error": "Email not found", "code": 404}
        except argon2.exceptions.VerifyMismatchError:
            return {"error": "Incorrect password", "code": 404}
        except Exception as e:
            return {"error": "Unknown error", "code": 400}

    def __get_data_user(self, email):
        sql = f"SELECT password, username FROM users WHERE email = '{email}'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            return [{'error': 'Cannot check data'}]

        return dict_return
