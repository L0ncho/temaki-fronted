// --- BASE DE DATOS DEL MENÚ ---
const productosMenu = [
    { id: 1, nombre: "Avocado Roll", descripcion: "Salmón, queso crema, envuelto en palta.", precio: 6500, imagen: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80", categoria: "Rolls" },
    { id: 2, nombre: "Tempura Roll", descripcion: "Camarón, cebollín, queso crema, frito en panko.", precio: 7200, imagen: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=300&q=80", categoria: "Rolls" },
    { id: 3, nombre: "Sashimi Salmón", descripcion: "5 cortes de salmón fresco premium.", precio: 5500, imagen: "images.png", categoria: "Entradas" },
    { id: 4, nombre: "Bebida Lata 350cc", descripcion: "Coca-Cola, Sprite, Fanta.", precio: 1500, imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80", categoria: "Bebidas" }
];

// --- LÓGICA DE FILTROS, MENÚ Y BÚSQUEDA ---
function filtrarMenu(categoriaSeleccionada, botonClickeado) {
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(boton => boton.classList.remove('activo'));
    if (botonClickeado) botonClickeado.classList.add('activo');
    
    // Al filtrar por categoría, limpiamos el buscador de texto
    document.getElementById('buscador-menu').value = '';
    cargarMenu(categoriaSeleccionada);
}

// NUEVO 1: Función de Búsqueda Inteligente
function buscarProducto() {
    const textoBuscado = document.getElementById('buscador-menu').value.toLowerCase();
    const contenedorMenu = document.getElementById('contenedor-productos');
    contenedorMenu.innerHTML = ''; 

    // Quitamos la clase 'activo' de los botones porque estamos buscando globalmente
    document.querySelectorAll('.btn-filtro').forEach(boton => boton.classList.remove('activo'));

    const productosFiltrados = productosMenu.filter(producto => 
        producto.nombre.toLowerCase().includes(textoBuscado) || 
        producto.descripcion.toLowerCase().includes(textoBuscado)
    );

    dibujarTarjetas(productosFiltrados, contenedorMenu);
}

function cargarMenu(categoria = 'Todos') {
    const contenedorMenu = document.getElementById('contenedor-productos');
    contenedorMenu.innerHTML = ''; 

    const productosFiltrados = productosMenu.filter(function(producto) {
        if (categoria === 'Todos') return true; 
        return producto.categoria === categoria; 
    });

    dibujarTarjetas(productosFiltrados, contenedorMenu);
}

// Función auxiliar para no repetir código visual
function dibujarTarjetas(arregloProductos, contenedor) {
    if (arregloProductos.length === 0) {
        contenedor.innerHTML = '<p style="text-align: center; width: 100%; color: #666;">No encontramos resultados para tu búsqueda. 🍣</p>';
        return;
    }
    
    arregloProductos.forEach(function(producto) {
        const tarjetaHTML = `
            <article class="card">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img">
                <div class="card-content">
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <span class="price">$${producto.precio}</span>
                    <button class="btn-add" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
                </div>
            </article>
        `;
        contenedor.innerHTML += tarjetaHTML;
    });
}

// --- ESTADO INICIAL DEL CARRITO ---
let carrito = JSON.parse(localStorage.getItem('carrito-temaki')) || [];
let totalAcumulado = 0;

// --- FUNCIONES DEL MODAL E INTERFAZ ---
function abrirCarrito() {
    document.getElementById('modal-carrito').classList.add('activo');
}

function cerrarCarrito() {
    document.getElementById('modal-carrito').classList.remove('activo');
}

function vaciarCarrito() {
    if (carrito.length === 0) return; 

    Swal.fire({
        title: '¿Vaciar pedido?',
        text: "Se eliminarán todos los productos de tu carrito.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            document.querySelectorAll('.chk-extra').forEach(chk => chk.checked = false);
            actualizarPantalla();
            cerrarCarrito();
            
            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Carrito vacío', showConfirmButton: false, timer: 1500 });
        }
    });
}

function toggleDireccion() {
    const metodo = document.getElementById('cliente-metodo').value;
    const inputDireccion = document.getElementById('cliente-direccion');
    const selectComuna = document.getElementById('cliente-comuna');
    
    if (metodo === 'retiro') {
        inputDireccion.style.display = 'none';
        if (selectComuna) { selectComuna.style.display = 'none'; selectComuna.value = "0"; }
    } else {
        inputDireccion.style.display = 'block';
        if (selectComuna) selectComuna.style.display = 'block';
    }
    actualizarPantalla();
}

// --- LÓGICA DEL CARRITO DE COMPRAS ---
function agregarAlCarrito(nombreProducto, precioProducto) {
    const indice = carrito.findIndex(producto => producto.nombre === nombreProducto);
    if (indice !== -1) {
        carrito[indice].cantidad += 1;
    } else {
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
    }
    actualizarPantalla();
    
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: '¡Agregado al carrito!', showConfirmButton: false, timer: 1000, timerProgressBar: true });
}

