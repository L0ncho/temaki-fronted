const productosMenu = [
    { id: 1, nombre: "Tabla Hot Rolls (30 pz)", descripcion: "Pollo-queso-palta, Camarón-queso-cebollín, Pollo-queso-cebollín. Todas en envoltura tempura panko.", precio: 14500, imagen: "https://images.unsplash.com/photo-1617196034183-421b48364ed1?auto=format&fit=crop&w=400&q=80", categoria: "Tablas" },
    { id: 2, nombre: "Tabla Ayelen (30 pz)", descripcion: "Env. Palta: Pollo-queso-cebollín. Env. Sésamo: Camarón-queso-palta. Env. Panko: Salmón-queso-cebollín.", precio: 15000, imagen: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80", categoria: "Tablas" },
    { id: 3, nombre: "Tabla Igna (30 pz)", descripcion: "Env. Queso: Pollo-palta-cebollín. Env. Nori: Salmón-queso-palta. Env. Palta: Camarón-queso-cebollín. Env. Panko: Pollo-queso-palta.", precio: 16500, imagen: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=400&q=80", categoria: "Tablas" },
    { id: 4, nombre: "Tabla Tobal (30 pz)", descripcion: "Env. Palta: Camarón-queso-cebollín. Env. Ciboulette: Pollo-queso-palta. Env. Panko: Pollo-palta-queso y Camarón-queso-cebollín.", precio: 17500, imagen: "https://images.unsplash.com/photo-1563612116625-ca1394e7da0a?auto=format&fit=crop&w=400&q=80", categoria: "Tablas" },
    { id: 5, nombre: "Tabla Arya (30 pz)", descripcion: "Env. Queso: Palmito. Env. Nori: Pollo. Env. Sésamo: Camarón. Env. Palta: Pollo. Env. Ciboulette: Pollo. Env. Panko: Salmón.", precio: 22000, imagen: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=400&q=80", categoria: "Tablas" },
    { id: 6, nombre: "Tabla Xander (30 pz)", descripcion: "Env. Queso (x2): Pollo. Env. Palta: Camarón. Env. Nori: Salmón. Env. Panko (x2): Pollo y Camarón.", precio: 24000, imagen: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=400&q=80", categoria: "Tablas" },
    { id: 7, nombre: "Handroll Pollo", descripcion: "Pollo - Queso - Cebollín o Palta", precio: 4200, imagen: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=400&q=80", categoria: "Handrolls" },
    { id: 8, nombre: "Handroll Camarón", descripcion: "Camarón - Queso - Cebollín o Palta", precio: 4600, imagen: "https://images.unsplash.com/photo-1583623025817-eaeb128d51fb?auto=format&fit=crop&w=400&q=80", categoria: "Handrolls" },
    { id: 9, nombre: "Handroll Salmón", descripcion: "Salmón - Queso - Cebollín o Palta", precio: 5000, imagen: "https://images.unsplash.com/photo-1615367347545-ce9e8ea4f850?auto=format&fit=crop&w=400&q=80", categoria: "Handrolls" },
    { id: 10, nombre: "Gohan Pollo", descripcion: "Bowl base con Pollo", precio: 6000, imagen: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80", categoria: "Gohan" },
    { id: 11, nombre: "Gohan Camarón", descripcion: "Bowl base con Camarón", precio: 6500, imagen: "https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=400&q=80", categoria: "Gohan" },
    { id: 12, nombre: "Gohan Salmón", descripcion: "Bowl base con Salmón", precio: 7000, imagen: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80", categoria: "Gohan" },
    { id: 13, nombre: "Gohan Mix Panko", descripcion: "Bowl base con Mix Panko", precio: 8000, imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80", categoria: "Gohan" },
    { id: 14, nombre: "Gohan Mix Salteado", descripcion: "Bowl base con Mix Salteado", precio: 7500, imagen: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80", categoria: "Gohan" },
    { id: 15, nombre: "Camarón Furay", descripcion: "6 Unidades", precio: 5000, imagen: "https://images.unsplash.com/photo-1565680018434-b513d5ea5c7c?auto=format&fit=crop&w=400&q=80", categoria: "Entradas" },
    { id: 16, nombre: "Bastones de Pollo", descripcion: "6 Unidades", precio: 4500, imagen: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80", categoria: "Entradas" },
    { id: 17, nombre: "Papas Fritas", descripcion: "Porción Mediana", precio: 3500, imagen: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80", categoria: "Entradas" },
    { id: 18, nombre: "Ceviche de Salmón (M)", descripcion: "Porción Mediana", precio: 5000, imagen: "https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?auto=format&fit=crop&w=400&q=80", categoria: "Entradas" },
    { id: 19, nombre: "Ceviche de Salmón (XL)", descripcion: "Porción Extra Grande", precio: 10000, imagen: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80", categoria: "Entradas" },
    { id: 20, nombre: "Nigiris Salmón", descripcion: "6 Unidades", precio: 5000, imagen: "https://images.unsplash.com/photo-1582450871972-ab5ca641643d?auto=format&fit=crop&w=400&q=80", categoria: "Entradas" },
    { id: 21, nombre: "Arrollados", descripcion: "Jamón Queso o Primavera (6 Unidades)", precio: 4500, imagen: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=400&q=80", categoria: "Entradas" },
    { id: 22, nombre: "Gyosas", descripcion: "Cerdo, Camarón, Pollo o Verduras (6 Unidades)", precio: 6000, imagen: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80", categoria: "Entradas" }
];

// ---------- Configuración del local ----------
const TELEFONO_WHATSAPP = "56931717552";
const ZONA_HORARIA = 'America/Santiago';
// Los horarios de atención están en horarios.js
// Dirección que se muestra al elegir "Retiro en tienda". Si queda vacía, no se muestra nada.
const DIRECCION_LOCAL = "";
const CLAVE_CARRITO = 'carrito-temaki';
const COLOR_CONFIRMAR = '#32cd32';

// ---------- Utilidades ----------
function formatoCLP(monto) {
    return '$' + monto.toLocaleString('es-CL');
}

function obtenerProducto(id) {
    return productosMenu.find(producto => producto.id === id);
}

function horaChile() {
    const partes = new Intl.DateTimeFormat('es-CL', {
        timeZone: ZONA_HORARIA,
        year: 'numeric', day: '2-digit', month: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hourCycle: 'h23'
    }).formatToParts(new Date());
    // padStart: algunos navegadores devuelven "7" en vez de "07" aunque se pida '2-digit'.
    const valor = tipo => partes.find(parte => parte.type === tipo).value.padStart(2, '0');
    return { anio: valor('year'), dia: valor('day'), mes: valor('month'), hora: valor('hour'), minuto: valor('minute'), segundo: valor('second') };
}

// ---------- Horarios (configurados en horarios.js) ----------
function aMinutos(texto) {
    const coincidencia = /^(\d{1,2}):(\d{2})$/.exec(String(texto || '').trim());
    if (!coincidencia) return null;
    const horas = parseInt(coincidencia[1], 10);
    const minutos = parseInt(coincidencia[2], 10);
    if (horas > 24 || minutos > 59 || (horas === 24 && minutos > 0)) return null;
    return horas * 60 + minutos;
}

// Fecha 'AAAA-MM-DD' en Chile, desplazada en días (0 = hoy, -1 = ayer).
function fechaChile(desplazamientoDias = 0) {
    const t = horaChile();
    const fecha = new Date(Date.UTC(parseInt(t.anio, 10), parseInt(t.mes, 10) - 1, parseInt(t.dia, 10) + desplazamientoDias));
    return fecha.toISOString().slice(0, 10);
}

// Devuelve el horario de una fecha, o null si ese día no se atiende.
function horarioDelDia(fecha) {
    const especial = HORARIOS_ESPECIALES[fecha];
    const config = especial || HORARIO_NORMAL;
    if (config.cerrado) return null;

    const apertura = aMinutos(config.apertura);
    const cierre = aMinutos(config.cierre);
    if (apertura === null || cierre === null) {
        console.warn(`Horario mal escrito para ${fecha} en horarios.js; se usa el horario normal.`, config);
        return especial ? horarioDelDia('normal') : null;
    }

    return {
        apertura,
        cierre,
        cruzaMedianoche: cierre <= apertura,
        especial: Boolean(especial),
        texto: `${config.apertura} a ${config.cierre} hrs`
    };
}

function estaAbierto() {
    const t = horaChile();
    const minutosActuales = parseInt(t.hora, 10) * 60 + parseInt(t.minuto, 10);

    const hoy = horarioDelDia(fechaChile(0));
    if (hoy) {
        const antesDelCierre = hoy.cruzaMedianoche || minutosActuales < hoy.cierre;
        if (minutosActuales >= hoy.apertura && antesDelCierre) return true;
    }

    // Madrugada: sigue abierto si el horario de ayer cruzaba la medianoche.
    const ayer = horarioDelDia(fechaChile(-1));
    return Boolean(ayer && ayer.cruzaMedianoche && minutosActuales < ayer.cierre);
}

function textoHorarioHoy() {
    const hoy = horarioDelDia(fechaChile(0));
    if (!hoy) return 'Hoy no estamos atendiendo';
    return hoy.especial ? `Hoy horario especial: ${hoy.texto}` : `Horario de atención: ${hoy.texto}`;
}

function mostrarHorarioHoy() {
    document.getElementById('horario-hoy').textContent = `🕒 ${textoHorarioHoy()}`;
}

function generarIdPedido() {
    const t = horaChile();
    return `TMK-${t.dia}${t.mes}-${t.hora}${t.minuto}${t.segundo}`;
}

// Avisos con SweetAlert2; si el CDN no cargó, se usan los diálogos nativos del navegador.
function mostrarAviso(opciones) {
    if (window.Swal) return Swal.fire({ confirmButtonColor: COLOR_CONFIRMAR, ...opciones });
    if (!opciones.toast) alert([opciones.title, opciones.text].filter(Boolean).join('\n\n'));
    return Promise.resolve();
}

function confirmar(opciones) {
    if (window.Swal) {
        return Swal.fire({ showCancelButton: true, ...opciones }).then(resultado => resultado.isConfirmed);
    }
    return Promise.resolve(window.confirm([opciones.title, opciones.text].filter(Boolean).join('\n\n')));
}

function avisoRapido(titulo) {
    mostrarAviso({ toast: true, position: 'top-end', icon: 'success', title: titulo, showConfirmButton: false, timer: 1200, timerProgressBar: true });
}

// ---------- Menú ----------
function filtrarMenu(categoriaSeleccionada, botonClickeado) {
    document.querySelectorAll('.btn-filtro').forEach(boton => boton.classList.remove('activo'));
    if (botonClickeado) botonClickeado.classList.add('activo');

    document.getElementById('buscador-menu').value = '';
    cargarMenu(categoriaSeleccionada);
}

function buscarProducto() {
    const textoBuscado = document.getElementById('buscador-menu').value.trim().toLowerCase();
    document.querySelectorAll('.btn-filtro').forEach(boton => boton.classList.remove('activo'));

    const productosFiltrados = productosMenu.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBuscado) ||
        producto.descripcion.toLowerCase().includes(textoBuscado)
    );

    dibujarTarjetas(productosFiltrados);
}

function cargarMenu(categoria = 'Todos') {
    const productosFiltrados = productosMenu.filter(producto =>
        categoria === 'Todos' || producto.categoria === categoria
    );
    dibujarTarjetas(productosFiltrados);
}

function dibujarTarjetas(arregloProductos) {
    const contenedor = document.getElementById('contenedor-productos');

    if (arregloProductos.length === 0) {
        contenedor.innerHTML = '<p class="sin-resultados">No encontramos resultados para tu búsqueda. 🍣</p>';
        return;
    }

    contenedor.innerHTML = arregloProductos.map(producto => `
        <article class="card">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="card-img" width="400" height="200" loading="lazy" decoding="async">
            <div class="card-content">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <span class="price">${formatoCLP(producto.precio)}</span>
                <button class="btn-add" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
            </div>
        </article>
    `).join('');
}

// ---------- Carrito ----------
// Se guarda solo { id, cantidad }: el precio siempre se toma de productosMenu,
// así un cambio de precio en la carta (o una edición de localStorage) no altera el total.
function cargarCarritoGuardado() {
    try {
        const datos = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
        if (!Array.isArray(datos)) return [];

        return datos.map(item => {
            // Compatibilidad con el formato antiguo, que guardaba el nombre y el precio.
            const producto = item.id !== undefined
                ? obtenerProducto(item.id)
                : productosMenu.find(p => p.nombre === item.nombre);
            const cantidad = parseInt(item.cantidad, 10) || 1;
            return producto ? { id: producto.id, cantidad: Math.min(cantidad, 99) } : null;
        }).filter(Boolean);
    } catch (error) {
        return [];
    }
}

function guardarCarrito() {
    try {
        localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    } catch (error) {
        // Sin almacenamiento (modo privado, cuota llena): el carrito sigue funcionando en memoria.
    }
}

let carrito = cargarCarritoGuardado();
let elementoAntesDelCarrito = null;

function abrirCarrito() {
    elementoAntesDelCarrito = document.activeElement;
    document.getElementById('modal-carrito').classList.add('activo');
    document.querySelector('.btn-cerrar').focus();
}

function cerrarCarrito() {
    const modal = document.getElementById('modal-carrito');
    if (!modal.classList.contains('activo')) return;
    modal.classList.remove('activo');
    if (elementoAntesDelCarrito) elementoAntesDelCarrito.focus();
}

function limpiarPedido() {
    carrito = [];
    document.querySelectorAll('.chk-extra').forEach(chk => chk.checked = false);
    actualizarPantalla();
}

function vaciarCarrito() {
    if (carrito.length === 0) return;

    confirmar({
        title: '¿Vaciar pedido?',
        text: 'Se eliminarán todos los productos de tu carrito.',
        icon: 'warning',
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then(confirmado => {
        if (!confirmado) return;
        limpiarPedido();
        cerrarCarrito();
        avisoRapido('Carrito vacío');
    });
}

function toggleDireccion() {
    const esRetiro = document.getElementById('cliente-metodo').value === 'retiro';
    const selectZona = document.getElementById('cliente-comuna');
    const infoRetiro = document.getElementById('info-retiro');

    document.getElementById('campos-delivery').hidden = esRetiro;
    if (esRetiro) selectZona.value = '';

    infoRetiro.hidden = !(esRetiro && DIRECCION_LOCAL);
    if (DIRECCION_LOCAL) infoRetiro.textContent = `📍 Retira tu pedido en: ${DIRECCION_LOCAL}`;

    actualizarPantalla();
}

function agregarAlCarrito(idProducto) {
    if (!obtenerProducto(idProducto)) return;

    const item = carrito.find(producto => producto.id === idProducto);
    if (item) item.cantidad += 1;
    else carrito.push({ id: idProducto, cantidad: 1 });

    actualizarPantalla();
    avisoRapido('¡Agregado al carrito!');
}

function eliminarDelCarrito(index) {
    if (!carrito[index]) return;
    if (carrito[index].cantidad > 1) carrito[index].cantidad -= 1;
    else carrito.splice(index, 1);
    actualizarPantalla();
}

function calcularTotales() {
    const lineas = carrito.map(item => {
        const producto = obtenerProducto(item.id);
        return { nombre: producto.nombre, cantidad: item.cantidad, subtotal: producto.precio * item.cantidad };
    });

    const extras = Array.from(document.querySelectorAll('.chk-extra:checked')).map(chk => ({
        nombre: chk.dataset.nombre,
        precio: parseInt(chk.value, 10) || 0
    }));

    const esDelivery = document.getElementById('cliente-metodo').value === 'delivery';
    const opcionZona = document.getElementById('cliente-comuna').selectedOptions[0];
    const costoEnvio = esDelivery && opcionZona ? (parseInt(opcionZona.value, 10) || 0) : 0;

    const subtotal = lineas.reduce((suma, linea) => suma + linea.subtotal, 0);
    const costoExtras = extras.reduce((suma, extra) => suma + extra.precio, 0);

    return {
        lineas,
        extras,
        subtotal,
        costoExtras,
        costoEnvio,
        nombreZona: opcionZona ? opcionZona.dataset.nombre : '',
        cantidadProductos: lineas.reduce((suma, linea) => suma + linea.cantidad, 0),
        total: subtotal + costoExtras + costoEnvio
    };
}

function actualizarPantalla() {
    const totales = calcularTotales();

    document.getElementById('lista-carrito').innerHTML = totales.lineas.map((linea, index) => `
        <li>
            <span><b>${linea.cantidad}x</b> ${linea.nombre} - ${formatoCLP(linea.subtotal)}</span>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})" aria-label="Quitar una unidad de ${linea.nombre}">🗑️</button>
        </li>
    `).join('');

    let desglose = '';
    if (totales.costoExtras > 0 || totales.costoEnvio > 0) {
        desglose += `<span class="desglose">Productos: ${formatoCLP(totales.subtotal)}</span>`;
        if (totales.costoExtras > 0) desglose += `<span class="desglose">+ ${formatoCLP(totales.costoExtras)} (Extras)</span>`;
        if (totales.costoEnvio > 0) desglose += `<span class="desglose">+ ${formatoCLP(totales.costoEnvio)} (Despacho)</span>`;
    }
    document.getElementById('total-precio').innerHTML = `${desglose}<strong>Total: ${formatoCLP(totales.total)}</strong>`;

    document.getElementById('contador-carrito').textContent = totales.cantidadProductos;
    document.getElementById('contador-flotante').textContent = totales.cantidadProductos;
    guardarCarrito();
}

// ---------- Envío a WhatsApp ----------
function faltanDatos(texto) {
    mostrarAviso({ icon: 'error', title: 'Faltan datos', text: texto });
}

function enviarAWhatsApp() {
    if (!estaAbierto()) {
        mostrarAviso({
            icon: 'info',
            title: '¡Local Cerrado! 🌙',
            text: `${textoHorarioHoy()}. ¡Te esperamos!`
        });
        mostrarHorarioHoy();
        return;
    }

    if (carrito.length === 0) {
        mostrarAviso({ icon: 'warning', title: '¡Tu carrito está vacío!', text: 'Agrega algunos deliciosos sushis primero.' });
        return;
    }

    const nombre = document.getElementById('cliente-nombre').value.trim();
    const metodo = document.getElementById('cliente-metodo').value;
    const direccion = document.getElementById('cliente-direccion').value.trim();
    const instrucciones = document.getElementById('cliente-instrucciones').value.trim();
    const totales = calcularTotales();

    if (nombre === '') return faltanDatos('Por favor, ingresa tu nombre.');
    if (metodo === 'delivery' && totales.costoEnvio === 0) return faltanDatos('Selecciona tu zona para calcular el despacho.');
    if (metodo === 'delivery' && direccion === '') return faltanDatos('Ingresa tu dirección exacta.');

    let mensaje = `🍣 *¡Hola Temaki Sushi! Quiero hacer un pedido:*\n\n`;
    mensaje += `🧾 *Orden:* #${generarIdPedido()}\n`;
    mensaje += `👤 *Cliente:* ${nombre}\n`;

    if (metodo === 'delivery') {
        mensaje += `🛵 *Método:* Delivery\n📍 *Zona:* ${totales.nombreZona}\n📍 *Dirección:* ${direccion}\n\n`;
    } else {
        mensaje += `🏪 *Método:* Retiro en Tienda\n\n`;
    }

    mensaje += `📝 *Mi Pedido:*\n`;
    totales.lineas.forEach(linea => {
        mensaje += `- ${linea.cantidad}x ${linea.nombre} (${formatoCLP(linea.subtotal)})\n`;
    });

    if (totales.extras.length > 0) {
        mensaje += `\n➕ *Extras agregados:*\n`;
        totales.extras.forEach(extra => mensaje += `- ${extra.nombre} (+${formatoCLP(extra.precio)})\n`);
    }

    if (instrucciones !== '') mensaje += `\n💬 *Instrucciones Especiales:* ${instrucciones}\n`;

    if (totales.costoEnvio > 0) mensaje += `\n🛵 *Despacho:* ${formatoCLP(totales.costoEnvio)}`;
    mensaje += `\n💰 *Total a pagar: ${formatoCLP(totales.total)}*`;

    const urlWhatsApp = `https://wa.me/${TELEFONO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

    // Se abre WhatsApp dentro del mismo clic para que el navegador no lo bloquee.
    const enlace = document.createElement('a');
    enlace.href = urlWhatsApp;
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);

    // El carrito solo se vacía cuando el cliente confirma que envió el mensaje.
    confirmar({
        icon: 'question',
        title: '¿Pudiste enviar tu pedido?',
        html: `Si WhatsApp no se abrió, <a href="${urlWhatsApp}" target="_blank" rel="noopener">toca aquí para abrirlo de nuevo</a>.`,
        text: 'Si WhatsApp no se abrió, vuelve a intentarlo.',
        confirmButtonColor: COLOR_CONFIRMAR,
        confirmButtonText: 'Sí, ya lo envié',
        cancelButtonText: 'No, mantener mi pedido'
    }).then(enviado => {
        if (!enviado) return;
        limpiarPedido();
        cerrarCarrito();
        avisoRapido('¡Gracias por tu pedido! 🍣');
    });
}

// ---------- Inicio y eventos globales ----------
window.addEventListener('DOMContentLoaded', () => {
    cargarMenu();
    toggleDireccion();
    mostrarHorarioHoy();
});

window.addEventListener('click', event => {
    if (event.target === document.getElementById('modal-carrito')) cerrarCarrito();
});

// Teclado dentro del carrito: Escape cierra y Tab no se sale del panel.
document.addEventListener('keydown', event => {
    const modal = document.getElementById('modal-carrito');
    if (!modal.classList.contains('activo')) return;
    // Si hay un aviso de SweetAlert abierto, él maneja el teclado.
    if (window.Swal && Swal.isVisible()) return;

    if (event.key === 'Escape') {
        cerrarCarrito();
        return;
    }

    if (event.key === 'Tab') {
        const enfocables = Array.from(modal.querySelectorAll('button, input, select, textarea, a[href]'))
            .filter(el => !el.disabled && el.offsetParent !== null);
        if (enfocables.length === 0) return;
        const primero = enfocables[0];
        const ultimo = enfocables[enfocables.length - 1];

        if (event.shiftKey && document.activeElement === primero) {
            event.preventDefault();
            ultimo.focus();
        } else if (!event.shiftKey && document.activeElement === ultimo) {
            event.preventDefault();
            primero.focus();
        }
    }
});
