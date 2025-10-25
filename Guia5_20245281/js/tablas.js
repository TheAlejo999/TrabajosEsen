let table = "<table>";
table += "<thead>";
table += "<tr>";
table += "<th scope='col'>#</th>";
table += "<th scope='col'>Nombre</th>";
table += "<th scope='col'>Apellido</th>";
table += "<th scope='col'>Correo Electrónico</th>";
table += "</tr>";
table += "</thead>";
table += "<tbody>";

const alumnos = [
    { id: 1, nombre: "Marcos Antonio", apellido: "Alas", correo: "marcos.alas@estudiante.edu.sv" },
    { id: 2, nombre: "Ana Paola", apellido: "Rivas Polanco", correo: "ana.rivas@estudiante.edu.sv" },
    { id: 3, nombre: "Juan", apellido: "Pérez", correo: "juan.perez@estudiante.edu.sv" },
    { id: 4, nombre: "Ana", apellido: "Martínez", correo: "ana.martinez@estudiante.edu.sv" },
    { id: 5, nombre: "Luis", apellido: "Hernández", correo: "luis.hernandez@estudiante.edu.sv" }
];

alumnos.forEach(alumno => {
    table += "<tr>";
    table += `<th scope='row'>${alumno.id}</th>`;
    table += `<td>${alumno.nombre}</td>`;
    table += `<td>${alumno.apellido}</td>`;
    table += `<td>${alumno.correo}</td>`;
    table += "</tr>";
});

table += "</tbody>";
table += "</table>";

const contenedor = document.querySelector("#idContenedor");
contenedor.innerHTML = table;