<p align="center" style="margin-bottom: 0;">
  <img src="Frontend/src/assets/logo.png" width="300">
</p>

<h1 align="center" style="margin-top: 0;">
  Antobsgames
</h1>

Este proyecto de fin de ciclo ha sido desarrollado por [Adrián Jacek](https://github.com/adrinetor86), [Nahuel Hidalgo](https://github.com/adrinetor86) y [Jorge Pulluaguari](https://github.com/adrinetor86) en el cual hemos utilizado principalmente Angular 17 para la parte del cliente y para el backend Django 5.0.4 y Pythoon 3.12.3 y MySQL para la base de datos  
## DESCRIPCIÓN
Antobsgames es una aplicacion desarrollada con el fin de ayudar a los usuarios a la hora de comprar o descargar cualquier juego. Gracias a la información que mostramos de cada juego y la posibilidad que tienen los usuarios de realizar comentarios en cada juego.
La aplicación esta dividida en dos roles: Administrador y Usuario. En donde el administrador pordrá crear, editar o borrar juegos.
## Tecnologías Utilizadas

<table>
  <tr>
    <th>Categoría</th>
    <th>Tecnologías</th>
  </tr>
  <tr>
    <td>Frontend</td>
    <td>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/512px-Angular_full_color_logo.svg.png" alt="Angular" width="50">
      <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" alt="CSS3" width="40">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png" alt="Html" width="50">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/2560px-Bootstrap_logo.svg.png" alt="Bootstrap" width="50">
    </td>
  </tr>
  <tr>
    <td>Backend</td>
    <td>
      <img src="https://juststickers.in/wp-content/uploads/2016/05/django-badge.png" alt="Django" width="50">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" alt="Pythoon" width="50">
    </td>
  </tr>
  <tr>
    <td>Base de Datos</td>
    <td>
      <img src="https://qloudea.com/blog/wp-content/uploads/2022/11/mysql-logo.jpg" alt="MySQL" width="100">
    </td>
  </tr>
  <tr>
    <td>Autenticación</td>
    <td>
      <img src="https://cdn.worldvectorlogo.com/logos/jwt-3.svg" alt="JWT" width="50">
    </td>
  </tr>
  <tr>
    <td>Control de Versiones</td>
    <td>
      <img src="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png" alt="Git" width="50">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXDgKo9QjWONkzHlgZSjFWISQKPcATfj0Dfw&s" alt="GitHub" width="50">
    </td>
  </tr>
  <tr>
    <td>Herramientas de Desarrollo</td>
    <td>
      <img src="https://seeklogo.com/images/P/pycharm-edu-logo-73119B2E09-seeklogo.com.png" alt="Pycharm" width="50">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/WebStorm_Icon.svg/1200px-WebStorm_Icon.svg.png" alt="Webstorm" width="50">
      <img src="https://cdn.worldvectorlogo.com/logos/postman.svg" alt="Postman" width="50">
    </td>
  </tr>
</table>

<p>Estas tecnologías han sido seleccionadas por su popularidad, soporte comunitario y capacidad para cumplir con los requisitos del proyecto de manera eficiente. La combinación de estas herramientas ha permitido crear una aplicación web moderna, segura y escalable, ofreciendo una experiencia de usuario de alta calidad.</p>
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
