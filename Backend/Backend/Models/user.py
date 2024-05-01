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

    def insert_user(self, email, username, password, role = 3):
        hashed_password = self.__ph.hash(config.SALT + password)

        sql = f"INSERT INTO users VALUES ('{email}', '{username}', '{hashed_password}', CURDATE(), {role})"

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            cursor.close()
            self.__connection.commit()
        except mysql.connector.Error as error:
            return {'error': 'error en la conexion en la base de datos'}

    def confirm_user(self, email, password):
        try:
            dict_access = self.__get_password(email)
            password_hashed = dict_access.get("password", "")
            username = dict_access.get("username", "")
            return {"return": self.__ph.verify(password_hashed, (config.SALT + password)), "username": username}
        except argon2.exceptions.VerifyMismatchError:
            return {"return": False}

    def __get_password(self, email):
        sql = f"SELECT password, username FROM users WHERE email = '{email}'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            return [{'error': 'error en la conexion en la base de datos'}]

        return dict_return[0]
