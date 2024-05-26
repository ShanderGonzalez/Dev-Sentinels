# Diccionario de traducción
ESPAÑOL_A_BRAILLE = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛',
    'h': '⠓', 'i': '⠊', 'j': '⠚', 'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝',
    'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞', 'u': '⠥',
    'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', 'á': '⠷', 'é': '⠮',
    'í': '⠌', 'ó': '⠬', 'ú': '⠾', 'ü': '⠳', 'ñ': '⠻', ' ': ' ',
    '1': '⠼⠁', '2': '⠼⠃', '3': '⠼⠉', '4': '⠼⠙', '5': '⠼⠑', '6': '⠼⠋',
    '7': '⠼⠛', '8': '⠼⠓', '9': '⠼⠊', '0': '⠼⠚', ',': '⠂', ';': '⠆',
    ':': '⠒', '.': '⠲', '!': '⠖', '?': '⠢', '¿': '⠢', '¡': '⠖', '(': '⠶',
    ')': '⠶', '-': '⠤', '/': '⠌'
}

BRAILLE_A_ESPAÑOL = {v: k for k, v in ESPAÑOL_A_BRAILLE.items()}

def espanol_a_braille(texto):
    return ''.join(ESPAÑOL_A_BRAILLE.get(char, char) for char in texto.lower())

def braille_a_espanol(texto):
    resultado = []
    skip = False
    for i, char in enumerate(texto):
        if skip:
            skip = False
            continue
        if char == '⠼':
            if i + 1 < len(texto) and texto[i + 1] in BRAILLE_A_ESPAÑOL:
                resultado.append(BRAILLE_A_ESPAÑOL[texto[i:i+2]])
                skip = True
        else:
            resultado.append(BRAILLE_A_ESPAÑOL.get(char, char))
    return ''.join(resultado)
