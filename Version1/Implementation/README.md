# Traductor Braille

Este proyecto es una aplicación web que traduce texto entre español y Braille, y viceversa.

## Requisitos

- Python 3.8 o superior
- Flask
- SQLAlchemy

## Instalación

1. Clona este repositorio.
2. Crea un entorno virtual: `python -m venv venv`
3. Activa el entorno virtual:
   - En Windows: `venv\Scripts\activate`
   - En macOS/Linux: `source venv/bin/activate`
4. Instala las dependencias: `pip install -r requirements.txt`
5. Inicia la aplicación: `python main.py`

## Uso

1. Abre tu navegador web y visita `http://127.0.0.1:5000`.
2. Ingresa texto en español o Braille y obtén la traducción correspondiente.

## Estructura del Proyecto

- `app/`: Contiene la lógica de la aplicación.
- `static/`: Contiene archivos estáticos como CSS y JavaScript.
- `templates/`: Contiene las plantillas HTML.
- `main.py`: Archivo principal de la aplicación.
- `requirements.txt`: Lista de dependencias del proyecto.
