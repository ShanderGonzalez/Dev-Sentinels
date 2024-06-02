import Validator from "./validate.js";
import Traductor from "./traductor.js";


const validador = new Validator();
const traductor = new Traductor();
const textoEspanol = "Hola que tal, me llamo Shander y nací en Ecuador en el año 2002.\nSoy un estudiante de la carrera de Ingeniería en Software en la Universidad de la EPN. Me gusta mucho la programación y la tecnología.";
if (validador.esEspanol(textoEspanol)) {
    const textoBraille = traductor.traducirEspanolABraille(textoEspanol);
    console.log("Texto en español:");
    console.log(textoEspanol);
    console.log("Texto en braille:");

    const textoBrailleFormateado = textoBraille
        .split(" ")
        .map((braille) => {

            return braille + " ";
        })
        .join("");

    console.log(textoBrailleFormateado);
    const brailleUnicode = traductor.getBrailleUnicode(textoBrailleFormateado);
    console.log("Braille:");
    console.log(brailleUnicode);
} else {
    console.log("El texto no está en español");
}


const numero = "46 125 135 123 1  12345 136 15  2345 1 123 2  134 15  123 123 1 134 135  46 234 125 1 1345 145 15 1235  13456  1345 1 14 34  15 1345  46 15 14 136 1 145 135 1235  15 1345  15 123  1 12456 135  3456 12 1456 1456 12 3";
console.log(traductor.traducirBrailleAEspanol(numero));
