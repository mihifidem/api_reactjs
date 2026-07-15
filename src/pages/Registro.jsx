import { useNavigate } from "react-router-dom";

export default function Registro() {

  const navigate = useNavigate();

  function guardarUsuario() {

    alert("Usuario registrado correctamente");

    navigate("/");

  }

  return (

    <>
      <h1>Registro</h1>

      <button onClick={guardarUsuario}>
        Guardar
      </button>
       <button onClick={() => navigate(-1)}>
        Volver
      </button>

    </>

  );

}