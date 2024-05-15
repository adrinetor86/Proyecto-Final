import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
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
            "type_actions": "action",
            "codes": "codes_confirm"
        }
        self.__connection = bd.connect(**config.DATABASE)
        self.__ph = PasswordHasher()

    def insert_user(self, email, username, password, role=3):
        hashed_password = self.__ph.hash(config.SALT + password)

        sql = f"INSERT INTO {self.__tables["users"]} VALUES ('{email}', '{username}', '{hashed_password}', CURDATE(), {role})"

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
                    return {"error": "Unknown error, try again", "code": 400}
            else:
                return {"error": "Email not found", "code": 403}
        except argon2.exceptions.VerifyMismatchError:
            return {"error": "Incorrect password or email", "code": 403}
        except Exception as e:
            return {"error": "Unknown error, try again", "code": 400}

    def confirm_exist_user(self, email):
        sql = f"SELECT email FROM {self.__tables["users"]} WHERE email = '{email}'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()

            if len(dict_return) != 0:
                code = self.__create_code(email)
                if code != 0:
                    if self.__send_email(email, code):
                        return {"success": "This email exist", "code": 200}
                    else:
                        return {"error": "unknown error when sending email", "code": 400}
                else:
                    return {"error": "unknown error when generating code", "code": 400}
            else:
                return {"success": "This email not exist", "code": 400}
        except mysql.connector.Error:
            return {"error": "Unknown error, try again", "code": 400}

    def confirm_code(self, email, code):
        sql = f"SELECT code FROM {self.__tables["codes"]} WHERE email = '{email}'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error:
            return False

        if len(dict_return) != 0:
            return dict_return[0]["code"] == code
        else:
            return False

    def change_password(self, email, password):
        sql = f"UPDATE {self.__tables["users"]} SET password = '{password}' WHERE email = '{email}'"

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            cursor.close()
            self.__connection.commit()
            return {"success": "password changed successfully", "code": 200}
        except mysql.connector.Error:
            return {"error": "Unknown error, try again", "code": 400}

    def __create_code(self, email):
        code = random.randint(10000, 99999)

        sql = f"INSERT INTO {self.__tables["codes"]} VALUES ('{email}', {code})"

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            cursor.close()
            self.__connection.commit()

            return code
        except mysql.connector.Error:
            return 0

    def __send_email(self, email, code):
        # Configuración del servidor SMTP de Gmail
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587  # Puerto para TLS/STARTTLS

        # Información de inicio de sesión en el servidor SMTP
        sender_email = 'antobsgames@gmail.com'
        password = 'malditojacket123'

        # Crear objeto mensaje
        mensaje = MIMEMultipart()
        mensaje['From'] = sender_email
        mensaje['To'] = email
        mensaje['Subject'] = 'Account confirmation code'

        # Cuerpo del correo
        cuerpo = f'Tu codigo para {email} es: {code}'
        mensaje.attach(MIMEText(cuerpo, 'plain'))

        # Iniciar sesión en el servidor SMTP y enviar el correo
        try:
            server = smtplib.SMTP(smtp_server, smtp_port)
            server.starttls()  # Habilitar cifrado TLS
            server.login(sender_email, password)
            text = mensaje.as_string()
            server.sendmail(sender_email, email, text)
            print('Correo enviado correctamente')
        except Exception as e:
            print('Error al enviar el correo:', e)
            return False
        finally:
            server.quit()

        return True

    def __get_data_user(self, email):
        sql = f"SELECT password, username FROM {self.__tables["users"]} WHERE email = '{email}'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            return [{'error': 'Cannot check data'}]

        return dict_return

    def __exist_username(self, username):
        sql = f"SELECT * FROM {self.__tables["users"]} WHERE username = '{username}'"

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
        sql = f"SELECT * FROM {self.__tables["users"]} WHERE email = '{email}'"

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
