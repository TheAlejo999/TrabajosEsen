function aviso() {
    alert("¡Hola! Bienvenido al mundo de JavaScript.");
}

function confirmacion() {
    let confirmacion = confirm("¿Deseas salir de la sesión?");
    alert(`Valor Seleccionado ${confirmacion}`);
}

function capturarDatos() {
    let nombre = prompt("Por favor, ingresa tu nombre:");
    let edad = prompt("Por favor, ingresa tu edad:", 0);
    alert(`Su nombre es: ${nombre} y su edad es: ${edad}`);
}

function dibujarParrafos() {
    let parrafo = prompt(
        "Escriba la informacion que desea visualizar en el parrafo"
    );
    const p = document.querySelector("#idParrafo");
    p.innerHTML = parrafo;
}