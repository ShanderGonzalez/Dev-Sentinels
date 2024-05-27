braille_espanol = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
    'á': '⠷', 'é': '⠮', 'í': '⠌', 'ó': '⠬', 'ú': '⠾', 'ü': '⠳',
    ',': '⠂', ';': '⠆', ':': '⠒', '.': '⠲', '!': '⠖', '¿': '⠢',
    '?': '⠦', '¡': '⠖', '(': '⠷', ')': '⠾', '-': '⠤', '/': '⠌',
    ' ': ' ',
}

numeros_braille = {
    '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
    '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚',
}

espanol_braille = {**braille_espanol, **numeros_braille}
braille_espanol = {v: k for k, v in espanol_braille.items()}

def espanol_a_braille(texto):
    resultado = []
    numero_agregado = False
    for char in texto.lower():
        if char.isdigit():
            if not numero_agregado:
                resultado.append('⠼')
                numero_agregado = True
        else:
            numero_agregado = False
        resultado.append(espanol_braille.get(char, char))
    return ''.join(resultado)


def braille_a_espanol(texto_braille):
    resultado = []
    modo_numero = False
    for char in texto_braille:
        if char == '⠼':
            modo_numero = True
            continue
        if modo_numero:
            if char in numeros_braille.values():
                resultado.append(braille_espanol[char])
            modo_numero = False
        else:
            resultado.append(braille_espanol.get(char, char))
    return ''.join(resultado)
