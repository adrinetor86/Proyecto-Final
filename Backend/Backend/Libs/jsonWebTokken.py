import jwt
import datetime
import Backend.conf as config

def create_token(email, username):
    data = {
        'email': email,
        'username': username,
        'exp': datetime.datetime.now() + datetime.timedelta(seconds=1800)  # Tiempo de expiración del token
    }

    encoded_jwt = jwt.encode(data, config.SECRET_KEY, algorithm='HS256')

    return encoded_jwt

def decode_token(encoded_jwt):
    try:
        payload = jwt.decode(encoded_jwt, config.SECRET_KEY, algorithms=['HS256'])
        print("Token verificado con éxito, payload:", payload)
        return True
    except jwt.ExpiredSignatureError:
        print("El token ha expirado.")
        return False
    except jwt.InvalidTokenError:
        print("Token inválido.")
        return False