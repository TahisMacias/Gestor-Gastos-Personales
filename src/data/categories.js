// Categorías predefinidas del sistema.
// Se separan por tipo de transacción para que el formulario
// muestre solo las categorías correspondientes según lo seleccionado.

export const CATEGORIAS_INGRESO = [
  "Salario",
  "Freelance",
  "Inversiones",
  "Regalo",
  "Ventas",
  "Otros",
];

export const CATEGORIAS_GASTO = [
  "Alimentación",
  "Transporte",
  "Vivienda",
  "Salud",
  "Entretenimiento",
  "Educación",
  "Ropa",
  "Servicios",
  "Otros",
];

// Métodos de pago disponibles para cada transacción: indican de
// dónde salió (o a dónde entró) el dinero.
export const METODOS_PAGO = [
  "Efectivo",
  "Tarjeta de débito",
  "Tarjeta de crédito",
  "Transferencia bancaria",
  "Otro",
];

// Colores asociados a cada categoría de gasto, usados en las
// estadísticas (barras y distribución por categoría).
export const COLORES_CATEGORIA = {
  "Alimentación": "#f97316",
  "Transporte": "#3b82f6",
  "Vivienda": "#8b5cf6",
  "Salud": "#ef4444",
  "Entretenimiento": "#ec4899",
  "Educación": "#14b8a6",
  "Ropa": "#eab308",
  "Servicios": "#6366f1",
  "Otros": "#64748b",
  "Salario": "#22c55e",
  "Freelance": "#0ea5e9",
  "Inversiones": "#a855f7",
  "Regalo": "#f43f5e",
  "Ventas": "#84cc16",
};
