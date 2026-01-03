document.addEventListener("DOMContentLoaded", function () {
  // 1. Obtener los datos del LocalStorage, o si no hay datos, crear un nuevo array vacio.
  let baseDatos = JSON.parse(localStorage.getItem("baseDatos")) || [];

  // 2. Selecciono el cuerpo de la tabla <tbody>
  const tbody = document.querySelector("tbody");

  // 3. Limpio contenido previo para evitar errores al repintar.
  tbody.innerHTML = "";

  // 4. Con un bucle for recorro el JSON de la base de datos y voy mostrando las citas en la tabla
  let contador = 0; // Contador para el ID de las citas

  if (baseDatos.length > 0) {
    baseDatos.forEach((cita, index) => {
      contador += 1;

      // Boton Modificar
      let btnModificar = document.createElement("button");
      btnModificar.classList.add("btn-modificar");
      btnModificar.addEventListener("click", () => modificarCita(index));

      // Creo y añado imagen al boton
      const imgBotonMod = document.createElement("img");
      imgBotonMod.src = "media/boton-editar.png";
      imgBotonMod.alt = "Modificar";
      imgBotonMod.classList.add("icon-button");

      btnModificar.append(imgBotonMod);

      // Boton Eliminar
      let btnEliminar = document.createElement("button");
      btnEliminar.classList.add("btn-eliminar");
      btnEliminar.addEventListener("click", () => eliminarCita(index));

      // Creo y añado imagen al boton
      const imgBotonEliminar = document.createElement("img");
      imgBotonEliminar.src = "media/boton-eliminar.png";
      imgBotonEliminar.alt = "Eliminar";
      imgBotonEliminar.classList.add("icon-button");

      btnEliminar.append(imgBotonEliminar);

      // Voy pintando la tabla
      let tr = document.createElement("tr");
      tr.classList.add("fila");
      tr.innerHTML = `<td>${contador}</td><td>${
        cita.cita.split("T")[0] + "<br>" + cita.cita.split("T")[1]
      }</td><td>${cita.nombre}</td><td>${cita.apellidos}</td><td>${
        cita.dni
      }</td><td>${cita.telefono}</td><td>${cita.fechaNacimiento}</td><td>${
        cita.observaciones
      }</td>`;
      tr.appendChild(btnModificar);
      tr.appendChild(btnEliminar);

      tbody.appendChild(tr);
    });
  } else {
    // Mostrar un mensaje si no hay citas
    let tr = document.createElement("tr");
    tr.classList.add("fila-unica");
    tr.innerHTML = "<td colspan='9'>No hay citas programadas</td>";

    tbody.appendChild(tr);
  }
});

function eliminarCita(index) {

  let baseDatos = JSON.parse(localStorage.getItem("baseDatos")) || [];

  // Pido confirmar la eliminación
  if (confirm("¿Estás seguro de que quieres eliminar esta cita?")) {

    baseDatos.splice(index, 1);

    localStorage.setItem("baseDatos", JSON.stringify(baseDatos));

    window.location.reload();
  }
}

function modificarCita(index) {

  sessionStorage.setItem("indiceCitaAEditar", index);

  window.location.href = "crear-cita.html";
}
