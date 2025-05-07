import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/ClienteTabla.css";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

export default function ClienteTabla({ setComponente }) {
  // define "lord-icon" custom element with default properties
  defineElement(lottie.loadAnimation);

  const api_url = import.meta.env.VITE_API_URL;
  const [lista, setLista] = useState([]);
  const [id, setId] = useState(0);
  const [cambio, setCambio] = useState(false);
  const [cliente, setCliente] = useState({});
  const [mensaje, setMensaje] = useState("");
  const [control, setControl] = useState(false);
  useEffect(() => {
    axios
      .get(api_url)
      .then((res) => setLista(res.data))
      .catch((err) => console.error(err));
  }, [cambio]);
  function showDiag(cliente) {
    setCliente(cliente);
    document.getElementById("editarDialog").showModal();
  }
  function unshowDiag() {
    setCliente({});
    document.getElementById("editarDialog").close();
  }
  function showDiag2(id) {
    setId(id);
    document.getElementById("eliminarDialog").showModal();
  }
  function unshowDiag2() {
    setId(0);
    document.getElementById("eliminarDialog").close();
  }
  function showExito(mensaje) {
    setMensaje(mensaje);
    document.getElementById("exitoDialog").showModal();
  }
  function unshowExito() {
    setMensaje("");
    document.getElementById("exitoDialog").close();
    setCambio(!cambio);
    unshowDiag();
    unshowDiag2();
  }
  function showError(mensaje) {
    setMensaje(mensaje);
    document.getElementById("falloDialog").showModal();
  }
  function unshowError() {
    setMensaje("");
    document.getElementById("falloDialog").close();
    if (!control) {
      unshowDiag();
      unshowDiag2();
    }
  }
  function deleteCliente() {
    axios
      .delete(`${api_url}/${id}`)
      .then((res) => {
        showExito(res.data);
      })
      .catch((err) => {
        console.error("Error", err.response.data.message);
        showError(err.response.data.message);
      })
      .finally(() => unshowDiag2());
  }
  function editarCliente(e) {
    e.preventDefault();
    if (e.target.nombre.value === "") {
      showError("Campo de nombre vacio");
      setControl(true);
      return;
    } else if (e.target.apellidos.value === "") {
      showError("Campo de apellidos vacio");
      setControl(true);
      return;
    } else if (e.target.fechaNacimiento.value === "") {
      showError("Campo de fecha de nacimiento vacio");
      setControl(true);
      return;
    }
    if ((e.target.nombre.value.match(/[^a-zA-Z\s]/g) || []).length !== 0) {
      showError("Tu nombre no puede incluir carácteres especiales ni números");
      setControl(true);
      return;
    }
    if ((e.target.apellidos.value.match(/[^a-zA-Z\s]/g) || []).length !== 0) {
      showError(
        "Tus apellidos no pueden incluir carácteres especiales ni números"
      );
      setControl(true);
      return;
    }
    setControl(false);
    axios
      .put(`${api_url}/${cliente.id}`, {
        nombre: e.target.nombre.value,
        apellidos: e.target.apellidos.value,
        fechaNacimiento: e.target.fechaNacimiento.value,
        curp: e.target.curp.value,
      })
      .then((res) => {
        console.log(res.data, "¡Exito!");
        showExito("¡Usuario actualizado!");
      })
      .catch((err) => {
        console.error("Error", err.response.data.message);
        showError(err.response.data.message);
      });
  }
  return (
    <div className="tabla-div">
      <h4>Clientes registrados</h4>
      <table className="clientes-tabla">
        <thead>
          <tr id="theadId">
            <td>Nombres</td>
            <td>Apellidos</td>
            <td>Fecha de nacimiento</td>
            <td>CURP</td>
            <td>Editar</td>
            <td>Eliminar</td>
          </tr>
        </thead>
        <tbody>
          {lista.map((l) => {
            return (
              <tr key={l.id}>
                <td>{l.nombre}</td>
                <td>{l.apellidos}</td>
                <td>{l.fechaNacimiento}</td>
                <td>{l.curp}</td>
                <td>
                  <button className="edit-btn" onClick={() => showDiag(l)}>
                    Editar
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => showDiag2(l.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button className="boton-prof" onClick={() => setComponente("Registro")}>
        Registrar cliente
      </button>
      <dialog id="editarDialog" className="quitarScroll">
        <lord-icon
          src="src\assets\LordIcon\lapiz.json"
          trigger="loop"
          stroke="bold"
          state="trash-in"
          colors="primary:#242424,secondary:#c71f16"
          style={{ width: "10rem", height: "10rem" }}
        ></lord-icon>
        <h2>Editar cliente</h2>
        <form onSubmit={(e) => editarCliente(e)}>
          <input
            className="regis-input"
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={cliente.nombre}
            onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
          />

          <input
            className="regis-input"
            type="text"
            placeholder="Apellidos"
            name="apellidos"
            value={cliente.apellidos}
            onChange={(e) =>
              setCliente({ ...cliente, apellidos: e.target.value })
            }
          />

          <input
            className="regis-input"
            type="date"
            placeholder="Fecha de nacimiento"
            name="fechaNacimiento"
            max={new Date().toISOString().split("T")[0]}
            value={cliente.fechaNacimiento}
            onChange={(e) =>
              setCliente({ ...cliente, fechaNacimiento: e.target.value })
            }
          />

          <input
            className="regis-input"
            type="text"
            placeholder="Curp"
            name="curp"
            value={cliente.curp}
          />

          <div className="btn-grupo">
            <input type="submit" value="Actualizar" className="boton-prof" />
            <input
              type="button"
              value="Cerrar"
              className="boton-prof"
              onClick={() => unshowDiag()}
            />
          </div>
        </form>
      </dialog>
      <dialog id="eliminarDialog" className="quitarScroll">
        <lord-icon
          src="src\assets\LordIcon\basura.json"
          trigger="loop"
          stroke="bold"
          state="trash-in"
          colors="primary:#242424,secondary:#c71f16"
          style={{ width: "10rem", height: "10rem" }}
        ></lord-icon>
        <h2>¿Eliminar cliente?</h2>
        <p>{cliente.nombre}</p>
        <button onClick={() => deleteCliente()} className="delete-btn pad-1">
          Si
        </button>
        <button onClick={() => unshowDiag2()} className="delete-btn pad-1">
          No
        </button>
      </dialog>

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
