import TransactionItem from "./TransactionItem";

// Tabla que recibe la lista YA filtrada (búsqueda + filtros) desde
// App y simplemente la recorre mostrando un TransactionItem por fila.
function TransactionList({ transacciones, onEditar, onEliminar }) {
  if (transacciones.length === 0) {
    return (
      <div className="text-center text-muted py-5">
        <i className="bi bi-inbox fs-1 d-block mb-2"></i>
        No hay registros que coincidan con la búsqueda o los filtros.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {transacciones.map((transaccion) => (
            <TransactionItem
              key={transaccion.id}
              transaccion={transaccion}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
