import { useEffect, useState } from "react";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/users");

        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }

        const data = await response.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarUsuarios();
  }, []);

  if (loading) {
    return <h2>Cargando usuarios...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h1>Usuarios</h1>

          <table className="table table-striped" style={{ marginLeft: "40px", width: "80%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.name}</td>
              <td>{usuario.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
