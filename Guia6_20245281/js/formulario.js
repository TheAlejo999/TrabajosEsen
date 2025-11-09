//Accediendo a los elementos html
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
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
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
        //Agregando informacion al arreglo paciente
        arrayPaciente.push(
            new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
        );

        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        //Llamando al componente de Bootstrap
        toast.show();

        //Limpiando formulario
        limpiarForm();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

function ImprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element, index) => { // Agregamos 'index' al forEach
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
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Pais agregado correctamente";
        //Llamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
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

// Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();

// --- Funciones para Editar y Eliminar ---

const eliminarPaciente = (index) => {
    // Elimina 1 elemento del arrayPaciente en la posición 'index'
    arrayPaciente.splice(index, 1); 

    // Muestra una notificación de éxito
    mensaje.innerHTML = "Paciente eliminado correctamente";
    toast.show();

    // Vuelve a imprimir la tabla con los datos actualizados
    imprimirPacientes(); 
};

const editarPaciente = (index) => {
    // Por simplicidad, esta función solo mostrará un mensaje
    // En una aplicación real, aquí cargarías los datos del paciente en el formulario para editar
    
    // Obtener los datos del paciente a editar
    const paciente = arrayPaciente[index];

    // Mostrar una notificación de qué paciente se está editando
    mensaje.innerHTML = `Editando a: ${paciente[0]} ${paciente[1]}`;
    toast.show();
    
    // Aquí iría la lógica para cargar los datos en el formulario...
    // inputNombre.value = paciente[0];
    // ...
};