import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

packages = [
    "mysql-connector-python",
    "argon2-cffi",
    "PyJWT",
    "beautifulsoup4"
]

for package in packages:
    print(f"Instalando {package}...")
    install(package)
    print(f"{package} instalado exitosamente.")

print("Todas las librerías han sido instaladas.")

# Verificación de la instalación
try:
    import mysql.connector
    import argon2
    import jwt
    from bs4 import BeautifulSoup

    print("Todas las librerías están instaladas y se pueden importar correctamente.")
except ImportError as e:
    print(f"Error al importar una de las librerías: {e}")