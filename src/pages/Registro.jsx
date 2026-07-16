import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
export default function Registro() {

  const navigate = useNavigate();

  function guardarUsuario() {

    alert("Usuario registrado correctamente");

    navigate("/");

  }

  return (

    <>
<Header
      colorbg="lightgrey"
      color="black"
      
      title_small="Registro"
      title="Regístrate para acceder a todas las funcionalidades"
    />
      <button onClick={guardarUsuario}>
        Guardar
      </button>
       <button onClick={() => navigate(-1)}>
        Volver
      </button>

    </>

  );

}