function actualizarPantalla() {
    const listaHTML = document.getElementById('lista-carrito');
    const totalHTML = document.getElementById('total-precio');
    const contadorHTML = document.getElementById('contador-carrito');
    const contadorFlotanteHTML = document.getElementById('contador-flotante');

    listaHTML.innerHTML = '';
    totalAcumulado = 0; 
    let totalProductos = 0; 

    carrito.forEach(function(producto, index) {
        if (!producto.cantidad) producto.cantidad = 1; 

        const subtotal = producto.precio * producto.cantidad;
        totalAcumulado += subtotal; 
        totalProductos += producto.cantidad; 

        const itemLi = document.createElement('li');
        itemLi.innerHTML = `
            <span><b>${producto.cantidad}x</b> ${producto.nombre} - $${subtotal}</span>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">🗑️</button>
        `;
        listaHTML.appendChild(itemLi);
    });

    const selectComuna = document.getElementById('cliente-comuna');
    const costoEnvio = selectComuna ? (parseInt(selectComuna.value) || 0) : 0; 
    
    let costoExtras = 0;
    document.querySelectorAll('.chk-extra').forEach(chk => { if (chk.checked) costoExtras += parseInt(chk.value); });

    const totalFinal = totalAcumulado + costoEnvio + costoExtras;

    let desgloseTexto = `${totalAcumulado}`;
    if (costoExtras > 0) desgloseTexto += ` <br><span style="font-size: 0.9rem; color: #666;">+ $${costoExtras} (Extras)</span>`;
    if (costoEnvio > 0) desgloseTexto += ` <br><span style="font-size: 0.9rem; color: #666;">+ $${costoEnvio} (Despacho)</span>`;
    
    if (costoEnvio > 0 || costoExtras > 0) {
        totalHTML.innerHTML = `${desgloseTexto} <br> <strong style="font-size: 1.1rem;">Total: $${totalFinal}</strong>`;
    } else {
        totalHTML.innerText = totalAcumulado;
    }
    
    contadorHTML.innerText = totalProductos;
    if(contadorFlotanteHTML) contadorFlotanteHTML.innerText = totalProductos;
    localStorage.setItem('carrito-temaki', JSON.stringify(carrito));
}

function eliminarDelCarrito(index) {
    if (carrito[index].cantidad > 1) carrito[index].cantidad -= 1;
    else carrito.splice(index, 1);
    actualizarPantalla();
}

