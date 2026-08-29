// Barra de navegación superior. Recibe el balance actual como prop
// para mostrarlo siempre visible, sin importar en qué parte de la
// página se encuentre el usuario.
function Navbar({ balance }) {
  const esPositivo = balance >= 0;

  return (
    <nav className="navbar navbar-dark ledger-navbar shadow-sm mb-4">
      <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2">
        <span className="navbar-brand mb-0 h1 d-flex align-items-center gap-2">
          <i className="bi bi-journal-bookmark-fill" style={{ color: "var(--gold)" }}></i>
          Gestión de Gastos Personales
        </span>
        <span
          className={`balance-badge badge fs-6 px-3 py-2 ${
            esPositivo ? "bg-success" : "bg-danger"
          }`}
        >
          Balance: {balance.toLocaleString("es-EC", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
