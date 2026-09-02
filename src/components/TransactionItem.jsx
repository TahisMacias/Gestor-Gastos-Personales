import { formatearMoneda, formatearFecha } from "../utils/helpers";

// Elige un ícono representativo según el método de pago, para que la
// tabla se lea de un vistazo sin tener que fijarse en el texto.
function iconoMetodoPago(metodo) {
  const texto = (metodo || "").toLowerCase();
  if (texto.includes("efectivo")) return "bi-cash-coin";
  if (texto.includes("débito") || texto.includes("debito")) return "bi-credit-card";
  if (texto.includes("crédito") || texto.includes("credito")) return "bi-credit-card-2-front";
  if (texto.includes("transferencia")) return "bi-bank";
  return "bi-three-dots";
}

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
      <td>
        <div>{transaccion.descripcion}</div>
        {transaccion.metodoPago && (
          <span className="badge-metodo-pago mt-1">
            <i className={`bi ${iconoMetodoPago(transaccion.metodoPago)}`}></i>
            {transaccion.metodoPago}
          </span>
        )}
      </td>
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
      <td className="text-end acciones-celda">
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
