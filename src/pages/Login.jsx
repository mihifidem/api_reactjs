import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  function iniciarSesion() {

    alert("Bienvenido");

    navigate("/dashboard");

  }

  return (

    <>

      <h1>Login</h1>

      <button onClick={iniciarSesion}>
        Iniciar Sesión
      </button>

    </>

  );

}