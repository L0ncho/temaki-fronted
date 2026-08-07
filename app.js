// --- BASE DE DATOS DEL MENÚ ---
const productosMenu = [
    {
        id: 1,
        nombre: "Avocado Roll",
        descripcion: "Salmón, queso crema, envuelto en palta.",
        precio: 6500,
        imagen: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80",
        categoria: "Rolls" 
    },
    {
        id: 2,
        nombre: "Tempura Roll",
        descripcion: "Camarón, cebollín, queso crema, frito en panko.",
        precio: 7200,
        imagen: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=300&q=80",
        categoria: "Rolls" 
    },
    {
        id: 3,
        nombre: "Sashimi Salmón",
        descripcion: "5 cortes de salmón fresco premium.",
        precio: 5500,
        imagen: "sashimi.jpg",
        categoria: "Entradas" 
    },
    {
        id: 4,
        nombre: "Bebida Lata 350cc",
        descripcion: "Coca-Cola, Sprite, Fanta.",
        precio: 1500,
        imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80",
        categoria: "Bebidas"
    },
    {
        id: 5, 
        nombre: "Extra Palta",
        descripcion: "Porción adicional de palta fresca.",
        precio: 1000,
        imagen: "https://images.unsplash.com/photo-1517672651691-12520331828f?auto=format&fit=crop&w=300&q=80",
        categoria: "Agregados"
    },
    {
        id: 6,
        nombre: "Extra Soya",
        descripcion: "Sachet adicional de salsa de soya tradicional.",
        precio: 300,
        imagen: "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=300&q=80",
        categoria: "Agregados"
    },
    {
        id: 7,
        nombre: "Salsa Teriyaki",
        descripcion: "Salsa dulce a base de soya, ideal para rolls fritos.",
        precio: 500,
        imagen: "https://images.unsplash.com/photo-1632778148790-2580ce4206ce?auto=format&fit=crop&w=300&q=80",
        categoria: "Agregados"
    }
];
// ------------------------------

// --- LÓGICA DE FILTROS Y MENÚ ---
function filtrarMenu(categoriaSeleccionada, botonClickeado) {
    // 1. Quitar la clase 'activo' de todos los botones
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(boton => boton.classList.remove('activo'));

    // 2. Agregar la clase 'activo' solo al botón que se hizo clic
    if (botonClickeado) {
        botonClickeado.classList.add('activo');
    }

    // 3. Mandar a cargar el menú con la categoría elegida
    cargarMenu(categoriaSeleccionada);
}

function cargarMenu(categoria = 'Todos') {
    const contenedorMenu = document.getElementById('contenedor-productos');
    contenedorMenu.innerHTML = ''; // Limpiamos por si acaso

    // Filtramos la base de datos antes de dibujarla
    const productosFiltrados = productosMenu.filter(function(producto) {
        if (categoria === 'Todos') {
            return true; // Si es 'Todos', mostramos todos
        } else {
            return producto.categoria === categoria; // Solo mostramos los que coinciden
        }
    });

    // Ahora dibujamos SOLO los productos que pasaron el filtro
    productosFiltrados.forEach(function(producto) {
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
        
        contenedorMenu.innerHTML += tarjetaHTML;
    });
}

// --- ESTADO INICIAL DEL CARRITO ---
// Intentamos leer la memoria del navegador. Si no hay nada, iniciamos un arreglo vacío.
let carrito = JSON.parse(localStorage.getItem('carrito-temaki')) || [];
let totalAcumulado = 0;

// --- FUNCIONES DEL MODAL E INTERFAZ ---
function abrirCarrito() {
    document.getElementById('modal-carrito').style.display = 'flex';
}

function cerrarCarrito() {
    document.getElementById('modal-carrito').style.display = 'none';
}

function toggleDireccion() {
    const metodo = document.getElementById('cliente-metodo').value;
    const inputDireccion = document.getElementById('cliente-direccion');
    const selectComuna = document.getElementById('cliente-comuna');
    
    if (metodo === 'retiro') {
        inputDireccion.style.display = 'none';
        
        // Verificamos que el select exista en el HTML antes de modificarlo
        if (selectComuna) {
            selectComuna.style.display = 'none';
            selectComuna.value = "0"; // Resetea el cobro a cero
        }
    } else {
        inputDireccion.style.display = 'block';
        if (selectComuna) selectComuna.style.display = 'block';
    }
    
    // Forzamos un recalculo matemático de la pantalla
    actualizarPantalla();
}

// --- LÓGICA DEL CARRITO DE COMPRAS ---
function agregarAlCarrito(nombreProducto, precioProducto) {
    // Buscamos si el producto ya existe en el arreglo
    const indice = carrito.findIndex(producto => producto.nombre === nombreProducto);

    if (indice !== -1) {
        // Si ya existe, le sumamos 1 a la cantidad
        carrito[indice].cantidad += 1;
    } else {
        // Si no existe, lo agregamos con cantidad 1
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
    }

    actualizarPantalla();
    
    // Pequeña notificación emergente (Toast)
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: '¡Agregado al carrito!',
        showConfirmButton: false,
        timer: 1000, 
        timerProgressBar: true
    });
}

