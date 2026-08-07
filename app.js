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
    // Eliminamos los agregados de aquí para que no salgan como tarjetas gigantes
];
// ------------------------------

// --- LÓGICA DE FILTROS Y MENÚ ---
function filtrarMenu(categoriaSeleccionada, botonClickeado) {
    const botones = document.querySelectorAll('.btn-filtro');
    botones.forEach(boton => boton.classList.remove('activo'));

    if (botonClickeado) {
        botonClickeado.classList.add('activo');
    }

    cargarMenu(categoriaSeleccionada);
}

function cargarMenu(categoria = 'Todos') {
    const contenedorMenu = document.getElementById('contenedor-productos');
    contenedorMenu.innerHTML = ''; 

    const productosFiltrados = productosMenu.filter(function(producto) {
        if (categoria === 'Todos') {
            return true; 
        } else {
            return producto.categoria === categoria; 
        }
    });

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
        
        if (selectComuna) {
            selectComuna.style.display = 'none';
            selectComuna.value = "0"; 
        }
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

    // Sumar el costo de envío
    const selectComuna = document.getElementById('cliente-comuna');
    const costoEnvio = selectComuna ? (parseInt(selectComuna.value) || 0) : 0; 
    
    // Sumar los extras marcados en los checkboxes
    let costoExtras = 0;
    const checkboxes = document.querySelectorAll('.chk-extra');
    checkboxes.forEach(chk => {
        if (chk.checked) costoExtras += parseInt(chk.value);
    });

    const totalFinal = totalAcumulado + costoEnvio + costoExtras;

    // Mostrar el desglose en el carrito
    let desgloseTexto = `${totalAcumulado}`;
    if (costoExtras > 0) desgloseTexto += ` <br><span style="font-size: 0.9rem; color: #666;">+ $${costoExtras} (Extras)</span>`;
    if (costoEnvio > 0) desgloseTexto += ` <br><span style="font-size: 0.9rem; color: #666;">+ $${costoEnvio} (Despacho)</span>`;
    
    if (costoEnvio > 0 || costoExtras > 0) {
        totalHTML.innerHTML = `${desgloseTexto} <br> <strong style="font-size: 1.1rem;">Total: $${totalFinal}</strong>`;
    } else {
        totalHTML.innerText = totalAcumulado;
    }
    
    contadorHTML.innerText = totalProductos;
    localStorage.setItem('carrito-temaki', JSON.stringify(carrito));
}

function eliminarDelCarrito(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
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

    // Leer los extras marcados para el mensaje
    const checkboxes = document.querySelectorAll('.chk-extra');
    let costoExtras = 0;
    let extrasSeleccionados = [];

    checkboxes.forEach(chk => {
        if (chk.checked) {
            extrasSeleccionados.push(`${chk.dataset.nombre} (+$${chk.value})`);
            costoExtras += parseInt(chk.value);
        }
    });

    if (extrasSeleccionados.length > 0) {
        mensaje += `\n➕ *Extras agregados:*\n`;
        extrasSeleccionados.forEach(extra => {
            mensaje += `- ${extra}\n`;
        });
    }

    if (instrucciones.trim() !== '') {
        mensaje += `\n💬 *Instrucciones Especiales:* ${instrucciones}\n`;
    }

    const totalFinalReal = totalAcumulado + costoEnvio + costoExtras;
    mensaje += `\n💰 *Total a pagar: $${totalFinalReal}*`;

    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeCodificado}`;
    
    window.open(urlWhatsApp, '_blank');

    //Vaciar el carrito y actualizar la pantalla después de enviar el pedido
    carrito = [];
    actualizarPantalla();
    cerrarCarrito();

    const esCelular = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (esCelular) {
        window.location.href = urlWhatsApp;
    } else {
        window.open(urlWhatsApp, '_blank');
    }
}

// --- ARRANQUE DE LA APLICACIÓN ---
window.onload = function() {
    cargarMenu();           
    actualizarPantalla();   
};