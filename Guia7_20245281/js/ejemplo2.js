const buttonAgregarPagina = document.querySelector("#idAgregarPagina");
const buttonMenu = document.querySelector("#idAgregarMenu");
const buttonTitulo = document.querySelector("#idAgregarTitulo");
const buttonParrafo = document.querySelector("#idAgregarParrafo");

const pagina = document.querySelector("#idPagina");

buttonAgregarPagina.onclick = function () {
    const contenedorVerificando = document.querySelector("#idDivPage");

    if (!contenedorVerificando) {
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

buttonMenu.onclick = function () {
    const contenedor = document.querySelector("#idDivPage");

    if (contenedor) {
        const menuVerificar = document.querySelectorAll("#idDivPage > header");

        if (menuVerificar.length == 0) {
            const menu = document.querySelector("header").cloneNode(true);
            contenedor.appendChild(menu);
        } else {
            alert("Ya ha sido agregado el menu");
        }
    } else {
        alert("Primero agregar un contendor de pagina");
    }
};

buttonTitulo.onclick = function () {
    const contenedor = document.querySelector("#idDivPage");

    const menu = document.querySelectorAll("#idDivPage > header");

    if (contenedor) {
        if (menu.length > 0) {
            let titulo = prompt("Agregue el titulo de la pagina");
            if (titulo != "" && titulo != null) {
                const h1 = document.createElement("h1");
                h1.setAttribute("class", "display-5 text-center fw-bold py-4 my-4");
                h1.innerHTML = titulo;
                contenedor.appendChild(h1);
            } else {
                alert(
                    "No se ha registrado ningun titulo, por favor ingrese informacion"
                );
            }
        } else {
            alert("Debe agregar un menu primero");
        }
    } else {
        alert("Primero debe agregar un contendor de pagina");
    }
};

// --- Validacion del formulario en ejemplo2.html y mostrar en modal ---
const btnEnviar = document.querySelector('button[name="btnRegistro"]');
const modalEl = document.getElementById('idModal');
const modalBody = document.getElementById('idBodyModal');
const bsModal = modalEl ? new bootstrap.Modal(modalEl, {}) : null;

if (btnEnviar) {
    btnEnviar.addEventListener('click', function () {
        const form = document.forms['frmRegistro'];
        const nombre = document.getElementById('idNombre').value.trim();
        const apellidos = document.getElementById('idApellidos').value.trim();
        const fechaNac = document.getElementById('idFechaNac').value;
        const correo = document.getElementById('idCorreo').value.trim();
        const password = document.getElementById('idPassword').value;
        const passwordRep = document.getElementById('idPasswordRepetir').value;
        const paisSelect = document.getElementById('idCmPais');
        const paisIndex = paisSelect ? paisSelect.selectedIndex : -1;
        const archivo = document.getElementById('idArchivo');

        const errores = [];

        if (!nombre) errores.push('Nombres no debe estar vacío');
        if (!apellidos) errores.push('Apellidos no debe estar vacío');
        if (!fechaNac) errores.push('Fecha de nacimiento no debe estar vacía');
        if (!correo) errores.push('Correo electrónico no debe estar vacío');
        if (!password) errores.push('Contraseña no debe estar vacía');
        if (!passwordRep) errores.push('Repetir contraseña no debe estar vacío');

        if (fechaNac) {
            const fechaIngresada = new Date(fechaNac);
            const hoy = new Date();
            // eliminar hora para comparación
            fechaIngresada.setHours(0,0,0,0);
            hoy.setHours(0,0,0,0);
            if (fechaIngresada > hoy) errores.push('Fecha de nacimiento no puede ser mayor a la fecha actual');
        }

        if (correo) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(correo)) errores.push('Correo electrónico no tiene un formato válido');
        }

        if (password && passwordRep && password !== passwordRep) errores.push('Las contraseñas no coinciden');

        const interesesCheckbox = Array.from(document.querySelectorAll('input[type="checkbox"]'));
        const interesesSeleccionados = interesesCheckbox.filter(cb => cb.checked).map(cb => {
            const lab = document.querySelector(`label[for="${cb.id}"]`);
            return lab ? lab.textContent.trim() : (cb.id || 'interes');
        });
        if (interesesSeleccionados.length === 0) errores.push('Debe seleccionar al menos un interés');

        const carreraSeleccionada = document.querySelector('input[name="idRdCarrera"]:checked');
        let carreraTexto = '';
        if (!carreraSeleccionada) {
            errores.push('Debe seleccionar una carrera');
        } else {
            const lab = document.querySelector(`label[for="${carreraSeleccionada.id}"]`);
            carreraTexto = lab ? lab.textContent.trim() : carreraSeleccionada.id;
        }

        let paisTexto = '';
        if (!paisSelect || paisIndex <= 0) {
            errores.push('Debe seleccionar un país de origen');
        } else {
            paisTexto = paisSelect.options[paisIndex].text;
        }

        if (errores.length > 0) {
            alert('Se encontraron los siguientes errores:\n- ' + errores.join('\n- '));
            return;
        }

        if (!modalBody) {
            alert('Modal no disponible para mostrar la información');
            return;
        }

        while (modalBody.firstChild) modalBody.removeChild(modalBody.firstChild);

        const table = document.createElement('table');
        table.className = 'table table-bordered';
        const tbody = document.createElement('tbody');

        const addRow = (label, value) => {
            const tr = document.createElement('tr');
            const tdLabel = document.createElement('th');
            tdLabel.setAttribute('scope', 'row');
            tdLabel.style.width = '40%';
            tdLabel.textContent = label;
            const tdValue = document.createElement('td');
            tdValue.textContent = value;
            tr.appendChild(tdLabel);
            tr.appendChild(tdValue);
            tbody.appendChild(tr);
        };

        addRow('Nombres', nombre);
        addRow('Apellidos', apellidos);
        addRow('Fecha de nacimiento', fechaNac);
        addRow('Correo', correo);
        addRow('Carrera', carreraTexto);
        addRow('País de origen', paisTexto);
        addRow('Intereses', interesesSeleccionados.join(', '));
        const archivoNombre = (archivo && archivo.files && archivo.files.length>0) ? archivo.files[0].name : 'No seleccionado';
        addRow('Avatar (archivo)', archivoNombre);

        table.appendChild(tbody);
        modalBody.appendChild(table);

        if (bsModal) bsModal.show();
    });
}