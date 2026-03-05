export function formatearFechaAYYYYMMDD(fecha){
    const [d, m, y] = fecha.split("/");
    const mFormateado = m.length === 1 ? `0${m}` : m;
    const dFormateado = d.length === 1 ? `0${d}` : d;
    return `${y}-${mFormateado}-${dFormateado}`
}

export function formatearFechaADate(fecha){
    const [y, m, d] = fecha.split("-");
    return new Date(y, m - 1, d);
}