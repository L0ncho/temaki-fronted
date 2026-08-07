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