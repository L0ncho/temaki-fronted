// Tema claro / oscuro.
// Se carga en el <head> para aplicar el tema antes de dibujar la página (sin destello blanco).
//
// Modos del botón:  Auto -> Claro -> Oscuro -> Auto ...
//  - Auto:   claro de día y oscuro desde la puesta de sol hasta el amanecer en Puchuncaví.
//            Así funciona igual en horarios extraordinarios (por ejemplo, si se abre a mediodía).
//  - Claro / Oscuro: elección fija del cliente, se recuerda en su navegador.
(function () {
    const CLAVE_TEMA = 'tema-temaki';
    const LATITUD = -32.73;   // Puchuncaví
    const LONGITUD = -71.41;
    const MODOS = ['auto', 'claro', 'oscuro'];
    const ETIQUETAS = {
        auto: { icono: '🌓', texto: 'Auto', descripcion: 'automático según la luz del día' },
        claro: { icono: '☀️', texto: 'Claro', descripcion: 'claro' },
        oscuro: { icono: '🌙', texto: 'Oscuro', descripcion: 'oscuro' }
    };

    let preferencia = 'auto';
    try {
        const guardada = localStorage.getItem(CLAVE_TEMA);
        if (MODOS.includes(guardada)) preferencia = guardada;
    } catch (error) { /* sin almacenamiento: se usa 'auto' */ }

    // Amanecer y puesta de sol en minutos UTC (aproximación de la NOAA, error de ~1-2 minutos).
    function horasDeSol(fecha) {
        const inicioAnio = Date.UTC(fecha.getUTCFullYear(), 0, 1);
        const diaDelAnio = Math.floor((fecha.getTime() - inicioAnio) / 86400000) + 1;
        const g = (2 * Math.PI / 365) * (diaDelAnio - 1);

        const ecuacionTiempo = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g)
            - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
        const declinacion = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g)
            - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g)
            - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);

        const rad = Math.PI / 180;
        const latitud = LATITUD * rad;
        const cosAngulo = Math.cos(90.833 * rad) / (Math.cos(latitud) * Math.cos(declinacion))
            - Math.tan(latitud) * Math.tan(declinacion);
        const anguloHorario = Math.acos(Math.min(1, Math.max(-1, cosAngulo))) / rad;

        return {
            amanecer: 720 - 4 * (LONGITUD + anguloHorario) - ecuacionTiempo,
            atardecer: 720 - 4 * (LONGITUD - anguloHorario) - ecuacionTiempo
        };
    }

    function esDeDia(fecha = new Date()) {
        const { amanecer, atardecer } = horasDeSol(fecha);
        const ahora = fecha.getUTCHours() * 60 + fecha.getUTCMinutes();
        // El atardecer en UTC puede pasar de las 24:00, por eso también se compara "ahora + 1 día".
        return [ahora, ahora + 1440].some(minuto => minuto >= amanecer && minuto < atardecer);
    }

    function temaActual() {
        if (preferencia === 'claro') return 'light';
        if (preferencia === 'oscuro') return 'dark';
        return esDeDia() ? 'light' : 'dark';
    }

    function aplicarTema() {
        document.documentElement.dataset.theme = temaActual();

        const boton = document.getElementById('btn-tema');
        if (boton) {
            const etiqueta = ETIQUETAS[preferencia];
            boton.textContent = `${etiqueta.icono} ${etiqueta.texto}`;
            boton.setAttribute('aria-label', `Tema: ${etiqueta.descripcion}. Toca para cambiar.`);
            boton.title = `Tema ${etiqueta.descripcion}`;
        }
    }

    window.cambiarTema = function () {
        preferencia = MODOS[(MODOS.indexOf(preferencia) + 1) % MODOS.length];
        try {
            if (preferencia === 'auto') localStorage.removeItem(CLAVE_TEMA);
            else localStorage.setItem(CLAVE_TEMA, preferencia);
        } catch (error) { /* se mantiene solo en esta visita */ }
        aplicarTema();
    };

    aplicarTema();
    document.addEventListener('DOMContentLoaded', aplicarTema);
    // En modo automático, cambia solo al llegar el atardecer o el amanecer sin recargar la página.
    setInterval(aplicarTema, 60 * 1000);
})();
