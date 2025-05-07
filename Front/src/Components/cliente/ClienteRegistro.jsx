import React, { useState } from "react";
import axios from "axios";
import "../../css/ClienteRegistro.css";

export default function ClienteRegistro({ setComponente }) {
  const api_url = import.meta.env.VITE_API_URL;
  const [mensaje, setMensaje] = useState("");
  const registrarCliente = (e) => {
    e.preventDefault();

    if(   e.target.nombre.value  === ""){
        showError();
        setMensaje("Campo de nombre vacio");
        return;
    } else if(   e.target.apellidos.value  === ""){
        showError();
        setMensaje("Campo de apellidos vacio");
        return;
    } else if(   e.target.fechaNacimiento.value  === ""){
        showError();
        setMensaje("Campo de fecha de nacimiento vacio");
        return;
    } else if(   e.target.curp.value  === ""){
        showError();
        setMensaje("Campo de curp vacio");
        return;
    }
    if ((e.target.nombre.value.match(/[^a-zA-Z\s]/g) || []).length !== 0) {
        showError();
        setMensaje("Tu nombre no puede incluir carácteres especiales ni números");
        return;
      }
      if ((e.target.apellidos.value.match(/[^a-zA-Z\s]/g) || []).length !== 0) {
        showError();
        setMensaje("Tus apellidos no pueden incluir carácteres especiales ni números");
        return;
      }      

    axios
      .post(api_url, {
        nombre: e.target.nombre.value,
        apellidos: e.target.apellidos.value,
        fechaNacimiento: e.target.fechaNacimiento.value,
        curp: e.target.curp.value,
      })
      .then((res) => {
        setMensaje("¡Cliente registrado exitosamente!")
        showExito()
        console.log(res.data, "¡Exito!");
      })
      .catch((err) => {
        console.error("Error", err, err.response.data.message);
        setMensaje(`¡¡${ err, err.response.data.message}!`);
        if (err.response.data.message.includes("Duplicate entry")) {
            setMensaje("¡La curp ingresada ya existe!");
        }
        showError();
      });
  };
  function showError (){
    document.getElementById("falloDialog").showModal();
  }
  function unshowError (){
    document.getElementById("falloDialog").close();
  }
  function showExito() {
    document.getElementById("exitoDialog").showModal();
  }
  function unshowExito (){
    document.getElementById("exitoDialog").close();
    setComponente("Tabla");
  }
  return (
    <div>
      <h4>Registrar cliente</h4>
      <form onSubmit={(e) => registrarCliente(e)}>
        <input
          className="regis-input"
          type="text"
          placeholder="Nombre"
          name="nombre"
        />
        <input
          className="regis-input"
          type="text"
          placeholder="Apellidos"
          name="apellidos"
        />
        <input
          className="regis-input"
          type="date"
          placeholder="Fecha de nacimiento"
          name="fechaNacimiento"
          max={new Date().toISOString().split("T")[0]}
        />
        <input
          className="regis-input"
          type="text"
          placeholder="Curp"
          name="curp"
        />
        <div className="btn-grupo">
          <input type="submit" value="Registrar" className="boton-prof" />
          <input
            type="button"
            value="Salir"
            className="boton-prof"
            onClick={() => setComponente("Tabla")}
          />
        </div>
      </form>
      <dialog id="exitoDialog" className="quitarScroll">
        <lord-icon
          src="src\assets\LordIcon\exito.json"
          trigger="loop"
          stroke="bold"
          state="trash-in"
          colors="primary:#242424,secondary:#c71f16"
          style={{ width: "10rem", height: "10rem" }}
        ></lord-icon>
        <h2>Operación exitosa</h2>
        <h5>{mensaje}</h5>
        <button onClick={() => unshowExito()} className="delete-btn pad-1">
          Cerrar
        </button>
      </dialog>

      <dialog id="falloDialog" className="quitarScroll">
        <lord-icon
          src="src\assets\LordIcon\fallo.json"
          trigger="loop"
          stroke="bold"
          state="trash-in"
          colors="primary:#242424,secondary:#c71f16"
          style={{ width: "10rem", height: "10rem" }}
        ></lord-icon>
        <h2>Operación fallida</h2>
        <h5>{mensaje}</h5>
        <button onClick={() => unshowError()} className="delete-btn pad-1">
          Cerrar
        </button>
      </dialog>
    </div>
  );
}
