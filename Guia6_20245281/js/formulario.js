
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");

const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

const idModal = document.getElementById("idModal");

let arrayPaciente = [];

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.selectedIndex = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";
    inputNombre.focus();
}

const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
            ? "Mujer"
            : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );

        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        toast.show();


        limpiarForm();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

function ImprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element, index) => { 
        $fila += `<tr>
                <td class="text-center fw-bold">${contador}</td>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>${element[2]}</td>
                <td>${element[3]}</td>
                <td>${element[4]}</td>
                <td>${element[5]}</td>
                <td>
                    <button type="button" class="btn btn-primary" onclick="editarPaciente(${index})">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" class="btn btn-danger" onclick="eliminarPaciente(${index})">
                        <i class="bi bi-trash3-fill"></i>
                    </button>
                </td>
            </tr>`;
        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered">
        <tr>
            <th scope="col" class="text-center" style="width:5%">#</th>
            <th scope="col" class="text-center" style="width:15%">Nombre</th>
            <th scope="col" class="text-center" style="width:15%">Apellido</th>
            <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
            <th scope="col" class="text-center" style="width:10%">Sexo</th>
            <th scope="col" class="text-center" style="width:10%">Pais</th>
            <th scope="col" class="text-center" style="width:25%">Direccion</th>
            <th scope="col" class="text-center" style="width:10%">Opciones</th>
        </tr>
        ${ImprimirFilas()}
    </table>
    </div>`;

    document.getElementById("idTablaPacientes").innerHTML = $table;
};

const addPais = () => {
    let contadorGlobalOption = cmbPais.children.length;
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        cmbPais.appendChild(option);

        mensaje.innerHTML = "Pais agregado correctamente";
        toast.show();
    } else {
        mensaje.innerHTML = "Faltan campos por completar";
        toast.show();
    }
};

buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

limpiarForm();

// --- Funciones para Editar y Eliminar ---

const eliminarPaciente = (index) => {
    arrayPaciente.splice(index, 1); 

    mensaje.innerHTML = "Paciente eliminado correctamente";
    toast.show();

    imprimirPacientes(); 
};

const editarPaciente = (index) => {
    const paciente = arrayPaciente[index];

    mensaje.innerHTML = `Editando a: ${paciente[0]} ${paciente[1]}`;
    toast.show();
};

// --- Expresiones Regulares para Validación ---

const regex = {
    carnet: /^[A-Za-z]{2}\d{3}$/, 
    
    nombre: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/, 
    
    dui: /^\d{8}-\d{1}$/, 
    
    nit: /^\d{4}-\d{6}-\d{3}-\d{1}$/,
    
    fecha: /^\d{2}\/\d{2}\/\d{4}$/, 
    
    correo: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
    
    edad: /^\d+$/
};

// --- Función de Validación de Formulario de Estudiante (Ejemplo) ---

const validarEstudiante = (datos) => {
    let errores = [];

    if (!regex.carnet.test(datos.carnet)) {
        errores.push("Carnet inválido. Formato esperado: AA001.");
    }

    if (!regex.nombre.test(datos.nombre)) {
        errores.push("Nombre inválido. Solo se permiten letras y espacios.");
    }
    
    if (datos.dui && !regex.dui.test(datos.dui)) { 
        errores.push("DUI inválido. Formato esperado: 12345678-9.");
    }
    
    if (datos.nit && !regex.nit.test(datos.nit)) {
        errores.push("NIT inválido. Formato esperado: 1234-567890-123-4.");
    }

    if (!regex.fecha.test(datos.fechaNacimiento)) {
        errores.push("Fecha de nacimiento inválida. Formato esperado: DD/MM/AAAA.");
    }
    
    if (!regex.correo.test(datos.correo)) {
        errores.push("Correo electrónico inválido.");
    }
    
    if (!regex.edad.test(datos.edad)) {
        errores.push("Edad inválida. Solo se permiten números.");
    }

    return errores;
};

// --- Ejemplo de Uso ---

const datosEstudiante = {
    carnet: "JR240",
    nombre: "Juan Perez",
    dui: "08765432-1",
    nit: "0614-150890-101-3",
    fechaNacimiento: "24/08/2000",
    correo: "juan.perez@estudiante.edu",
    edad: "23"
};

const resultados = validarEstudiante(datosEstudiante);

if (resultados.length === 0) {
    console.log("Validación exitosa: Todos los campos son correctos.");
} else {
    console.error("Errores de validación:", resultados);
}