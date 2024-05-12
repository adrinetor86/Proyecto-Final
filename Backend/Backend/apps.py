from django.apps import AppConfig
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.core.management import call_command

import os

class MyAppConfig(AppConfig):
    def ready(self):
        # Importante: asegúrate de reemplazar 'path_al_archivo.sql' con la ruta correcta de tu archivo SQL
        script_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'Database', 'tfg1.sql')

        # Define la función para ejecutar el script SQL
        def execute_sql_script(sender, **kwargs):
            call_command('sqlmigrate', 'my_app', script_path)

        # Conecta la señal post_migrate al manejador de eventos
        post_migrate.connect(execute_sql_script, sender=self)