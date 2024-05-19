import os, mysql.connector
import Backend.conf as conf

def ejecutar_archivo_sql(archivo_sql, conexion_config):
    try:
        conexion = mysql.connector.connect(**conexion_config)
        cursor = conexion.cursor()

        # Lectura del archivo SQL y división de consultas
        with open(archivo_sql, 'r', encoding = 'cp850') as archivo:
            consultas = archivo.read().split(';')

        for consulta in consultas:
            if consulta.strip():  # Ignorar líneas en blanco
                cursor.execute(consulta)

        conexion.commit()
        print("Archivo SQL ejecutado correctamente")

    except Exception as e:
        print("Error al ejecutar el archivo SQL:", e)

    finally:
        if 'conexion' in locals() and conexion.is_connected():
            cursor.close()
            conexion.close()

def borrar_y_recrear_base_datos(conexion_config, nombre_base_datos):
    try:
        conexion = mysql.connector.connect(**conexion_config)
        cursor = conexion.cursor()

        cursor.execute("DROP DATABASE IF EXISTS {}".format(nombre_base_datos))
        cursor.execute("CREATE DATABASE {}".format(nombre_base_datos))

    except mysql.connector.Error as err:
        print("Error al borrar y recrear la base de datos:", err)

    finally:
        if 'conexion' in locals() and conexion.is_connected():
            cursor.close()
            conexion.close()
            print("Conexión cerrada")

archivo_sql = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'Database', 'tfg.sql'))

# Parámetros de conexión a la base de datos
Database = conf.DATABASE

borrar_y_recrear_base_datos(Database, Database['database'])
ejecutar_archivo_sql(archivo_sql, Database)

