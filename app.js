// Memoria principal del sistema
let carrito = [];
let totalAcumulado = 0;

function agregarAlCarrito(nombreProducto, precioProducto) {
    // 1. Agregar el producto a la memoria
    carrito.push({ nombre: nombreProducto, precio: precioProducto });
    
    // 2. Sumar el precio al total acumulado
    totalAcumulado = totalAcumulado + precioProducto;

    // 3. Ejecutar la función que dibuja esto en la pantalla
    actualizarPantalla();
}

function actualizarPantalla() {
    // Capturar los elementos HTML donde vamos a escribir
    const listaHTML = document.getElementById('lista-carrito');
    const totalHTML = document.getElementById('total-precio');

    // Limpiar la lista visual antes de volver a dibujarla para que no se duplique
    listaHTML.innerHTML = '';

    // Recorrer nuestra memoria (el arreglo) y crear un <li> por cada sushi
    carrito.forEach(function(producto) {
        const itemLi = document.createElement('li');
        
        // Escribir el nombre y el precio dentro del <li>
        itemLi.innerText = `${producto.nombre} - $${producto.precio}`;
        
        // Inyectar el <li> en el HTML
        listaHTML.appendChild(itemLi);
    });

    // Actualizar el número del precio total en el HTML
    totalHTML.innerText = totalAcumulado;
}
// Función para ocultar la dirección si elige "Retiro"
function toggleDireccion() {
    const metodo = document.getElementById('cliente-metodo').value;
    const inputDireccion = document.getElementById('cliente-direccion');
    
    if (metodo === 'retiro') {
        inputDireccion.style.display = 'none'; // Oculta la casilla
    } else {
        inputDireccion.style.display = 'block'; // Muestra la casilla
    }
}

// Nueva versión de la función de WhatsApp
function enviarAWhatsApp() {
    // 1. Validar que el carrito no esté vacío
    if (carrito.length === 0) {
        alert("¡Tu carrito está vacío! Agrega algunos sushis primero.");
        return;
    }

    // 2. Capturar los datos del cliente
    const nombre = document.getElementById('cliente-nombre').value;
    const metodo = document.getElementById('cliente-metodo').value;
    const direccion = document.getElementById('cliente-direccion').value;

    // 3. Validar que no dejen campos vacíos
    if (nombre.trim() === '') {
        alert("Por favor, ingresa tu nombre para el pedido.");
        return;
    }
    if (metodo === 'delivery' && direccion.trim() === '') {
        alert("Por favor, ingresa tu dirección para el delivery.");
        return;
    }

    const telefono = "56912345678"; 

    // 4. Armar el mensaje incluyendo los datos del cliente
    let mensaje = `🍣 *¡Hola Temaki Sushi! Quiero hacer un pedido:*\n\n`;
    mensaje += `👤 *Cliente:* ${nombre}\n`;
    
    if (metodo === 'delivery') {
        mensaje += `🛵 *Método:* Delivery\n`;
        mensaje += `📍 *Dirección:* ${direccion}\n\n`;
    } else {
        mensaje += `🏪 *Método:* Retiro en Tienda\n\n`;
    }

    mensaje += `📝 *Mi Pedido:*\n`;

    // Recorrer el carrito
    carrito.forEach(function(producto) {
        mensaje += `- ${producto.nombre} ($${producto.precio})\n`;
    });

    mensaje += `\n💰 *Total a pagar: $${totalAcumulado}*`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeCodificado}`;
    
    window.open(urlWhatsApp, '_blank');
}