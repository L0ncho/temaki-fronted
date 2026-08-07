// Esta variable es la memoria de nuestra página
let carrito = [];

// Esta función se ejecuta cada vez que alguien presiona el botón
function agregarAlCarrito(nombreProducto, precioProducto) {
    
    // 1. Creamos un objeto con los datos del sushi
    const nuevoItem = {
        nombre: nombreProducto,
        precio: precioProducto
    };

    // 2. Lo empujamos dentro de nuestro arreglo del carrito
    carrito.push(nuevoItem);

    // 3. Mostramos un mensaje oculto para comprobar que funciona
    console.log("¡Sushi agregado exitosamente!");
    console.log("Tu carrito ahora tiene:", carrito);
}