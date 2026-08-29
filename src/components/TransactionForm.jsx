import { useState, useEffect } from "react";
import { CATEGORIAS_INGRESO, CATEGORIAS_GASTO } from "../data/categories";
import { fechaHoy } from "../utils/helpers";

// Estado inicial "vacío" del formulario, reutilizado tanto al montar
// el componente como después de guardar o cancelar una edición.
const formularioVacio = {
  tipo: "gasto",
  descripcion: "",
  monto: "",
  categoria: "",
  fecha: fechaHoy(),
};

// Formulario único que sirve tanto para CREAR una transacción nueva
// como para EDITAR una existente (props.transaccionEditar).
function TransactionForm({ onGuardar, transaccionEditar, onCancelarEdicion }) {
  const [formulario, setFormulario] = useState(formularioVacio);
  const [errores, setErrores] = useState({});

  // Cuando el usuario pulsa "Editar" en un elemento de la lista,
  // el formulario se rellena con los datos de esa transacción.
  useEffect(() => {
    if (transaccionEditar) {
      setFormulario(transaccionEditar);
      setErrores({});
    }
  }, [transaccionEditar]);

  const categoriasDisponibles =
    formulario.tipo === "ingreso" ? CATEGORIAS_INGRESO : CATEGORIAS_GASTO;

  function manejarCambio(evento) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
      // Si el usuario cambia el tipo, la categoría anterior ya no es
      // válida (pertenecía al otro tipo), así que se limpia.
      ...(name === "tipo" ? { categoria: "" } : {}),
    }));
  }

  function validar() {
    const nuevosErrores = {};

    if (!formulario.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria.";
    } else if (formulario.descripcion.trim().length < 3) {
      nuevosErrores.descripcion = "Debe tener al menos 3 caracteres.";
    }

    const montoNumerico = Number(formulario.monto);
    if (formulario.monto === "" || isNaN(montoNumerico)) {
      nuevosErrores.monto = "Ingresa un monto válido.";
    } else if (montoNumerico <= 0) {
      nuevosErrores.monto = "El monto debe ser mayor a 0.";
    }

    if (!formulario.categoria) {
      nuevosErrores.categoria = "Selecciona una categoría.";
    }

    if (!formulario.fecha) {
      nuevosErrores.fecha = "Selecciona una fecha.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    if (!validar()) return;

    onGuardar({
      ...formulario,
      monto: Number(formulario.monto),
    });

    setFormulario(formularioVacio);
    setErrores({});
  }

  function manejarCancelar() {
    setFormulario(formularioVacio);
    setErrores({});
    onCancelarEdicion();
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h5 card-title section-title">
          <span>{transaccionEditar ? "Editar registro" : "Nuevo registro"}</span>
        </h2>

        <form onSubmit={manejarEnvio} noValidate>
          <div className="row g-3">
            {/* Tipo: ingreso o gasto */}
            <div className="col-12">
              <div className="btn-group w-100" role="group">
                <input
                  type="radio"
                  className="btn-check"
                  name="tipo"
                  id="tipo-gasto"
                  value="gasto"
                  checked={formulario.tipo === "gasto"}
                  onChange={manejarCambio}
                />
                <label
                  className="btn btn-outline-danger"
                  htmlFor="tipo-gasto"
                >
                  <i className="bi bi-arrow-down-circle me-1"></i>
                  Gasto
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="tipo"
                  id="tipo-ingreso"
                  value="ingreso"
                  checked={formulario.tipo === "ingreso"}
                  onChange={manejarCambio}
                />
                <label
                  className="btn btn-outline-success"
                  htmlFor="tipo-ingreso"
                >
                  <i className="bi bi-arrow-up-circle me-1"></i>
                  Ingreso
                </label>
              </div>
            </div>

            {/* Descripción */}
            <div className="col-md-6">
              <label htmlFor="descripcion" className="form-label">
                Descripción
              </label>
              <input
                type="text"
                className={`form-control ${
                  errores.descripcion ? "is-invalid" : ""
                }`}
                id="descripcion"
                name="descripcion"
                placeholder="Ej. Compra en supermercado"
                value={formulario.descripcion}
                onChange={manejarCambio}
              />
              {errores.descripcion && (
                <div className="invalid-feedback">{errores.descripcion}</div>
              )}
            </div>

            {/* Monto */}
            <div className="col-md-3">
              <label htmlFor="monto" className="form-label">
                Monto ($)
              </label>
              <input
                type="number"
                step="0.01"
                className={`form-control ${errores.monto ? "is-invalid" : ""}`}
                id="monto"
                name="monto"
                placeholder="0.00"
                value={formulario.monto}
                onChange={manejarCambio}
              />
              {errores.monto && (
                <div className="invalid-feedback">{errores.monto}</div>
              )}
            </div>

            {/* Fecha */}
            <div className="col-md-3">
              <label htmlFor="fecha" className="form-label">
                Fecha
              </label>
              <input
                type="date"
                className={`form-control ${errores.fecha ? "is-invalid" : ""}`}
                id="fecha"
                name="fecha"
                value={formulario.fecha}
                onChange={manejarCambio}
              />
              {errores.fecha && (
                <div className="invalid-feedback">{errores.fecha}</div>
              )}
            </div>

            {/* Categoría */}
            <div className="col-md-6">
              <label htmlFor="categoria" className="form-label">
                Categoría
              </label>
              <select
                className={`form-select ${
                  errores.categoria ? "is-invalid" : ""
                }`}
                id="categoria"
                name="categoria"
                value={formulario.categoria}
                onChange={manejarCambio}
              >
                <option value="">Selecciona una categoría</option>
                {categoriasDisponibles.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errores.categoria && (
                <div className="invalid-feedback">{errores.categoria}</div>
              )}
            </div>

            {/* Botones */}
            <div className="col-md-6 d-flex align-items-end gap-2">
              <button
                type="submit"
                className={`btn flex-fill ${
                  transaccionEditar ? "btn-warning" : "btn-primary"
                }`}
              >
                <i
                  className={`bi ${
                    transaccionEditar ? "bi-pencil-square" : "bi-plus-circle"
                  } me-1`}
                ></i>
                {transaccionEditar ? "Guardar cambios" : "Agregar registro"}
              </button>

              {transaccionEditar && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={manejarCancelar}
                >
                  Cancelar
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;
