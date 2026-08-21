# Temaki Sushi

Sitio web estático para pedir sushi a **Temaki Sushi**, un local de delivery y retiro en la zona de Puchuncaví (Región de Valparaíso, Chile).

El cliente recorre el menú, arma su pedido en el carrito y lo envía por WhatsApp al local. No hay backend ni pasarela de pago: el pedido llega como mensaje de texto.

## Qué puede hacer el cliente

- Ver la carta (tablas, handrolls, gohan y entradas)
- Filtrar por categoría o buscar por nombre/descripción
- Agregar productos al carrito (se guarda en `localStorage`)
- Elegir extras (palta, soya, teriyaki)
- Pedir **delivery** (con zona y costo de despacho) o **retiro en tienda**
- Enviar el pedido a WhatsApp con un número de orden (`TMK-XXXX`)

Horario de pedidos: **18:30 a 23:00 hrs** (hora de Chile). Fuera de ese rango la app avisa que el local está cerrado y no abre WhatsApp.

Instagram: [sushitemaki__](https://www.instagram.com/sushitemaki__/)

## Cómo funciona el pedido

1. El cliente agrega productos desde las tarjetas del menú.
2. Abre el carrito (botón del encabezado o botón flotante en móvil).
3. Completa nombre, método de entrega y, si es delivery, zona + dirección.
4. Al pulsar **Enviar a WhatsApp**, la app valida horario y datos, arma un mensaje con el detalle y el total, y abre `wa.me` hacia el número del local.

El total incluye productos + extras + despacho (si corresponde).

## Cómo verla en local

Es HTML, CSS y JavaScript vanilla. No requiere `npm` ni servidor.

1. Abre `index.html` en el navegador, o
2. Usa Live Server / un servidor estático si prefieres evitar restricciones de `file://`.

## Estructura del proyecto

```
Temaki-Fronted/
├── index.html    Interfaz: menú, filtros, carrito y footer
├── style.css     Estilos y diseño responsive
├── app.js        Menú, carrito, validaciones y envío a WhatsApp
├── logo.png      Logo del local
└── README.md
```

Dependencia externa: [SweetAlert2](https://sweetalert2.github.io/) (CDN) para avisos y confirmaciones.

## Carta

Los productos viven en el arreglo `productosMenu` de `app.js`. Categorías:

| Categoría   | Qué incluye                          |
|-------------|--------------------------------------|
| Tablas      | Combinados de 30 piezas              |
| Handrolls   | Pollo, camarón y salmón              |
| Gohan       | Bowls de arroz con proteína o mix    |
| Entradas    | Picoteos, ceviches, nigiris, gyosas  |

Las imágenes actuales son de Unsplash (placeholders). Para cambiar precios, textos o fotos, edita ese arreglo.

## Zonas de delivery

El `<select id="cliente-comuna">` en `index.html` define zona y costo. El `value` de cada opción es el valor del despacho en pesos chilenos.

| Zona              | Despacho |
|-------------------|----------|
| Puchuncaví        | $2.000   |
| Campiche          | $2.500   |
| El Paso           | $2.500   |
| El Rincón         | $2.500   |
| San Antonio       | $2.500   |
| El Rungue         | $3.000   |
| La Greda          | $3.500   |
| El Médano         | $3.500   |
| Ventanas          | $4.000   |
| Chocota           | $4.000   |
| Pucalan           | $4.000   |
| Maitenes          | $4.500   |
| Los Maquis        | $4.500   |
| Maitencillo       | $5.000   |
| Horcón            | $5.000   |
| Altos el Rungue   | $5.000   |
| Laguna            | $5.500   |
| Marbella Adentro  | $6.000   |

## Datos que conviene conocer al mantener el sitio

| Dato              | Dónde está                         |
|-------------------|------------------------------------|
| Teléfono WhatsApp | `telefono` en `enviarAWhatsApp()` (`app.js`) |
| Horario           | Validación en `enviarAWhatsApp()` y texto del encabezado |
| Carrito persistente | Clave `carrito-temaki` en `localStorage` |
| Instagram         | Footer de `index.html`             |
