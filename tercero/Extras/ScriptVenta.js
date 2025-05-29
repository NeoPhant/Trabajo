// Datos base reutilizados
const clientesVenta = [
  { documento: '123', nombre: 'Juan Pérez', tipo: 'CC' },
  { documento: '456', nombre: 'Ana Gómez', tipo: 'TI' },
  { documento: '789', nombre: 'Luis Díaz', tipo: 'CE' }
];

const tiposDocumentoVenta = [
  { codigo: 'CC', nombre: 'Cédula de Ciudadanía' },
  { codigo: 'TI', nombre: 'Tarjeta de Identidad' },
  { codigo: 'CE', nombre: 'Cédula de Extranjería' }
];

const monedasVenta = [
  { codigo: 'USD', nombre: 'Dólar', compra: null, venta: null },
  { codigo: 'EUR', nombre: 'Euro', compra: null, venta: null }
];

const diasPermitidosVenta = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function inicializarFormularioVenta() {
  verificarDiaPermitidoVenta();
  cargarListasVenta();
  mostrarFechaVenta();
  actualizarHoraVenta();
  setInterval(actualizarHoraVenta, 1000);
  document.getElementById('numDocVenta').addEventListener('blur', buscarClienteVenta);
  document.getElementById('monedaVenta').addEventListener('change', cargarTasaVenta);
  document.getElementById('cantidadVenta').addEventListener('input', calcularPagoVenta);
  document.getElementById('formulario-venta').addEventListener('submit', guardarTransaccionVenta);
}

function verificarDiaPermitidoVenta() {
  const dia = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  if (!diasPermitidosVenta.includes(dia)) {
    alert('No permitida la venta el día de hoy');
    window.close();
  }
}

function cargarListasVenta() {
  const tipoDoc = document.getElementById('tipoDocVenta');
  const moneda = document.getElementById('monedaVenta');

  tipoDoc.innerHTML = '<option value="-1">Seleccione una Opción</option>';
  moneda.innerHTML = '<option value="-1">Seleccione una Opción</option>';

  tiposDocumentoVenta.forEach(t => {
    tipoDoc.innerHTML += `<option value="${t.codigo}">${t.nombre}</option>`;
  });

  monedasVenta.forEach(m => {
    moneda.innerHTML += `<option value="${m.codigo}">${m.nombre}</option>`;
  });
}

function mostrarFechaVenta() {
  const hoy = new Date();
  document.getElementById('fechaVenta').value = hoy.toLocaleDateString();
}

function actualizarHoraVenta() {
  const ahora = new Date();
  const hora = ahora.toLocaleTimeString();
  document.getElementById('horaVenta').value = hora;
}

function buscarClienteVenta() {
  const tipo = document.getElementById('tipoDocVenta').value;
  const doc = document.getElementById('numDocVenta').value;
  const cliente = clientesVenta.find(c => c.documento === doc && c.tipo === tipo);
  
  if (cliente) {
    document.getElementById('nombreClienteVenta').value = cliente.nombre;
  } else {
    alert('Cliente Inexistente!');
    document.getElementById('nombreClienteVenta').value = '';
  }
}

function cargarTasaVenta() {
  const cod = document.getElementById('monedaVenta').value;
  const moneda = monedasVenta.find(m => m.codigo === cod);
  if (moneda) {
    document.getElementById('tasaVenta').value = moneda.venta ?? '';
    calcularPagoVenta();
  }
}

function calcularPagoVenta() {
  const tasa = parseFloat(document.getElementById('tasaVenta').value);
  const cantidad = parseFloat(document.getElementById('cantidadVenta').value);
  const total = !isNaN(tasa) && !isNaN(cantidad) ? (tasa * cantidad).toFixed(2) : '';
  document.getElementById('valorClientePaga').value = total;
}

function guardarTransaccionVenta(e) {
  e.preventDefault();

  const tipoDoc = document.getElementById('tipoDocVenta').value;
  const numDoc = document.getElementById('numDocVenta').value;
  const nombre = document.getElementById('nombreClienteVenta').value;
  const moneda = document.getElementById('monedaVenta').value;
  const tasa = document.getElementById('tasaVenta').value;
  const cantidad = document.getElementById('cantidadVenta').value;
  const valor = document.getElementById('valorClientePaga').value;
  const fecha = document.getElementById('fechaVenta').value;
  const hora = document.getElementById('horaVenta').value;

  if (tipoDoc === "-1" || moneda === "-1" || nombre === "") {
    alert("Complete todos los campos obligatorios.");
    return;
  }

  const tabla = document.getElementById("tablaVentas").querySelector("tbody");
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

  this.reset();
  document.getElementById("nombreClienteVenta").value = "";
  document.getElementById("tasaVenta").value = "";
  document.getElementById("valorClientePaga").value = "";
  mostrarFechaVenta();
  actualizarHoraVenta();
}
