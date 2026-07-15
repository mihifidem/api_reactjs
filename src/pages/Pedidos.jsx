import { useEffect, useState } from "react";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/orders");

        if (!response.ok) {
          throw new Error("Error al obtener los pedidos");
        }

        const data = await response.json();
        setPedidos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, []);

  if (loading) {
    return <h2>Cargando pedidos...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h1>Pedidos</h1>

          <table className="table table-striped" style={{ marginLeft: "40px", width: "80%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.user_name}</td>
              <td>{pedido.status}</td>
              <td>{pedido.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Pedidos;
