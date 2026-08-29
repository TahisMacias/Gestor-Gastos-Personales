import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SearchBar from "./components/SearchBar";
import Filter from "./components/Filter";
import Statistics from "./components/Statistics";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { generarId } from "./utils/helpers";
import "./App.css";

function App() {
  // Las transacciones se guardan directamente en LocalStorage gracias
  // al hook personalizado: cada cambio de estado se persiste solo.
  const [transacciones, setTransacciones] = useLocalStorage(
    "gestor-gastos:transacciones",
    []
  );

  const [transaccionEditar, setTransaccionEditar] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtros, setFiltros] = useState({ tipo: "todos", categoria: "" });

  // --- CRUD ---

  function agregarTransaccion(datos) {
    const nueva = { ...datos, id: generarId() };
    setTransacciones((anterior) => [nueva, ...anterior]);
  }

  function actualizarTransaccion(datos) {
    setTransacciones((anterior) =>
      anterior.map((t) => (t.id === datos.id ? datos : t))
    );
    setTransaccionEditar(null);
  }

  function guardarTransaccion(datos) {
    if (transaccionEditar) {
      actualizarTransaccion(datos);
    } else {
      agregarTransaccion(datos);
    }
  }

  function eliminarTransaccion(id) {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este registro? Esta acción no se puede deshacer."
    );
    if (!confirmar) return;

    setTransacciones((anterior) => anterior.filter((t) => t.id !== id));

    // Si se elimina el registro que se estaba editando, se cierra el
    // formulario de edición para evitar un estado inconsistente.
    if (transaccionEditar?.id === id) {
      setTransaccionEditar(null);
    }
  }

  function iniciarEdicion(transaccion) {
    setTransaccionEditar(transaccion);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelarEdicion() {
    setTransaccionEditar(null);
  }

  // --- Búsqueda + filtros combinados ---
  // useMemo evita recalcular la lista filtrada en cada render si ni
  // las transacciones ni los criterios de búsqueda/filtro cambiaron.
  const transaccionesFiltradas = useMemo(() => {
    return transacciones.filter((t) => {
      const coincideBusqueda = t.descripcion
        .toLowerCase()
        .includes(busqueda.toLowerCase());

      const coincideTipo = filtros.tipo === "todos" || t.tipo === filtros.tipo;

      const coincideCategoria =
        !filtros.categoria || t.categoria === filtros.categoria;

      return coincideBusqueda && coincideTipo && coincideCategoria;
    });
  }, [transacciones, busqueda, filtros]);

  const balance = useMemo(() => {
    return transacciones.reduce(
      (acumulado, t) =>
        t.tipo === "ingreso" ? acumulado + t.monto : acumulado - t.monto,
      0
    );
  }, [transacciones]);

  return (
    <>
      <Navbar balance={balance} />

      <main className="container pb-5">
        <TransactionForm
          onGuardar={guardarTransaccion}
          transaccionEditar={transaccionEditar}
          onCancelarEdicion={cancelarEdicion}
        />

        <Statistics transacciones={transacciones} />

        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h5 card-title mb-3">Historial de movimientos</h2>

            <div className="row g-2 mb-3">
              <div className="col-md-5">
                <SearchBar
                  busqueda={busqueda}
                  onCambiarBusqueda={setBusqueda}
                />
              </div>
              <div className="col-md-7">
                <Filter filtros={filtros} onCambiarFiltros={setFiltros} />
              </div>
            </div>

            <TransactionList
              transacciones={transaccionesFiltradas}
              onEditar={iniciarEdicion}
              onEliminar={eliminarTransaccion}
            />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default App;