function actualizarPantalla() {
    const listaHTML = document.getElementById('lista-carrito');
    const totalHTML = document.getElementById('total-precio');
    const contadorHTML = document.getElementById('contador-carrito');

    listaHTML.innerHTML = '';
    totalAcumulado = 0; // Recalculamos desde 0
    let totalProductos = 0; // Para el contador rojo

    carrito.forEach(function(producto, index) {
        // Validación de seguridad para pedidos antiguos sin cantidad
        if (!producto.cantidad) producto.cantidad = 1; 

        // Calculamos el subtotal (precio * cantidad)
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

    // Sumar el costo de envío leyendo el HTML
    const selectComuna = document.getElementById('cliente-comuna');
    // Si el select existe, tomamos su valor, si no, es 0
    const costoEnvio = selectComuna ? (parseInt(selectComuna.value) || 0) : 0; 
    const totalFinal = totalAcumulado + costoEnvio;

    // Mostrar el desglose en el carrito
    if (costoEnvio > 0) {
        totalHTML.innerHTML = `${totalAcumulado} <br><span style="font-size: 0.9rem; color: #666;">+ $${costoEnvio} (Despacho)</span> <br> Total: $${totalFinal}`;
    } else {
        totalHTML.innerText = totalAcumulado;
    }
    
    contadorHTML.innerText = totalProductos;
    // Guardar el carrito actualizado en la memoria del navegador
    localStorage.setItem('carrito-temaki', JSON.stringify(carrito));
}

function eliminarDelCarrito(index) {
    if (carrito[index].cantidad > 1) {
        // Si hay más de uno, solo restamos 1 a la cantidad
        carrito[index].cantidad -= 1;
    } else {
        // Si solo queda 1, eliminamos la línea completa del carrito
        carrito.splice(index, 1);
    }
    actualizarPantalla();
}

// --- CONEXIÓN CON WHATSAPP ---
function enviarAWhatsApp() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: '¡Tu carrito está vacío!',
            text: 'Agrega algunos deliciosos sushis primero.',
            confirmButtonColor: '#32cd32'
        });
        return;
    }

    const nombre = document.getElementById('cliente-nombre').value;
    const metodo = document.getElementById('cliente-metodo').value;
    const direccion = document.getElementById('cliente-direccion').value;
    const instrucciones = document.getElementById('cliente-instrucciones').value;
    
    const comuna = document.getElementById('cliente-comuna');
    const costoEnvio = comuna ? (parseInt(comuna.value) || 0) : 0;
    const totalFinal = totalAcumulado + costoEnvio;

    if (nombre.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Por favor, ingresa tu nombre para el pedido.',
            confirmButtonColor: '#32cd32'
        });
        return;
    }
    
    if (metodo === 'delivery' && costoEnvio === 0) {
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Por favor, selecciona tu comuna para calcular el despacho.',
            confirmButtonColor: '#32cd32'
        });
        return;
    }

    if (metodo === 'delivery' && direccion.trim() === '') {
        Swal.fire({
            icon: 'error',
            title: 'Faltan datos',
            text: 'Por favor, ingresa tu dirección exacta para el delivery.',
            confirmButtonColor: '#32cd32'
        });
        return;
    }

    const telefono = "56931717552"; 

    let mensaje = `🍣 *¡Hola Temaki Sushi! Quiero hacer un pedido:*\n\n`;
    mensaje += `👤 *Cliente:* ${nombre}\n`;
    
    if (metodo === 'delivery') {
        const nombreComuna = comuna.options[comuna.selectedIndex].text; 
        mensaje += `🛵 *Método:* Delivery\n`;
        mensaje += `📍 *Comuna:* ${nombreComuna}\n`;
        mensaje += `📍 *Dirección:* ${direccion}\n\n`;
    } else {
        mensaje += `🏪 *Método:* Retiro en Tienda\n\n`;
    }

    mensaje += `📝 *Mi Pedido:*\n`;

    carrito.forEach(function(producto) {
        const subtotal = producto.precio * producto.cantidad;
        mensaje += `- ${producto.cantidad}x ${producto.nombre} ($${subtotal})\n`;
    });

    if (instrucciones.trim() !== '') {
        mensaje += `\n💬 *Instrucciones Especiales:* ${instrucciones}\n`;
    }

    mensaje += `\n💰 *Total a pagar: $${totalFinal}*`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeCodificado}`;
    
    window.open(urlWhatsApp, '_blank');
}

// --- ARRANQUE DE LA APLICACIÓN ---
// Le decimos al navegador qué hacer exactamente al cargar la página
window.onload = function() {
    cargarMenu();           // Dibuja las tarjetas de los sushis
    actualizarPantalla();   // Dibuja el carrito por si recuperó productos de la memoria
};