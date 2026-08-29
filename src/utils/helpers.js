// Funciones auxiliares reutilizadas por varios componentes.

// Genera un identificador único simple para cada transacción.
export function generarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Da formato de moneda (USD) a un número.
export function formatearMoneda(valor) {
  const numero = Number(valor) || 0;
  return numero.toLocaleString("es-EC", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
}

// Convierte una fecha ISO (yyyy-mm-dd) a formato legible dd/mm/yyyy.
export function formatearFecha(fechaISO) {
  if (!fechaISO) return "";
  const [anio, mes, dia] = fechaISO.split("-");
  return `${dia}/${mes}/${anio}`;
}

// Devuelve la fecha actual en formato yyyy-mm-dd, usada como valor
// por defecto en el formulario.
export function fechaHoy() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const dia = String(hoy.getDate()).padStart(2, "0");
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}
