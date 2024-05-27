// Obtener todas las bolitas
const bolitas = document.querySelectorAll('.bolita');

// Array para almacenar los puntos seleccionados
let puntosSeleccionados = [];

// Función para manejar el clic en una bolita
function toggleSeleccion(event) {
    // Evitar el comportamiento predeterminado del evento clic
    event.preventDefault();
    
    // Obtener el punto de la bolita
    const punto = this.dataset.punto;

    // Alternar la clase 'selected' para pintar o deseleccionar la bolita
    this.classList.toggle('selected');

    // Si el punto ya está en la lista, quitarlo, de lo contrario, agregarlo
    if (puntosSeleccionados.includes(punto)) {
        puntosSeleccionados = puntosSeleccionados.filter(item => item !== punto);
    } else {
        puntosSeleccionados.push(punto);
    }

    // Cambiar el color de la bolita al pintarla o deseleccionarla
    if (this.classList.contains('selected')) {
        this.style.backgroundColor = 'black'; // Pintar la bolita de negro
    } else {
        this.style.backgroundColor = '#ccc'; // Restaurar el color original de la bolita
    }

    // Mostrar los puntos seleccionados en la consola (para verificar)
    console.log('Puntos seleccionados:', puntosSeleccionados);
}

// Agregar un event listener a cada bolita para manejar el clic
bolitas.forEach(bolita => {
    bolita.addEventListener('click', toggleSeleccion);
});

// Event listener para el botón de traducir
document.querySelector('.traducir').addEventListener('click', () => {
    // Aquí puedes utilizar la lista de puntosSeleccionados para realizar la traducción
    // Por ejemplo, puedes enviar la lista a una función de traducción
    // Luego puedes mostrar el resultado en el espacio de traducción
    console.log('Traduciendo...');
});
