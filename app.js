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
function enviarAWhatsApp() {
    // 1. Validar que el carrito no esté vacío
    if (carrito.length === 0) {
        alert("¡Tu carrito está vacío! Agrega algunos sushis primero.");
        return; // Detiene la función aquí si no hay productos
    }

    // 2. El número de teléfono del restaurante (con código de país, sin el símbolo +)
    // Ejemplo para Chile: 56912345678
    const telefono = "56931717552"; 

    // 3. Empezar a armar el mensaje de texto
    let mensaje = "🍣 *¡Hola Temaki Sushi! Quiero hacer un pedido:*\n\n";

    // 4. Recorrer el carrito y agregar cada producto al mensaje
    carrito.forEach(function(producto) {
        mensaje += `- ${producto.nombre} ($${producto.precio})\n`;
    });

    // 5. Agregar el total al final del mensaje
    mensaje += `\n*Total a pagar: $${totalAcumulado}*`;

    // 6. Codificar el texto para que los espacios y saltos de línea funcionen en una URL
    const mensajeCodificado = encodeURIComponent(mensaje);

    // 7. Crear el enlace oficial de WhatsApp
    const urlWhatsApp = `https://wa.me/${telefono}?text=${mensajeCodificado}`;

    // 8. Abrir WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, '_blank');
}