<p align="center" style="margin-bottom: 0;">
  <img src="Frontend/src/assets/logo.png" width="300">
</p>

<h1 align="center" style="margin-top: 0;">
  Antobsgames
</h1>

Este proyecto de fin de ciclo ha sido desarrollado por [Adrián Jacek](https://github.com/adrinetor86), [Nahuel Hidalgo](https://github.com/adrinetor86) y [Jorge Pulluaguari](https://github.com/adrinetor86) en el cual hemos utilizado principalmente Angular 17 para la parte del cliente y para el backend Django 5.0.4 y Pythoon 3.12.3 y MySQL para la base de datos  

## FRONTEND

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.  
### Para crear nuevos componentes (Poner EL --module app)
    ng g c header --module app
### Instalar Prime Angular
    npm install primeng

## BACKEND

### Instalar python 
https://www.python.org/downloads/

    python --version
* Version debe ser la "3.12.3"

### Instalar Django
    pip install Django==5.0.4
    python -m django --version

### Iniciar servidor django
    cd ./Backend
    python manage.py runserver

Ruta base de Django: http://127.0.0.1:8000/


# COSAS A TENER EN CUENTA / IDEAS
* Poder indicar cuantos juegos mostrar por pantalla 
* Poder permitirle al usuario que se cambie la foto de perfil y sus datos (tener unas 5 imagenes default que pueda elegir o que las importe de su ordena)
* Cuando das like a un comentario y no estas logeado te lleva directo a login (Obviamente tener en cuenta si ese usuario)
* Darle alguna funcionalidad a los botones del footer y header
* Borrar el componente not found e intentar redireccionar a main page
* Menos espacio entre los juegos
