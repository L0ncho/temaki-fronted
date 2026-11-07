// =====================================================================
//  HORARIOS DE ATENCIÓN DE TEMAKI SUSHI  (hora de Chile)
//  Este es el único archivo que hay que editar para cambiar horarios.
// =====================================================================

// Horario de todos los días.
const HORARIO_NORMAL = { apertura: '18:30', cierre: '23:00' };

// Días con horario distinto al normal. Formato de fecha: 'AAAA-MM-DD'.
//  - Para abrir en otro horario:   '2026-12-24': { apertura: '13:00', cierre: '18:00' },
//  - Para no atender ese día:      '2026-12-25': { cerrado: true },
//  - Si cierra después de medianoche, se pone la hora del día siguiente:
//                                  '2026-12-31': { apertura: '18:30', cierre: '02:00' },
// Las fechas pasadas se pueden borrar cuando quieras; no afectan nada.
const HORARIOS_ESPECIALES = {
    // '2026-12-24': { apertura: '13:00', cierre: '18:00' },
    // '2026-12-25': { cerrado: true },
};
