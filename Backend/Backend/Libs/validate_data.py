import re

def validate_email(email):
    return re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', email)

def validate_password(password):
    return re.match(r'^(?=.*\d)(?=.*[a-zA-Z]).{8,}$', password)

def validate_username(username):
    return len(username) > 4