// --- CONEXIÓN CON WHATSAPP Y VALIDACIONES FINALES ---
function enviarAWhatsApp() {
    // NUEVO 2: Validar el Horario de Atención (18:30 a 23:00 hrs)
    const formatter = new Intl.DateTimeFormat('es-CL', { timeZone: 'America/Santiago', hour: 'numeric', hour12: false });
    const horaLocal = parseInt(formatter.format(new Date()), 10);
    
    if (horaLocal < 18 || horaLocal >= 23) {
        Swal.fire({
            icon: 'info',
            title: '¡Local Cerrado! 🌙',
            text: 'Nuestro horario de atención es de 18:30 a 23:00 hrs. ¡Te esperamos mañana!',
            confirmButtonColor: '#32cd32'
        });
        return; // Detiene la función, no abre WhatsApp
    }

    if (carrito.length === 0) return Swal.fire({ icon: 'warning', title: '¡Tu carrito está vacío!', text: 'Agrega algunos deliciosos sushis primero.', confirmButtonColor: '#32cd32' });

    const nombre = document.getElementById('cliente-nombre').value;
    const metodo = document.getElementById('cliente-metodo').value;
    const direccion = document.getElementById('cliente-direccion').value;
    const instrucciones = document.getElementById('cliente-instrucciones').value;
    const comuna = document.getElementById('cliente-comuna');
    const costoEnvio = comuna ? (parseInt(comuna.value) || 0) : 0;

    if (nombre.trim() === '') return Swal.fire({ icon: 'error', title: 'Faltan datos', text: 'Por favor, ingresa tu nombre.', confirmButtonColor: '#32cd32' });
    if (metodo === 'delivery' && costoEnvio === 0) return Swal.fire({ icon: 'error', title: 'Faltan datos', text: 'Selecciona tu comuna para calcular el despacho.', confirmButtonColor: '#32cd32' });
    if (metodo === 'delivery' && direccion.trim() === '') return Swal.fire({ icon: 'error', title: 'Faltan datos', text: 'Ingresa tu dirección exacta.', confirmButtonColor: '#32cd32' });

    // NUEVO 3: Generador de Número de Pedido Único
    const idPedido = 'TMK-' + Math.floor(1000 + Math.random() * 9000); 
    const telefono = "56931717552"; 
    
    let mensaje = `🍣 *¡Hola Temaki Sushi! Quiero hacer un pedido:*\n\n`;
    mensaje += `🧾 *Orden:* #${idPedido}\n`;
    mensaje += `👤 *Cliente:* ${nombre}\n`;
    
    if (metodo === 'delivery') {
        const nombreComuna = comuna.options[comuna.selectedIndex].text; 
        mensaje += `🛵 *Método:* Delivery\n📍 *Comuna:* ${nombreComuna}\n📍 *Dirección:* ${direccion}\n\n`;
    } else {
        mensaje += `🏪 *Método:* Retiro en Tienda\n\n`;
    }

    mensaje += `📝 *Mi Pedido:*\n`;
    carrito.forEach(producto => {
        mensaje += `- ${producto.cantidad}x ${producto.nombre} ($${producto.precio * producto.cantidad})\n`;
    });

    let costoExtras = 0;
    let extrasSeleccionados = [];
    document.querySelectorAll('.chk-extra').forEach(chk => {
        if (chk.checked) {
            extrasSeleccionados.push(`${chk.dataset.nombre} (+$${chk.value})`);
            costoExtras += parseInt(chk.value);
        }
    });

    if (extrasSeleccionados.length > 0) {
        mensaje += `\n➕ *Extras agregados:*\n`;
        extrasSeleccionados.forEach(extra => mensaje += `- ${extra}\n`);
    }

    if (instrucciones.trim() !== '') mensaje += `\n💬 *Instrucciones Especiales:* ${instrucciones}\n`;

    const totalFinalReal = totalAcumulado + costoEnvio + costoExtras;
    mensaje += `\n💰 *Total a pagar: $${totalFinalReal}*`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeCodificado}`;
    
    carrito = [];         
    document.querySelectorAll('.chk-extra').forEach(chk => chk.checked = false); 
    actualizarPantalla(); 
    cerrarCarrito();      

    const enlaceFantasma = document.createElement('a');
    enlaceFantasma.href = urlWhatsApp;
    enlaceFantasma.target = '_blank'; 
    document.body.appendChild(enlaceFantasma);
    enlaceFantasma.click(); 
    document.body.removeChild(enlaceFantasma);
}

// --- ARRANQUE ---
window.onload = function() {
    cargarMenu();           
    actualizarPantalla();   
};