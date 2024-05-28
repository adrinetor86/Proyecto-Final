"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from Backend.views import (games, game, login, register, child_comments, confirm_exist_user, confirm_code, change_password,
                           search, your_profile, change_picture, view_profile, new_game, portada, insert_comment, resend_email,
                           insert_map, get_maps, get_filters)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login, name='login'),
    path('api/v1/games/', search, name='search'),
    path('api/v1/game/<id>/', game, name='game'),
    path('register/', register, name='register'),
    path('confirm_user/', confirm_exist_user, name='confirm_exist_user'),
    path('confirm_code/', confirm_code, name='confirm_code'),
    path('change_password/', change_password, name='change_password'),
    path('comment/<id_game>/<id_comment>/', child_comments, name='child_comments'),
    path('comment/<id_game>/<id_comment>/<offset>/', child_comments, name='child_comments_offset'),
    path('your_profile/<username>/', your_profile, name='your_profile'),
    path('view_profile/<username>/', view_profile, name='view_profile'),
    path('change_picture_profile/<username>/', change_picture, name='change_picture'),
    path('new_game/', new_game, name='new_game'),
    path('insertar_guarro/', portada, name='portada'),
    path('insert_comment/<id_game>/', insert_comment, name='insert_comment_father'), #provisional insertar comentarios
    path('insert_comment/<id_game>/<father_comment>/', insert_comment, name='insert_comment'), #provisional insertar comentarios
    path('resend_email/', resend_email, name='resend_email'),
    path('insert_maps/<id_game>/', insert_map, name='insert_map'),
    path('get_maps/<id_game>/', get_maps, name='get_maps'),
    path('get_filters/', get_filters, name='get_filters'),
]
