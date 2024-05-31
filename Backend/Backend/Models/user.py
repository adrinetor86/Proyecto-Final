import os
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

        sql = f"INSERT INTO {self.__tables["users"]} (email, username, password, date_creation, rol_user) VALUES ('{email}', '{username}', '{hashed_password}', CURDATE(), {role})"

        if not self.__exist_username(username):
            if not self.__exist_email(email):
                try:
                    cursor = self.__connection.cursor()
                    cursor.execute(sql)
                    cursor.close()
                    self.__connection.commit()
                    return {"success": "Account created successfully"}
                except mysql.connector.Error as error:
                    print('Error: ' + error.msg)
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
                    print('llega aqui')
                    return {"username": username,
                            "rol_user": dict_access.get("rol_user", 3),
                            "name_rol": dict_access.get("name_rol", "usuario")}
                else:
                    return {"error": "User not found", "code": 400}
            else:
                return {"error": "Email not found", "code": 403}
        except argon2.exceptions.VerifyMismatchError:
            return {"error": "Incorrect password or email", "code": 403}
        except Exception:
            return {"error": "Email not found", "code": 409}


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
                return {"error": "This email not exist", "code": 400}
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
            return str(dict_return[0]["code"]) == code
        else:
            return False

    def resend_email(self, email):
        code = self.__recover_code(email)

        if code != 0:
            self.__send_email(email, code)
        else:
            new_code = self.__create_code(email)
            if code != 0:
                self.__send_email(email, new_code)
            else:
                return False

        return True

    def __recover_code(self, email):
        sql = f"SELECT code FROM {self.__tables["codes"]} WHERE email = '{email}'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            code = cursor.fetchone()
            cursor.close()

            if code.get("code", "") != "":
                return code.get("code")
            else:
                return 0
        except mysql.connector.Error:
            return 0

    def change_password(self, email, password):
        hashed_password = self.__ph.hash(config.SALT + password)
        sql = f"UPDATE {self.__tables["users"]} SET password = '{hashed_password}' WHERE email = '{email}'"

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            cursor.close()
            self.__connection.commit()

            return {"success": "password changed successfully", "code": 200}
        except mysql.connector.Error:
            return {"error": "Unknown error, try again", "code": 400}

    def get_your_profile(self, username):
        sql = (f"SELECT email, username, date_creation, "
               f"CASE"
               f" WHEN rol_user = 1 THEN 'Administrator'"
               f" WHEN rol_user = 2 THEN 'Editor'"
               f" ELSE 'User'"
               f" END AS rol"
               f", profile_picture"
               f" FROM users WHERE username = '{username}'")

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()

            print(dict_return)

            if dict_return[0]["profile_picture"] == None:
                with open(os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Images', 'Profile', 'default.txt')), 'r') as file:
                    picture_profile = file.read()
                    dict_return[0]["profile_picture"] = picture_profile

            return {"profile": dict_return[0]}
        except mysql.connector.Error:
            return {"error": "Cannot get profile", "code": 400}

    def get_other_profile(self, username):
        sql = (f"SELECT username, date_creation, profile_picture FROM users WHERE username = '{username}'")

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()

            if dict_return[0]["profile_picture"] == None:
                with open(os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Images', 'Profile', 'default.txt')), 'r') as file:
                    picture_profile = file.read()
                    dict_return[0]["profile_picture"] = picture_profile

            return {"profile": dict_return[0]}
        except mysql.connector.Error:
            return {"error": "Cannot get profile", "code": 400}

    def change_picture(self, picture, username):
        sql = f"UPDATE users SET profile_picture = '{picture}' WHERE username = '{username}'"

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            cursor.close()
            self.__connection.commit()

            return {"success": "profile picture changed successfully", "new_picture": picture}
        except mysql.connector.Error:
            return {"error": "Unknown error, try again", "code": 400}

    def __create_code(self, email):
        code = random.randint(10000, 99999)

        sql = f"INSERT INTO {self.__tables["codes"]} (email, code) VALUES ('{email}', {code})"

        try:
            cursor = self.__connection.cursor()
            cursor.execute(sql)
            cursor.close()
            self.__connection.commit()

            return code
        except mysql.connector.Error:
            code = self.__recover_code(email)

            if code != 0:
                return code
            else:
                return 0

    def __send_email(self, email, code):
        # Configuración del servidor SMTP de Gmail
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587  # Puerto para TLS/STARTTLS

        # Información de inicio de sesión en el servidor SMTP
        sender_email = 'antobsgames@gmail.com'
        password = 'g v d d b x a pe w v z x g p r'

        # Crear objeto mensaje
        mensaje = MIMEMultipart()
        mensaje['From'] = sender_email
        mensaje['To'] = email
        mensaje['Subject'] = 'Account confirmation code'

        with open(os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Images', 'Email', 'background_code.txt')),'r') as file:
            background_image = file.read()

        with open(os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Images', 'Email', 'marco.txt')),'r') as file:
            marco = file.read()

        # Cuerpo del correo
        cuerpo = f"""
        <head>
            <title>Confirmación de Código de Verificación</title>
        </head>
        <body style="margin: 0; display: flex; min-height: 50vh; flex-flow: column; justify-content: center; align-items: center; background-image: url('{background_image}'); background-size: 100%; background-repeat: no-repeat; background-position: bottom;">
            <table>
                <tr>
                    <td>
                        <p style="font-weight: bold; text-align: center;">Estimado {email},</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="font-weight: bold; text-align: center;">Para completar el proceso de verificación de tu cuenta, requerimos que ingreses el código de verificación proporcionado a continuación:</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p id='code' style="margin: 2% 0; font-size: xx-large; color: rgb(211, 175, 81); text-align: center; background-image: url('{marco}'); background-size: 300px;">{code}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="font-weight: bold; text-align: center;">Por favor, asegúrate de introducir este código en la plataforma correspondiente para validar tu cuenta de manera efectiva.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="font-weight: bold; text-align: center;">Si tienes alguna pregunta o necesitas asistencia adicional, no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte en cualquier momento.</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="font-weight: bold; text-align: center;"><strong>@Antobs Company</strong></p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p style="font-weight: bold; text-align: center;">{sender_email}</p>
                    </td>
                </tr>
            </table>
        </body>
        """

        mensaje.attach(MIMEText(cuerpo, 'html'))

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

    def get_a_user(self, username):
        sql = f"SELECT email, rol_user FROM {self.__tables["users"]} WHERE username LIKE '{username}'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchone()
            cursor.close()
        except mysql.connector.Error as error:
            return None

        return dict_return

    def __get_data_user(self, email):
        sql = f"SELECT password, username, rol_user FROM {self.__tables["users"]} WHERE email LIKE '{email}'"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchall()
            cursor.close()
        except mysql.connector.Error as error:
            return [{'error': 'Cannot check data'}]

        dict_return[0]["name_rol"] = self.__get_name_rol_user(dict_return[0]["rol_user"])

        return dict_return

    def __get_name_rol_user(self, id_rol):
        sql = f"SELECT type_rol FROM {self.__tables["rol"]} WHERE id_rol = {id_rol}"

        try:
            cursor = self.__connection.cursor(dictionary=True)
            cursor.execute(sql)
            dict_return = cursor.fetchone()
            cursor.close()
            return dict_return["type_rol"]
        except mysql.connector.Error as error:
            print('aqui me quedo socio')
            return 'Usuario'


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
