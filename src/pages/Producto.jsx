import { useParams } from "react-router-dom";

export default function Producto() {

  const { id } = useParams();

  return (
    <>
      <h1>Detalle del Producto</h1>

      <h2>ID: {id}</h2>
    </>
  );

}