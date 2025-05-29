document.getElementById("formulario-compra").addEventListener("submit", function (e) {
  e.preventDefault();

  const tipoDoc = document.getElementById("tipoDoc").value;
  const numDoc = document.getElementById("numDoc").value;
  const nombre = document.getElementById("nombreCliente").value;
  const moneda = document.getElementById("moneda").value;
  const tasa = document.getElementById("tasaCompra").value;
  const cantidad = document.getElementById("cantidad").value;
  const valor = document.getElementById("valorPagar").value;
  const fecha = document.getElementById("fecha").value;
  const hora = document.getElementById("hora").value;

  // Validar que no haya campos vacíos importantes
  if (tipoDoc === "-1" || moneda === "-1" || nombre === "") {
    alert("Complete todos los campos obligatorios.");
    return;
  }

  const tabla = document.getElementById("tablaTransacciones").querySelector("tbody");
  const fila = document.createElement("tr");

  fila.innerHTML = `
    <td>${tipoDoc}</td>
    <td>${numDoc}</td>
    <td>${nombre}</td>
    <td>${moneda}</td>
    <td>${tasa}</td>
    <td>${cantidad}</td>
    <td>${valor}</td>
    <td>${fecha}</td>
    <td>${hora}</td>
  `;

  tabla.appendChild(fila);

  // Reset del formulario si deseas
  this.reset();
  document.getElementById("nombreCliente").value = "";
  document.getElementById("tasaCompra").value = "";
  document.getElementById("valorPagar").value = "";

  mostrarFecha();
  actualizarHora();
});
