function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light text-center py-3 mt-5">
      <div className="container">
        <small>
          &copy; {anioActual} Gestión de Gastos Personales — Britany Tahis Macías Tapuy
        </small>
      </div>
    </footer>
  );
}

export default Footer;
