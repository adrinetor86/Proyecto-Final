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
from Backend.views import games, game, login, register, child_comments

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/games/', games, name='games'),
    path('api/v1/games/<id>/', game, name='game'),
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('comment/<id_game>/<id_comment>/', child_comments, name='child_comments'),
    path('comment/<id_game>/<id_comment>/<offset>/', child_comments, name='child_comments_offset'),
]
