const newForm = document.getElementById('idNewForm');
const buttonCrear =document.getElementById('idBtnCrear');
const buttonAddElemento = document.getElementById('idBtnAddElement');
const cmbElemento = document.getElementById('idCmbElemento');
const tituloElemento = document.getElementById('idTituloElemento');
const nombreElemento = document.getElementById('idNombreElemento');

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

//Agregando Funciones
const verificarTipoElemento = function () {
    let elemento = cmbElemento.value;
    if (elemento != "") {
        modal.show();
    } else {
        alert("Debe seleccionar un tipo de elemento");
    }
}

const newSelect = function () {
    let addElemento = document.createElement("select");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("class", "form-select");
        addElemento.setAttribute("name", nombreElemento.value);

    for (let i = 1; i <= 10; i++) {
        let addOption = document.createElement("option");
        addOption.value = i;
        addOption.innerHTML = `Opcion ${i}`;
        addElemento.appendChild(addOption);
    }

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
    let addElemento = document.createElement("input");
    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-check-input");
        addElemento.setAttribute("name", nombreElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("class", "form-check-label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);
    labelElemento.textContent = tituloElemento.value;

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-check");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
    let addElemento =
        newElemento == "textarea"
            ? document.createElement("textarea")
            : document.createElement("input");

    addElemento.setAttribute("id", `id${nombreElemento.value}`);
    addElemento.setAttribute("type", newElemento);
    addElemento.setAttribute("class", "form-control");
        addElemento.setAttribute("name", nombreElemento.value);
    addElemento.setAttribute("placeholder", tituloElemento.value);

    let labelElemento = document.createElement("label");
    labelElemento.setAttribute("for", `id${nombreElemento.value}`);

    let iconLabel = document.createElement("i");
    iconLabel.setAttribute("class", "bi bi-tag");

    labelElemento.textContent = tituloElemento.value;

    labelElemento.insertAdjacentElement("afterbegin", iconLabel);

    let labelId = document.createElement("span");
    labelId.textContent = `ID de control : ${nombreElemento.value}`;

    let divElemento = document.createElement("div");
    divElemento.setAttribute("class", "form-floating mb-3");

    divElemento.appendChild(addElemento);
    divElemento.appendChild(labelElemento);

    newForm.appendChild(labelId);

    newForm.appendChild(divElemento);
};

buttonCrear.onclick = () => {
    verificarTipoElemento();
}

buttonAddElemento.onclick = () => {
    if (nombreElemento.value != "" && tituloElemento.value != "") {
        let elemento = cmbElemento.value;
        const newId = `id${nombreElemento.value}`;
        // Validar que el ID no exista ya en el documento
        if (document.getElementById(newId)) {
            alert(`No es permitido crear un control con el mismo ID: ${nombreElemento.value}`);
            return;
        }

        if (elemento == "select") {
            newSelect();
        } else if (elemento == "radio" || elemento == "checkbox") {
            // asignar name para agrupamiento (opcional)
            newRadioCheckbox(elemento);
        } else {
            newInput(elemento);
        }
    } else {
        alert("Faltan campos por completar");
    }
};

// Validar todos los controles agregados en el formulario dinámico
const buttonValidate = document.getElementById('idBtnValidate');
const validationResult = document.getElementById('idValidationResult');

const validarControlesNuevos = () => {
    validationResult.innerHTML = '';
    const controls = newForm.querySelectorAll('input, select, textarea');
    const invalids = [];

    controls.forEach(ctrl => {
        const type = (ctrl.getAttribute('type') || ctrl.tagName || '').toLowerCase();
        // Skip hidden or buttons
        if (type === 'hidden' || type === 'button' || type === 'submit') return;

        if (ctrl.tagName.toLowerCase() === 'select') {
            // select: asegurarse que tenga una opción seleccionada y valor no vacío
            if (ctrl.selectedIndex === -1 || ctrl.value === '') {
                invalids.push(ctrl.id || ctrl.name || '(select sin id)');
            }
        } else if (type === 'radio' || type === 'checkbox') {
            if (!ctrl.checked) {
                invalids.push(ctrl.id || ctrl.name || `(input ${type} sin id)`);
            }
        } else {
            // text, number, date, password, email, color, textarea
            if ((ctrl.value || '').toString().trim() === '') {
                invalids.push(ctrl.id || ctrl.name || `(input ${type} sin id)`);
            }
        }
    });

    if (invalids.length === 0) {
        validationResult.innerHTML = `<div class="alert alert-success">Todos los controles nuevos están correctamente completados/seleccionados.</div>`;
    } else {
        const list = invalids.map(i => `<li>${i}</li>`).join('');
        validationResult.innerHTML = `<div class="alert alert-danger">Los siguientes controles están incompletos o no seleccionados:<ul>${list}</ul></div>`;
    }
};

if (buttonValidate) buttonValidate.addEventListener('click', validarControlesNuevos);

document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
    tituloElemento.value = "";
    nombreElemento.value = "";
    tituloElemento.focus();
});