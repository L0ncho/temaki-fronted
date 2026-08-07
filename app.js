// --- BASE DE DATOS DEL MENÚ ---
const productosMenu = [
    {
        id: 1,
        nombre: "Avocado Roll",
        descripcion: "Salmón, queso crema, envuelto en palta.",
        precio: 6500,
        imagen: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: 2,
        nombre: "Tempura Roll",
        descripcion: "Camarón, cebollín, queso crema, frito en panko.",
        precio: 7200,
        imagen: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=300&q=80"
    },
  
    {
        id: 3,
        nombre: "Sashimi Salmón",
        descripcion: "5 cortes de salmón fresco premium.",
        precio: 5500,
        imagen: "images.png"
    }
];
// ------------------------------
// Función para dibujar el menú automáticamente
function cargarMenu() {
    const contenedorMenu = document.getElementById('contenedor-productos');
    contenedorMenu.innerHTML = ''; // Limpiamos por si acaso

    productosMenu.forEach(function(producto) {
        // Creamos la tarjeta HTML inyectando las variables de nuestra base de datos
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
        
        // La agregamos al contenedor
        contenedorMenu.innerHTML += tarjetaHTML;
    });
}


// 1. Intentamos leer la memoria del navegador. Si no hay nada, iniciamos un arreglo vacío.
let carrito = JSON.parse(localStorage.getItem('carrito-temaki')) || [];
let totalAcumulado = 0;

// 2. Si recuperamos un pedido guardado, recalculamos el total de dinero
carrito.forEach(function(producto) {
    totalAcumulado = totalAcumulado + producto.precio;
});

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
    // Guardar el carrito actualizado en la memoria del navegador
    localStorage.setItem('carrito-temaki', JSON.stringify(carrito));
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
// 3. Modificamos WhatsApp para agregar las Alertas Modernas
function enviarAWhatsApp() {
    if (carrito.length === 0) {
        // Alerta moderna: Carrito vacío
        Swal.fire({
            icon: 'warning',
            title: '¡Tu carrito está vacío!',
            text: 'Agrega algunos deliciosos sushis primero.',
            confirmButtonColor: '#32cd32' // Color verde de Temaki
        });
        return;
    }

    const nombre = document.getElementById('cliente-nombre').value;
    const metodo = document.getElementById('cliente-metodo').value;
    const direccion = document.getElementById('cliente-direccion').value;
    const instrucciones = document.getElementById('cliente-instrucciones').value;

    if (nombre.trim() === '') {
        // Alerta moderna: Falta nombre
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Por favor, ingresa tu nombre para el pedido.',
            confirmButtonColor: '#32cd32'
        });
        return;
    }
    
    if (metodo === 'delivery' && direccion.trim() === '') {
        // Alerta moderna: Falta dirección
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Por favor, ingresa tu dirección para el delivery.',
            confirmButtonColor: '#32cd32'
        });
        return;
    }

    const telefono = "56931717552"; 

    let mensaje = `🍣 *¡Hola Temaki Sushi! Quiero hacer un pedido:*\n\n`;
    mensaje += `👤 *Cliente:* ${nombre}\n`;
    
    if (metodo === 'delivery') {
        mensaje += `🛵 *Método:* Delivery\n`;
        mensaje += `📍 *Dirección:* ${direccion}\n\n`;
    } else {
        mensaje += `🏪 *Método:* Retiro en Tienda\n\n`;
    }

    mensaje += `📝 *Mi Pedido:*\n`;

    carrito.forEach(function(producto) {
        mensaje += `- ${producto.nombre} ($${producto.precio})\n`;
    });

    if (instrucciones.trim() !== '') {
        mensaje += `\n💬 *Instrucciones Especiales:* ${instrucciones}\n`;
    }

    mensaje += `\n💰 *Total a pagar: $${totalAcumulado}*`;

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
// Le decimos al navegador qué hacer exactamente al cargar la página
window.onload = function() {
    cargarMenu();           // Dibuja las tarjetas de los sushis
    actualizarPantalla();   // Dibuja el carrito por si recuperó productos de la memoria
};