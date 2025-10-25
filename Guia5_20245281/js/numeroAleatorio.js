const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
const numeroIntentos = 3;
let intentos = 1;

function generarNumeroAleatorio() {
    let mensaje;
    const parrafo = document.querySelector("#idParrafo");

    if (intentos <= numeroIntentos) {
        let numero = prompt("Que numero se ha generado (Intento " + intentos + ")");

        if (numero == numeroAleatorio) {
            mensaje = "¡Felicidades! Has adivinado el número " + numeroAleatorio + " en " + intentos + " intentos.";
        } else if (intentos === numeroIntentos) {
            mensaje = `Se han agotado tus intentos. El número era ${numeroAleatorio}. Recarga la página para jugar de nuevo.`;
        } else {
            const pista = numero < numeroAleatorio ? "más alto" : "más bajo";
            mensaje = `El número que buscas es ${pista}. Te quedan ${numeroIntentos - intentos} intentos.`;
        }

        intentos++;
    } else {
        mensaje = `Se han agotado tus intentos. El número era ${numeroAleatorio}. Recarga la página para jugar de nuevo.`;
    }

    parrafo.innerHTML = mensaje;
}