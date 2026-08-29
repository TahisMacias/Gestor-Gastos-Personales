import { CATEGORIAS_INGRESO, CATEGORIAS_GASTO } from "../data/categories";

// Filtros combinables por tipo (ingreso/gasto/todos) y por categoría.
// La lista de categorías mostrada depende del tipo seleccionado.
function Filter({ filtros, onCambiarFiltros }) {
  const categoriasDisponibles =
    filtros.tipo === "ingreso"
      ? CATEGORIAS_INGRESO
      : filtros.tipo === "gasto"
      ? CATEGORIAS_GASTO
      : [...CATEGORIAS_INGRESO, ...CATEGORIAS_GASTO];

  function cambiarTipo(tipo) {
    onCambiarFiltros({ ...filtros, tipo, categoria: "" });
  }

  function cambiarCategoria(evento) {
    onCambiarFiltros({ ...filtros, categoria: evento.target.value });
  }

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center">
      <div className="btn-group" role="group" aria-label="Filtro por tipo">
        <button
          type="button"
          className={`btn btn-sm ${
            filtros.tipo === "todos" ? "btn-secondary" : "btn-outline-secondary"
          }`}
          onClick={() => cambiarTipo("todos")}
        >
          Todos
        </button>
        <button
          type="button"
          className={`btn btn-sm ${
            filtros.tipo === "ingreso" ? "btn-success" : "btn-outline-success"
          }`}
          onClick={() => cambiarTipo("ingreso")}
        >
          Ingresos
        </button>
        <button
          type="button"
          className={`btn btn-sm ${
            filtros.tipo === "gasto" ? "btn-danger" : "btn-outline-danger"
          }`}
          onClick={() => cambiarTipo("gasto")}
        >
          Gastos
        </button>
      </div>

      <select
        className="form-select form-select-sm w-auto"
        value={filtros.categoria}
        onChange={cambiarCategoria}
      >
        <option value="">Todas las categorías</option>
        {categoriasDisponibles.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
