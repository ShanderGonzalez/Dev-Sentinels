import BrailleDictionary from "./dictionary.js";
import Validator from "./validate.js";

class Traductor {
    constructor() {
        this.diccionarioBraille = new BrailleDictionary();
        this.validador = new Validator();
    }

    traducirEspanolABraille(texto) {
        let lineas = texto.split("\n");
        let brailleTexto = "";

        for (let linea of lineas) {
            brailleTexto += this.traducirLineaABraille(linea) + "\n";
        }

        return brailleTexto.trim();
    }

    traducirLineaABraille(texto) {
        let brailleTexto = "";
        let esNumero = false;
        let esNumComp = false;

        let palabras = texto.split(" ");
        for (let palabra of palabras) {
            if (palabra === palabra.toUpperCase() && palabra.match(/[a-zA-Z]/)) {
                brailleTexto += " 46 46";
            }
            if (this.validador.validarCorreo(palabra) || this.validador.validarURL(palabra) || this.validador.validarEtiqueta(palabra)) {
                esNumComp = true;
            }
            esNumero = false; // Reset for each word
            let i = 0;
            while (i < palabra.length) {
                let caracter = palabra[i];

                if (caracter >= '0' && caracter <= '9') {
                    if (!esNumero && !esNumComp) {
                        brailleTexto += " 3456";
                        esNumero = true;
                    }
                    let brailleNumero = this.diccionarioBraille.getNumeroBraille(caracter, esNumComp);
                    if (brailleNumero) {
                        brailleTexto += " " + brailleNumero;
                    }
                } else {
                    if (esNumero) {
                        esNumero = false;
                        if (i + 1 < palabra.length && !palabra[i + 1].match(/\d/) && !caracter.match(/\s/)) {
                            brailleTexto += " 5";
                        }
                    }

                    if (caracter.match(/[a-zA-Z\u00C0-\u00FF]/)) {
                        let brailleLetra;
                        if (palabra === palabra.toUpperCase()) {
                            brailleLetra = this.diccionarioBraille.getLetraBraille(caracter.toLowerCase());
                        } else {
                            if (caracter === caracter.toUpperCase()) {
                                brailleTexto += " 46";
                            }
                            brailleLetra = this.diccionarioBraille.getLetraBraille(caracter.toLowerCase());
                        }
                        if (brailleLetra) {
                            brailleTexto += " " + brailleLetra;
                        }
                    } else if (caracter.match(/\s/)) {
                        brailleTexto += " ";
                    } else {
                        let brailleSigno;
                        if (palabra[i - 1] && palabra[i - 1].match(/[0-9]/) && palabra[i + 1] && palabra[i + 1].match(/[0-9]/) && caracter === ".") {
                            brailleSigno = this.diccionarioBraille.getSigno(",");
                        } else {
                            brailleSigno = this.diccionarioBraille.getSigno(caracter);
                        }
                        if (brailleSigno) {
                            brailleTexto += " " + brailleSigno;
                        }
                    }
                }

                i++;
            }
            brailleTexto += " "; // Añadir espacio entre palabras
        }

        return brailleTexto.trim();
    }

    traducirBrailleAEspanol(braille) {
        let brailleArray = braille.split(" ");
        let texto = "";
        console.log(brailleArray);
        for (let brailleCode of brailleArray) {
            if (brailleCode === "") {
                texto += " ";
                continue;
            }
            let caracter = this.diccionarioBraille.getBrailleLetra(brailleCode);
            if (caracter) {
                texto += caracter;
            }
        }

        return texto.trim();
    }

    getBrailleMatrix(brailleCode) {
        const brailleArray = brailleCode.split('').map(Number);
        const matrix = [0, 0, 0, 0, 0, 0];

        brailleArray.forEach((point) => {
            if (point > 0 && point <= 6) {
                matrix[point - 1] = 1;
            }
        });

        return matrix;
    }

    // Método para obtener el carácter Unicode correspondiente al código Braille
    getBrailleUnicode(brailleCode) {
        let braille = "";
        let brailleSign = brailleCode.split(" ");

        for (let brailleSgn of brailleSign) {
            const matrix = this.getBrailleMatrix(brailleSgn);
            if (!matrix) return null;

            // Definir Unicode base para punto Braille
            const baseUnicode = 0x2800;

            // Calcular valor Unicode sumando la posición del punto activo
            let unicodeValue = baseUnicode;
            matrix.forEach((point, index) => {
                if (point === 1) {
                    unicodeValue += Math.pow(2, index);
                }
            });
            braille += String.fromCharCode(unicodeValue) + " ";
        }
        return braille.trim();
    }
}

export default Traductor;