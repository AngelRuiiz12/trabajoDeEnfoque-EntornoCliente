const formulario = document.getElementById("formulario");
const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputDni = document.getElementById("dni");
const inputTelefono = document.getElementById("telefono");
const inputFechaNacimiento = document.getElementById("fechaNacimiento");
const inputFechaHora = document.getElementById("fechaHora");
const botonSubmit = document.getElementById("boton-form");
const tablaCitas = document.getElementsByTagName("tbody");

/* CODIGO PARA DETECTAR SI SE ESTÁ MODIFICANDO UNA CITA */
document.addEventListener("DOMContentLoaded", () => {
  const indice = sessionStorage.getItem("indiceCitaAEditar");

  if (indice !== null) {
    const baseDatos = JSON.parse(localStorage.getItem("baseDatos")) || [];
    const cita = baseDatos[indice];

    if (!cita) return;

    // Rellenar campos
    document.getElementById("fechaHora").value = cita.cita;
    document.getElementById("nombre").value = cita.nombre;
    document.getElementById("apellidos").value = cita.apellidos;
    document.getElementById("dni").value = cita.dni;
    document.getElementById("telefono").value = cita.telefono;
    document.getElementById("fechaNacimiento").value = cita.fechaNacimiento;
    document.getElementById("observaciones").value = cita.observaciones;

    // UX: cambiar texto
    document.getElementById("boton-form").textContent = "Modificar Cita";
  }
});

/*--- Validación Formulario ---*/
// 1º Compruebo que se han rellenado todos los campos obligatorios
inputNombre.addEventListener("blur", campoObligatorio);
inputApellidos.addEventListener("blur", campoObligatorio);
inputDni.addEventListener("blur", campoObligatorio);
inputTelefono.addEventListener("blur", campoObligatorio);
inputFechaNacimiento.addEventListener("blur", campoObligatorio);
inputFechaHora.addEventListener("blur", campoObligatorio);

// 2º Compruebo que el formato de los inputs es correcto
inputNombre.addEventListener("blur", validarNombreApellidos);
inputApellidos.addEventListener("blur", validarNombreApellidos);
inputDni.addEventListener("blur", validarDni);
inputTelefono.addEventListener("blur", validarTelefono);


formulario.addEventListener("submit", function (e) {
  e.preventDefault();
  mensajeError(botonSubmit.id, "");

  // 3º Ultima validación al pulsar el boton de Submit
  for (campo of document.querySelectorAll("small")) {
    if (campo.innerText != "") {
      e.preventDefault();

      mensajeError(
        botonSubmit.id,
        "Validación fallida. Rellene correctamente todos los datos."
      );
    }
  }

  // Creo el objeto de la nueva cita
  const nuevaCita = {
    cita: document.getElementById("fechaHora").value,
    nombre: document.getElementById("nombre").value,
    apellidos: document.getElementById("apellidos").value,
    dni: document.getElementById("dni").value,
    telefono: document.getElementById("telefono").value,
    fechaNacimiento: document.getElementById("fechaNacimiento").value,
    observaciones: document.getElementById("observaciones").value,
  };

  const indice = sessionStorage.getItem("indiceCitaAEditar");

  let baseDatos = JSON.parse(localStorage.getItem("baseDatos")) || [];

  if (indice !== null) {
    baseDatos[indice] = nuevaCita;
    sessionStorage.removeItem("indiceCitaAEditar");
  } else {
    baseDatos.push(nuevaCita);
  }

  localStorage.setItem("baseDatos", JSON.stringify(baseDatos));

  window.location.href = "ver-citas.html";
});

/*--- FUNCIONES DE VALIDACIÓN ---*/
// Función para validar campo obligatorio
function campoObligatorio(e) {
  if (e.target.value.trim().length === 0) {
    mensajeError(e.target.id, "* Campo Obligatorio");
  } else {
    mensajeError(e.target.id, "");
  }
}

// Función para validar el nombre y apellidos
function validarNombreApellidos(e) {
  const regexTexto = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/;

  if (
    e.target.value.trim().length > 0 &&
    regexTexto.test(e.target.value.trim()) != true
  ) {
    mensajeError(e.target.id, "* Campo incorrecto");
  }
}

// Función para validar el DNI
function validarDni(e) {
  const regexDni = /^\d{8}[a-zA-Z]$/;

  if (
    e.target.value.trim().length > 0 &&
    regexDni.test(e.target.value.trim()) != true
  ) {
    mensajeError(e.target.id, "* DNI/NIE incorrecto");
  }
}

// Función para validar el telefono
function validarTelefono(e) {
  const regexTelefono = /^\d{9}$/;

  if (
    e.target.value.trim().length > 0 &&
    regexTelefono.test(e.target.value.trim()) != true
  ) {
    mensajeError(e.target.id, "* Número de teléfono incorrecto");
  }
}

// Función para enseñar mensaje error en la etiqueta <small>
function mensajeError(id, mensaje) {
  document.getElementById(`error-${id}`).innerText = mensaje;
}

/*--- FUNCIONES BOTONES DE NAVEGACIÓN PAGINA PRINCIPAL ---*/
function redirigirNuevaCita() {
  window.location.href = "crear-cita.html";
}

function redirigirVerCitas() {
  window.location.href = "ver-citas.html";
}
