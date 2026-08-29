# Gestión de Gastos Personales

Aplicación web para registrar ingresos y gastos, clasificarlos por
categorías y visualizar estadísticas relacionadas con el presupuesto
personal.

Proyecto de Front-End — Carrera de Desarrollo de Software (CENESTUR).

## Tecnologías utilizadas

- HTML5 (etiquetas semánticas)
- CSS3
- JavaScript ES6+
- Bootstrap 5 + Bootstrap Icons
- React 19 (Hooks: `useState`, `useEffect`, `useMemo`)
- Vite
- LocalStorage (persistencia de datos)
- Git y GitHub

## Funcionalidades

- **CRUD completo**: agregar, editar y eliminar registros de ingresos
  y gastos.
- **Categorías**: cada tipo de transacción tiene su propio listado de
  categorías (ej. Salario, Alimentación, Transporte, etc.).
- **Búsqueda**: filtro en tiempo real por descripción.
- **Filtros**: por tipo (ingreso/gasto) y por categoría, combinables
  con la búsqueda.
- **Estadísticas**: total de ingresos, total de gastos, balance
  general y distribución porcentual de gastos por categoría.
- **Persistencia**: los datos se guardan automáticamente en
  `localStorage`, por lo que no se pierden al recargar la página.
- **Validaciones**: descripción obligatoria (mínimo 3 caracteres),
  monto numérico mayor a 0, categoría y fecha obligatorias.
- **Diseño responsivo** con Bootstrap 5 (funciona en móvil, tablet y
  escritorio).

## Estructura del proyecto

```
gestor-gastos/
├── index.html
├── package.json
├── src/
│   ├── main.jsx              # Punto de entrada, importa Bootstrap
│   ├── App.jsx                # Componente principal (estado global)
│   ├── App.css / index.css    # Estilos
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── TransactionForm.jsx   # Formulario (crear/editar)
│   │   ├── TransactionList.jsx   # Tabla de registros
│   │   ├── TransactionItem.jsx   # Fila individual
│   │   ├── SearchBar.jsx
│   │   ├── Filter.jsx
│   │   └── Statistics.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js    # Hook de persistencia
│   ├── data/
│   │   └── categories.js         # Categorías y colores
│   └── utils/
│       └── helpers.js            # Formateo de moneda, fecha, ids
```

## Instalación y uso

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```
   Abrir la URL que muestra la terminal (por defecto
   `http://localhost:5173`).
3. Generar la versión de producción:
   ```bash
   npm run build
   ```
4. Previsualizar la build de producción:
   ```bash
   npm run preview
   ```

## Modelo de datos

Cada transacción se guarda con la siguiente forma:

```json
{
  "id": "m0k3x9ab",
  "tipo": "gasto",
  "descripcion": "Compra en supermercado",
  "monto": 45.5,
  "categoria": "Alimentación",
  "fecha": "2026-08-29"
}
```

## Autor

Britany Tahis Macías Tapuy — Tecnología Superior en Desarrollo de
Software, CENESTUR.
