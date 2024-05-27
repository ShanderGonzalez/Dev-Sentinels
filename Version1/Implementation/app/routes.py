from flask import Blueprint, request, jsonify, render_template
from .database import SessionLocal
from .models import Traduccion
from .traductor import espanol_a_braille, braille_a_espanol

main_bp = Blueprint('main', __name__)

def validar_entrada_espanol(texto):
    caracteres_validos = set("abcdefghijklmnopqrstuvwxyzáéíóúüñ ,;:.!?¿¡()-/0123456789")
    return all(char in caracteres_validos for char in texto.lower())

def validar_entrada_braille(texto):
    caracteres_validos = set("⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚⠅⠇⠍⠝⠕⠏⠟⠗⠎⠞⠥⠧⠺⠭⠽⠵⠷⠮⠌⠬⠾⠳⠂⠆⠒⠲⠖⠢⠦⠤⠌⠼ ")
    return all(char in caracteres_validos for char in texto)

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/traducir/espanol_a_braille', methods=['POST'])
def traducir_espanol_a_braille():
    data = request.json
    texto_esp = data['texto']

    if not validar_entrada_espanol(texto_esp):
        return jsonify({"error": "Entrada inválida. Por favor, ingrese solo caracteres válidos en español."}), 400

    texto_braille = espanol_a_braille(texto_esp)

    db = SessionLocal()
    traduccion = Traduccion(texto_esp=texto_esp, texto_braille=texto_braille)
    db.add(traduccion)
    db.commit()
    db.refresh(traduccion)
    db.close()

    return jsonify({"texto_braille": texto_braille})

@main_bp.route('/traducir/braille_a_espanol', methods=['POST'])
def traducir_braille_a_espanol():
    data = request.json
    texto_braille = data['texto']

    if not validar_entrada_braille(texto_braille):
        return jsonify({"error": "Entrada inválida. Por favor, ingrese solo caracteres válidos en Braille."}), 400

    texto_esp = braille_a_espanol(texto_braille)

    db = SessionLocal()
    traduccion = Traduccion(texto_esp=texto_esp, texto_braille=texto_braille)
    db.add(traduccion)
    db.commit()
    db.refresh(traduccion)
    db.close()

    return jsonify({"texto_esp": texto_esp})
