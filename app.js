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
        imagen: "images.png",
        categoria: "Entradas"
    },
    {
        id: 4,
        nombre: "Bebida Lata 350cc",
        descripcion: "Coca-Cola, Sprite, Fanta.",
        precio: 1500,
        imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80",
        categoria: "Bebidas"
    }
];
// ------------------------------
// Nueva función de filtrado
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
// Función para dibujar el menú automáticamente
function cargarMenu(categoria = 'Todos') {
    const contenedorMenu = document.getElementById('contenedor-productos');
    contenedorMenu.innerHTML = ''; // Limpiamos por si acaso

    // NUEVO PASO: Filtramos la base de datos antes de dibujarla
    const productosFiltrados = productosMenu.filter(function(producto) {
        if (categoria === 'Todos') {
            return true; // Si es 'Todos', mostramos todos
        } else {
            return producto.categoria === categoria; // Solo mostramos los que coinciden
        }
    });

    // Ahora dibujamos SOLO los productos que pasaron el filtro (productosFiltrados)
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

// 1. Intentamos leer la memoria del navegador. Si no hay nada, iniciamos un arreglo vacío.
let carrito = JSON.parse(localStorage.getItem('carrito-temaki')) || [];
let totalAcumulado = 0;



// 1. Funciones para Abrir y Cerrar el Modal
function abrirCarrito() {
    document.getElementById('modal-carrito').style.display = 'flex';
}

function cerrarCarrito() {
    document.getElementById('modal-carrito').style.display = 'none';
}

function agregarAlCarrito(nombreProducto, precioProducto) {
    // Buscamos si el sushi ya existe en el arreglo
    const indice = carrito.findIndex(producto => producto.nombre === nombreProducto);

    if (indice !== -1) {
        // Si ya existe (el índice no es -1), le sumamos 1 a la cantidad
        carrito[indice].cantidad += 1;
    } else {
        // Si no existe, lo agregamos con una nueva propiedad: cantidad 1
        carrito.push({ nombre: nombreProducto, precio: precioProducto, cantidad: 1 });
    }

    actualizarPantalla();
    
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
    totalAcumulado = 0; // Lo recalculamos desde 0 cada vez que se actualiza la pantalla
    let totalProductos = 0; // Para el contador rojo del botón superior

    carrito.forEach(function(producto, index) {
        // Validación de seguridad para pedidos antiguos guardados en la memoria
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

    totalHTML.innerText = totalAcumulado;
    contadorHTML.innerText = totalProductos;
    
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
        const subtotal = producto.precio * producto.cantidad;
        mensaje += `- ${producto.cantidad}x ${producto.nombre} ($${subtotal})\n`;
    });

    // Agregamos las instrucciones...

    if (instrucciones.trim() !== '') {
        mensaje += `\n💬 *Instrucciones Especiales:* ${instrucciones}\n`;
    }

    mensaje += `\n💰 *Total a pagar: $${totalAcumulado}*`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeCodificado}`;
    
    window.open(urlWhatsApp, '_blank');
}
