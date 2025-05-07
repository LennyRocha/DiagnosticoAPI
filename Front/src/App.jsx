import { useState } from "react";
import ClienteTabla from "./Components/cliente/ClienteTabla";
import ClienteRegistro from "./Components/cliente/ClienteRegistro";
import ClienteEditar from "./Components/cliente/ClienteEditar";
import ClienteDatos from "./Components/cliente/ClienteDatos";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [componente, setComponente] = useState("Tabla");

  function getComponente(tit) {
    switch (tit) {
      case "Tabla":
        return <ClienteTabla setComponente={setComponente} />;
      case "Registro":
        return <ClienteRegistro setComponente={setComponente} />;
      case "Editar":
        return <ClienteEditar setComponente={setComponente} />;
      case "Datos":
        return <ClienteDatos setComponente={setComponente} />;
      default:
        return <ClienteTabla setComponente={setComponente} />;
    }
  }

  return (
    <div id="main">
      <header>
          <h1>Gestión de clientes</h1>
      </header>
      {getComponente(componente)}
      <footer>
        <p>
        <a href="https://lordicon.com/">Icons by Lordicon.com</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
