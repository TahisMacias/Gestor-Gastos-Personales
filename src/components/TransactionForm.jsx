import { useState, useEffect } from "react";
import { CATEGORIAS_INGRESO, CATEGORIAS_GASTO, METODOS_PAGO } from "../data/categories";
import { fechaHoy } from "../utils/helpers";

// Estado inicial "vacío" del formulario, reutilizado tanto al montar
// el componente como después de guardar o cancelar una edición.
const formularioVacio = {
  tipo: "gasto",
  descripcion: "",
  monto: "",
  categoria: "",
  categoriaOtro: "",
  metodoPago: "",
  metodoPagoOtro: "",
  fecha: fechaHoy(),
};

// Formulario único que sirve tanto para CREAR una transacción nueva
// como para EDITAR una existente (props.transaccionEditar).
function TransactionForm({ onGuardar, transaccionEditar, onCancelarEdicion }) {
  const [formulario, setFormulario] = useState(formularioVacio);
  const [errores, setErrores] = useState({});

  // Cuando el usuario pulsa "Editar" en un elemento de la lista,
  // el formulario se rellena con los datos de esa transacción. Si la
  // categoría o el método de pago guardados no están en las listas
  // predefinidas, es porque el usuario escribió algo personalizado en
  // "Otros" — en ese caso se selecciona "Otros" y se recupera el texto.
  useEffect(() => {
    if (transaccionEditar) {
      const categoriasProbables =
        transaccionEditar.tipo === "ingreso" ? CATEGORIAS_INGRESO : CATEGORIAS_GASTO;

      const categoriaEsPersonalizada =
        transaccionEditar.categoria &&
        !categoriasProbables.includes(transaccionEditar.categoria);

      const metodoEsPersonalizado =
        transaccionEditar.metodoPago &&
        !METODOS_PAGO.includes(transaccionEditar.metodoPago);

      setFormulario({
        ...transaccionEditar,
        categoria: categoriaEsPersonalizada ? "Otros" : transaccionEditar.categoria,
        categoriaOtro: categoriaEsPersonalizada ? transaccionEditar.categoria : "",
        metodoPago: metodoEsPersonalizado ? "Otro" : transaccionEditar.metodoPago,
        metodoPagoOtro: metodoEsPersonalizado ? transaccionEditar.metodoPago : "",
      });
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
      ...(name === "tipo" ? { categoria: "", categoriaOtro: "" } : {}),
      // Si deja de estar en "Otros" / "Otro", se limpia el texto libre.
      ...(name === "categoria" && value !== "Otros" ? { categoriaOtro: "" } : {}),
      ...(name === "metodoPago" && value !== "Otro" ? { metodoPagoOtro: "" } : {}),
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
    } else if (montoNumerico > 100000) {
      nuevosErrores.monto = "El monto no puede superar $100,000.";
    }

    if (!formulario.categoria) {
      nuevosErrores.categoria = "Selecciona una categoría.";
    } else if (formulario.categoria === "Otros" && !formulario.categoriaOtro.trim()) {
      nuevosErrores.categoriaOtro = "Escribe el nombre de la categoría.";
    }

    if (!formulario.metodoPago) {
      nuevosErrores.metodoPago = "Selecciona un método de pago.";
    } else if (formulario.metodoPago === "Otro" && !formulario.metodoPagoOtro.trim()) {
      nuevosErrores.metodoPagoOtro = "Escribe el método de pago.";
    }

    if (!formulario.fecha) {
      nuevosErrores.fecha = "Selecciona una fecha.";
    } else if (formulario.fecha > fechaHoy()) {
      nuevosErrores.fecha = "La fecha no puede ser futura.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  }

  function manejarEnvio(evento) {
    evento.preventDefault();

    if (!validar()) return;

    // Si se eligió "Otros"/"Otro", se guarda el texto que escribió el
    // usuario en vez de la palabra genérica.
    const categoriaFinal =
      formulario.categoria === "Otros" && formulario.categoriaOtro.trim()
        ? formulario.categoriaOtro.trim()
        : formulario.categoria;

    const metodoPagoFinal =
      formulario.metodoPago === "Otro" && formulario.metodoPagoOtro.trim()
        ? formulario.metodoPagoOtro.trim()
        : formulario.metodoPago;

    // categoriaOtro y metodoPagoOtro son solo campos de apoyo del
    // formulario; no se guardan en la transacción final.
    const { categoriaOtro, metodoPagoOtro, ...datosBase } = formulario;

    onGuardar({
      ...datosBase,
      categoria: categoriaFinal,
      metodoPago: metodoPagoFinal,
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
                <i className="bi bi-pencil text-muted"></i>
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
                <i className="bi bi-cash text-muted"></i>
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
                <i className="bi bi-calendar-event text-muted"></i>
                Fecha
              </label>
              <input
                type="date"
                className={`form-control ${errores.fecha ? "is-invalid" : ""}`}
                id="fecha"
                name="fecha"
                value={formulario.fecha}
                max={fechaHoy()}
                onChange={manejarCambio}
              />
              {errores.fecha && (
                <div className="invalid-feedback">{errores.fecha}</div>
              )}
            </div>

            {/* Categoría */}
            <div className="col-md-6">
              <label htmlFor="categoria" className="form-label">
                <i className="bi bi-tag text-muted"></i>
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

            {/* Categoría personalizada (solo si eligió "Otros") */}
            {formulario.categoria === "Otros" && (
              <div className="col-md-6 campo-personalizado">
                <label htmlFor="categoriaOtro" className="form-label">
                  Especifica la categoría
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errores.categoriaOtro ? "is-invalid" : ""
                  }`}
                  id="categoriaOtro"
                  name="categoriaOtro"
                  placeholder="Ej. Mascotas"
                  value={formulario.categoriaOtro}
                  onChange={manejarCambio}
                />
                {errores.categoriaOtro && (
                  <div className="invalid-feedback">{errores.categoriaOtro}</div>
                )}
              </div>
            )}

            {/* Método de pago */}
            <div className="col-md-6">
              <label htmlFor="metodoPago" className="form-label">
                <i className="bi bi-wallet2 text-muted"></i>
                Método de pago
              </label>
              <select
                className={`form-select ${
                  errores.metodoPago ? "is-invalid" : ""
                }`}
                id="metodoPago"
                name="metodoPago"
                value={formulario.metodoPago}
                onChange={manejarCambio}
              >
                <option value="">Selecciona un método de pago</option>
                {METODOS_PAGO.map((metodo) => (
                  <option key={metodo} value={metodo}>
                    {metodo}
                  </option>
                ))}
              </select>
              {errores.metodoPago && (
                <div className="invalid-feedback">{errores.metodoPago}</div>
              )}
            </div>

            {/* Método de pago personalizado (solo si eligió "Otro") */}
            {formulario.metodoPago === "Otro" && (
              <div className="col-md-6 campo-personalizado">
                <label htmlFor="metodoPagoOtro" className="form-label">
                  Especifica el método de pago
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    errores.metodoPagoOtro ? "is-invalid" : ""
                  }`}
                  id="metodoPagoOtro"
                  name="metodoPagoOtro"
                  placeholder="Ej. Vale de comida"
                  value={formulario.metodoPagoOtro}
                  onChange={manejarCambio}
                />
                {errores.metodoPagoOtro && (
                  <div className="invalid-feedback">{errores.metodoPagoOtro}</div>
                )}
              </div>
            )}

            {/* Botones */}
            <div className="col-12 d-flex align-items-end gap-2">
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
