import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Inicio() {

  const navigate = useNavigate();

  function irContacto() {
    navigate("/contacto");
  }

  return (

    <>
    <Header />
      <h1>Página Inicio</h1>

      <button onClick={irContacto}>
        Ir a Contacto
      </button>

    </>

  );

}