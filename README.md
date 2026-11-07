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

Horario de pedidos: **18:30 a 23:00 hrs** (hora de Chile), con la posibilidad de definir días con horario especial o cerrados (ver [Horarios](#horarios)). Fuera de horario la app avisa que el local está cerrado y no abre WhatsApp.

El sitio tiene **modo claro y oscuro**: en automático sigue la luz del día en Puchuncaví, y el cliente puede fijarlo con el botón del encabezado.

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
├── horarios.js   Horario normal y horarios especiales (el único archivo a editar para horarios)
├── tema.js       Modo claro / oscuro (se carga en el <head>)
├── logo.png      Logo del local
└── README.md
```

Dependencia externa: [SweetAlert2](https://sweetalert2.github.io/) v11.14.5 (CDN, con verificación SRI) para avisos y confirmaciones.

## Horarios

Se configuran en `horarios.js`:

```js
const HORARIO_NORMAL = { apertura: '18:30', cierre: '23:00' };

const HORARIOS_ESPECIALES = {
    '2026-12-24': { apertura: '13:00', cierre: '18:00' },   // abre en otro horario
    '2026-12-25': { cerrado: true },                          // no atiende
    '2026-12-31': { apertura: '18:30', cierre: '02:00' },   // cierra después de medianoche
};
```

- Las fechas van en formato `AAAA-MM-DD` y las horas son de Chile.
- El encabezado muestra el horario del día ("Hoy horario especial: 13:00 a 18:00 hrs" o "Hoy no estamos atendiendo").
- Si una hora está mal escrita, se usa el horario normal y se avisa en la consola del navegador.

## Modo claro / oscuro

`tema.js` pone `data-theme="light"` o `"dark"` en `<html>`, y `style.css` redefine las variables de color bajo `:root[data-theme="dark"]`.

- **Auto** (por defecto): claro entre el amanecer y la puesta de sol de Puchuncaví, calculados para cada día del año. Cambia solo sin recargar la página, así que también funciona en horarios especiales de día.
- **Claro / Oscuro**: el botón del encabezado pasa por Auto → Claro → Oscuro, y la elección queda guardada en el navegador (`tema-temaki` en `localStorage`).
- En modo oscuro el logo va sobre un círculo claro y los avisos de SweetAlert2 usan los colores oscuros.

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

El `<select id="cliente-comuna">` en `index.html` define zona y costo. El `value` de cada opción es el valor del despacho en pesos chilenos y `data-nombre` es el nombre que llega en el mensaje de WhatsApp. Las opciones están en orden alfabético.

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
| Teléfono WhatsApp | `TELEFONO_WHATSAPP` al inicio de la configuración en `app.js` |
| Horario           | `horarios.js` |
| Dirección para retiro | `DIRECCION_LOCAL` en `app.js` (vacía = no se muestra) |
| Carrito persistente | Clave `carrito-temaki` en `localStorage`. Guarda solo `{ id, cantidad }`; el precio siempre se lee de `productosMenu` |
| Colores           | Variables CSS en `:root` (claro) y `:root[data-theme="dark"]` (oscuro) al inicio de `style.css` |
| Instagram         | Footer de `index.html`             |

## Notas sobre el pedido

- Los precios se muestran con formato chileno (`$14.500`) mediante `formatoCLP()`.
- El número de orden se arma con la fecha y hora de Chile: `TMK-DDMM-HHMMSS`.
- Al pulsar **Enviar a WhatsApp** el carrito no se vacía de inmediato: la app pregunta si el mensaje se envió y solo entonces lo limpia. Si WhatsApp no se abrió, ofrece un enlace para reintentar.
- Si el CDN de SweetAlert2 no carga, los avisos usan los diálogos nativos del navegador y el pedido igual se puede enviar.
- Como no hay backend, el total lo calcula el navegador del cliente: conviene que el local lo revise al recibir el pedido.
