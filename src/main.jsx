import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Bootstrap 5 (estilos + componentes con JS, como el btn-check) y los
// íconos de Bootstrap Icons usados en toda la interfaz.
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
