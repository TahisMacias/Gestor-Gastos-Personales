import { formatearMoneda } from "../utils/helpers";
import { COLORES_CATEGORIA } from "../data/categories";

// Calcula totales de ingresos/gastos y agrupa los gastos por
// categoría para mostrar la distribución en barras de progreso.
function Statistics({ transacciones }) {
  const totalIngresos = transacciones
    .filter((t) => t.tipo === "ingreso")
    .reduce((acumulado, t) => acumulado + t.monto, 0);

  const totalGastos = transacciones
    .filter((t) => t.tipo === "gasto")
    .reduce((acumulado, t) => acumulado + t.monto, 0);

  const balance = totalIngresos - totalGastos;

  // Agrupación de gastos por categoría, ordenada de mayor a menor.
  const gastosPorCategoria = transacciones
    .filter((t) => t.tipo === "gasto")
    .reduce((acumulado, t) => {
      acumulado[t.categoria] = (acumulado[t.categoria] || 0) + t.monto;
      return acumulado;
    }, {});

  const categoriasOrdenadas = Object.entries(gastosPorCategoria).sort(
    (a, b) => b[1] - a[1]
  );

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h5 card-title mb-3">
          <i className="bi bi-bar-chart-fill me-2"></i>
          Estadísticas
        </h2>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="p-3 bg-success-subtle rounded text-center h-100">
              <div className="text-success small fw-semibold">
                TOTAL INGRESOS
              </div>
              <div className="fs-4 fw-bold text-success">
                {formatearMoneda(totalIngresos)}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3 bg-danger-subtle rounded text-center h-100">
              <div className="text-danger small fw-semibold">
                TOTAL GASTOS
              </div>
              <div className="fs-4 fw-bold text-danger">
                {formatearMoneda(totalGastos)}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div
              className={`p-3 rounded text-center h-100 ${
                balance >= 0 ? "bg-primary-subtle" : "bg-warning-subtle"
              }`}
            >
              <div
                className={`small fw-semibold ${
                  balance >= 0 ? "text-primary" : "text-warning-emphasis"
                }`}
              >
                BALANCE
              </div>
              <div
                className={`fs-4 fw-bold ${
                  balance >= 0 ? "text-primary" : "text-warning-emphasis"
                }`}
              >
                {formatearMoneda(balance)}
              </div>
            </div>
          </div>
        </div>

        <h3 className="h6 mb-3">Distribución de gastos por categoría</h3>

        {categoriasOrdenadas.length === 0 ? (
          <p className="text-muted small mb-0">
            Aún no hay gastos registrados para mostrar estadísticas por
            categoría.
          </p>
        ) : (
          <div className="d-flex flex-column gap-2">
            {categoriasOrdenadas.map(([categoria, monto]) => {
              const porcentaje = totalGastos
                ? Math.round((monto / totalGastos) * 100)
                : 0;
              const color = COLORES_CATEGORIA[categoria] || "#64748b";

              return (
                <div key={categoria}>
                  <div className="d-flex justify-content-between small mb-1">
                    <span>{categoria}</span>
                    <span className="text-muted">
                      {formatearMoneda(monto)} ({porcentaje}%)
                    </span>
                  </div>
                  <div className="progress" style={{ height: "10px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${porcentaje}%`,
                        backgroundColor: color,
                      }}
                      aria-valuenow={porcentaje}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Statistics;
