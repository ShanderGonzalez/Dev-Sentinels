// static/js/scripts.js
document.getElementById('translateForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputText = document.getElementById('inputText').value;

    fetch('/traducir/espanol_a_braille', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ texto: inputText })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('outputBraille').textContent = data.error;
            } else {
                document.getElementById('outputBraille').textContent = data.texto_braille;
            }
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('translateBrailleForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputBraille = document.getElementById('inputBraille').value;

    fetch('/traducir/braille_a_espanol', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ texto: inputBraille })
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('outputEspanol').textContent = data.error;
            } else {
                document.getElementById('outputEspanol').textContent = data.texto_esp;
            }
        })
        .catch(error => console.error('Error:', error));
});
