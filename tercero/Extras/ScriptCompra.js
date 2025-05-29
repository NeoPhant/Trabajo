// Datos simulados
const clientes = [
    { documento: '123', nombre: 'Juan Pérez', tipo: 'CC' },
    { documento: '456', nombre: 'Ana Gómez', tipo: 'TI' },
    { documento: '789', nombre: 'Luis Díaz', tipo: 'CE' }
  ];
  
  const tiposDocumento = [
    { codigo: 'CC', nombre: 'Cédula de Ciudadanía' },
    { codigo: 'TI', nombre: 'Tarjeta de Identidad' },
    { codigo: 'CE', nombre: 'Cédula de Extranjería' }
  ];
  
  const monedas = [
    { codigo: 'USD', nombre: 'Dólar', compra: 3800, venta: 4210 },
    { codigo: 'EUR', nombre: 'Euro', compra: 4300, venta: 4578 }
  ];
  
  const diasPermitidos = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  function inicializarFormulario() {
    verificarDiaPermitido();
    cargarListas();
    mostrarFecha();
    actualizarHora();
    setInterval(actualizarHora, 1000);
    document.getElementById('numDoc').addEventListener('blur', buscarCliente);
    document.getElementById('moneda').addEventListener('change', cargarTasa);
    document.getElementById('cantidad').addEventListener('input', calcularPago);
  }
  
  function verificarDiaPermitido() {
    const dia = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    if (!diasPermitidos.includes(dia)) {
      alert('No permitida la compra el día de hoy');
      window.close();
    }
  }
  
  function cargarListas() {
    const tipoDoc = document.getElementById('tipoDoc');
    const moneda = document.getElementById('moneda');
  
    tipoDoc.innerHTML = '<option value="-1">Seleccione una Opción</option>';
    moneda.innerHTML = '<option value="-1">Seleccione una Opción</option>';
  
    tiposDocumento.forEach(t => {
      tipoDoc.innerHTML += `<option value="${t.codigo}">${t.nombre}</option>`;
    });
  
    monedas.forEach(m => {
      moneda.innerHTML += `<option value="${m.codigo}">${m.nombre}</option>`;
    });
  }
  
  function mostrarFecha() {
    const hoy = new Date();
    document.getElementById('fecha').value = hoy.toLocaleDateString();
  }
  
  function actualizarHora() {
    const ahora = new Date();
    const hora = ahora.toLocaleTimeString();
    document.getElementById('hora').value = hora;
  }
  
  function buscarCliente() {
    const tipo = document.getElementById('tipoDoc').value;
    const doc = document.getElementById('numDoc').value;
    const cliente = clientes.find(c => c.documento === doc && c.tipo === tipo);
    
    if (cliente) {
      document.getElementById('nombreCliente').value = cliente.nombre;
    } else {
      alert('Cliente Inexistente!');
      document.getElementById('nombreCliente').value = '';
    }
  }
  
  function cargarTasa() {
    const cod = document.getElementById('moneda').value;
    const moneda = monedas.find(m => m.codigo === cod);
    if (moneda) {
      document.getElementById('tasaCompra').value = moneda.compra ?? '';
      calcularPago();
    }
  }
  
  function calcularPago() {
    const tasa = parseFloat(document.getElementById('tasaCompra').value);
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const total = !isNaN(tasa) && !isNaN(cantidad) ? (tasa * cantidad).toFixed(2) : '';
    document.getElementById('valorPagar').value = total;
  }
    // Inicializar el formulario al cargar la página  