const buttonAgregarPagina = document.querySelector("#idAgregarPagina");
const buttonMenu = document.querySelector("#idAgregarMenu");
const buttonTitulo = document.querySelector("#idAgregarTitulo");
const buttonParrafo = document.querySelector("#idAgregarParrafo");

const pagina = document.querySelector("#idPagina");

buttonAgregarPagina.onclick = function () {
    const contenedorVerificando = document.querySelector("#idDivPage");
    
    if (!contenedorVerificando) {
        //Creando el contenedor de la pagina
        const contenedor = document.createElement("div");
        contenedor.setAttribute("id", "idDivPage");
        contenedor.setAttribute("class", "container");
        contenedor.setAttribute(
            "style",
            "border:solid 1px black; height:500px; overflow: scroll; overflow-x: hidden;"
        );
        
        pagina.appendChild(contenedor);
    } else {
        alert("Ya se agrego el contenedor de la pagina");
    }
};