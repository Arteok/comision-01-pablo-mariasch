import { useContext, useState } from "react";
import { API_URL } from "../utils/consts";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const NewPublicacion = () => {
  const [title, setTitle] = useState("");
  const [descripcion, setDescripcion] = useState(""); // Nuevo estado para descripción
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(`${API_URL}/playlist`, {
      method: "POST",
      headers: {
        Authorization: auth.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, descripcion }), // Incluye la descripción en el cuerpo
    }).then((res) => {
      if (res.status !== 201)
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 2500,
        });

      setTitle("");
      setDescripcion(""); // Limpia también la descripción después de enviar
      navigate("/playlist");
    });
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center mt-4">
      <h1 className="text-center">Nueva Publicación</h1>
      <form className="d-flex mt-4" onSubmit={handleSubmit}>
        <div className="form-floating">
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            placeholder="Lugar de la Publicación"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="title">Lugar</label>
        </div>
        <div className="form-floating">
          <textarea
            name="descripcion"
            className="form-control"
            id="descripcion"
            placeholder="Descripción de la Publicación"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <label htmlFor="descripcion">Descripción </label>
        </div>
        <button type="submit" className="btn btn-success m-1">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewPublicacion;