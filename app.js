let carrito = [];
let totalAcumulado = 0;

// 1. Funciones para Abrir y Cerrar el Modal
function abrirCarrito() {
    document.getElementById('modal-carrito').style.display = 'flex';
}

function cerrarCarrito() {
    document.getElementById('modal-carrito').style.display = 'none';
}

function agregarAlCarrito(nombreProducto, precioProducto) {
    carrito.push({ nombre: nombreProducto, precio: precioProducto });
    totalAcumulado = totalAcumulado + precioProducto;
    actualizarPantalla();
}

// 2. Modificamos la actualización para sumar el contador del botón
function actualizarPantalla() {
    const listaHTML = document.getElementById('lista-carrito');
    const totalHTML = document.getElementById('total-precio');
    const contadorHTML = document.getElementById('contador-carrito');

    listaHTML.innerHTML = '';

    // Agregamos 'index' para saber exactamente en qué posición está cada sushi
    carrito.forEach(function(producto, index) {
        const itemLi = document.createElement('li');
        
        // Inyectamos el texto y el botón de eliminar, pasándole el index (0, 1, 2, etc.)
        itemLi.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">🗑️</button>
        `;
        
        listaHTML.appendChild(itemLi);
    });

    totalHTML.innerText = totalAcumulado;
    contadorHTML.innerText = carrito.length; 
}

function toggleDireccion() {
    const metodo = document.getElementById('cliente-metodo').value;
    const inputDireccion = document.getElementById('cliente-direccion');
    
    if (metodo === 'retiro') {
        inputDireccion.style.display = 'none';
    } else {
        inputDireccion.style.display = 'block';
    }
}

// 3. Modificamos WhatsApp para agregar las Instrucciones
function enviarAWhatsApp() {
    if (carrito.length === 0) {
        alert("¡Tu carrito está vacío! Agrega algunos sushis primero.");
        return;
    }

    const nombre = document.getElementById('cliente-nombre').value;
    const metodo = document.getElementById('cliente-metodo').value;
    const direccion = document.getElementById('cliente-direccion').value;
    const instrucciones = document.getElementById('cliente-instrucciones').value; // Capturamos las instrucciones

    if (nombre.trim() === '') {
        alert("Por favor, ingresa tu nombre para el pedido.");
        return;
    }
    if (metodo === 'delivery' && direccion.trim() === '') {
        alert("Por favor, ingresa tu dirección para el delivery.");
        return;
    }

    const telefono = "56931717552"; 

    let mensaje = `🍣 *¡Hola Temaki Sushi! Quiero hacer un pedido:*\n\n`;
    mensaje += ` *Cliente:* ${nombre}\n`;
    
    if (metodo === 'delivery') {
        mensaje += ` *Método:* Delivery\n`;
        mensaje += ` *Dirección:* ${direccion}\n\n`;
    } else {
        mensaje += ` *Método:* Retiro en Tienda\n\n`;
    }

    mensaje += ` *Mi Pedido:*\n`;

    carrito.forEach(function(producto) {
        mensaje += `- ${producto.nombre} ($${producto.precio})\n`;
    });

    // Agregamos las instrucciones al texto si el cliente escribió algo
    if (instrucciones.trim() !== '') {
        mensaje += `\n *Instrucciones Especiales:* ${instrucciones}\n`;
    }

    mensaje += `\n *Total a pagar: $${totalAcumulado}*`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeCodificado}`;
    
    window.open(urlWhatsApp, '_blank');
}
// Función para eliminar un producto específico
function eliminarDelCarrito(index) {
    // 1. Restamos el precio del producto eliminado de nuestro total
    totalAcumulado = totalAcumulado - carrito[index].precio;
    
    // 2. Eliminamos el elemento del arreglo usando splice(posición, cantidad de elementos a borrar)
    carrito.splice(index, 1);
    
    // 3. Volvemos a dibujar el carrito en pantalla (ahora sin ese producto)
    actualizarPantalla();
}