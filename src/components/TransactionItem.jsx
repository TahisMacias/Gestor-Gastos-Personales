import { formatearMoneda, formatearFecha } from "../utils/helpers";

// Representa una única fila de la tabla de transacciones, con sus
// acciones de editar y eliminar.
function TransactionItem({ transaccion, onEditar, onEliminar }) {
  const esIngreso = transaccion.tipo === "ingreso";

  return (
    <tr>
      <td>
        <span
          className={`badge ${esIngreso ? "bg-success" : "bg-danger"}`}
        >
          <i
            className={`bi ${
              esIngreso ? "bi-arrow-up-circle" : "bi-arrow-down-circle"
            } me-1`}
          ></i>
          {esIngreso ? "Ingreso" : "Gasto"}
        </span>
      </td>
      <td>{transaccion.descripcion}</td>
      <td>
        <span className="badge text-bg-light border">
          {transaccion.categoria}
        </span>
      </td>
      <td>{formatearFecha(transaccion.fecha)}</td>
      <td
        className={`money fw-semibold ${
          esIngreso ? "text-success" : "text-danger"
        }`}
      >
        {esIngreso ? "+" : "-"}
        {formatearMoneda(transaccion.monto)}
      </td>
            <td className="text-end">
        <button
          className="btn-action btn-action-edit"
          title="Editar"
          onClick={() => onEditar(transaccion)}
        >
          <i className="bi bi-pencil-fill"></i>
        </button>
        <button
          className="btn-action btn-action-delete"
          title="Eliminar"
          onClick={() => onEliminar(transaccion.id)}
        >
          <i className="bi bi-trash-fill"></i>
        </button>
      </td>
    </tr>
  );
}

export default TransactionItem;
