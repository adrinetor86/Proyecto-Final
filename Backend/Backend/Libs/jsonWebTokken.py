import jwt
import datetime
import Backend.conf as config

def create_token(email, username, rol=3):

    if username != "":
        data = {
            'email': email,
            'username': username,
            'rol': rol,
            'exp': datetime.datetime.now() + datetime.timedelta(seconds=1800)  # Tiempo de expiración del token
        }

        encoded_jwt = jwt.encode(data, config.SECRET_KEY, algorithm='HS256')

        return encoded_jwt
    else:  #ESTE ELSE DA 15 MINS PARA PERMITIR EL CAMBIO DE CONTRASEÑA
        data = {
            'email': email,
            'exp': datetime.datetime.now() + datetime.timedelta(seconds=900)  # Tiempo de expiración del token
        }

        encoded_jwt = jwt.encode(data, config.SECRET_KEY, algorithm='HS256')

        return encoded_jwt
def decode_token(encoded_jwt):
    try:
        payload = jwt.decode(encoded_jwt, config.SECRET_KEY, algorithms=['HS256'])
        print("Token verificado con éxito, payload:", payload)
        return {"success": "Valid token"}
    except jwt.ExpiredSignatureError: #401
        print("El token ha expirado.")
        return {"error": "Invalid token", "code": 401}
    except jwt.InvalidTokenError:
        print("Token inválido.")
        return {"error": "Invalid token", "code": 400}

def confirm_user(encoded_jwt, username):
    try:
        payload = jwt.decode(encoded_jwt, config.SECRET_KEY, algorithms=['HS256'])
        return payload['username'] == username
    except jwt.ExpiredSignatureError: #401
        print("El token ha expirado.")
        return False
    except jwt.InvalidTokenError:
        print("Token inválido.")
        return False

def confirm_email(encoded_jwt, email):
    try:
        payload = jwt.decode(encoded_jwt, config.SECRET_KEY, algorithms=['HS256'])
        return payload['email'] == email
    except jwt.ExpiredSignatureError: #401
        print("El token ha expirado.")
        return False
    except jwt.InvalidTokenError:
        print("Token inválido.")
        return False

def confirm_user_rol(encoded_jwt, data_user):
    try:
        payload = jwt.decode(encoded_jwt, config.SECRET_KEY, algorithms=['HS256'])
        return payload['email'] == data_user["email"] and payload['rol'] == data_user["rol_user"] and data_user["rol_user"] == 1
    except jwt.ExpiredSignatureError: #401
        print("El token ha expirado.")
        return False
    except jwt.InvalidTokenError:
        print("Token inválido.")
        return False