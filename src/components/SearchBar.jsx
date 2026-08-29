// Campo de búsqueda por texto libre. Filtra sobre la descripción
// de cada transacción. El valor y el manejador viven en el
// componente padre (App) para poder combinarlo con los otros filtros.
function SearchBar({ busqueda, onCambiarBusqueda }) {
  return (
    <div className="input-group">
      <span className="input-group-text bg-white">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por descripción..."
        value={busqueda}
        onChange={(e) => onCambiarBusqueda(e.target.value)}
      />
      {busqueda && (
        <button
          className="btn btn-outline-secondary"
          type="button"
          onClick={() => onCambiarBusqueda("")}
          title="Limpiar búsqueda"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      )}
    </div>
  );
}

export default SearchBar;
