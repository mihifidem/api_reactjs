import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import ProductForm from "../Components/ProductForm";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [guardandoProducto, setGuardandoProducto] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [errorDetalle, setErrorDetalle] = useState("");

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");

        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }

        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const agregarProducto = async (nuevoProducto) => {
    setGuardandoProducto(true);

    try {
      const estaEditando = Boolean(productoEditando);
      const response = await fetch(
        estaEditando
          ? `http://localhost:4000/api/products/${productoEditando.id}`
          : "http://localhost:4000/api/products",
        {
          method: estaEditando ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoProducto),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data.message ||
          (estaEditando ? "No se pudo actualizar el producto" : "No se pudo crear el producto")
        );
      }

      const guardado = await response.json();
      setProductos((productosActuales) =>
        estaEditando
          ? productosActuales.map((producto) =>
            producto.id === guardado.id ? guardado : producto
          )
          : [...productosActuales, guardado]
      );
      setMostrarFormulario(false);
      setProductoEditando(null);
    } finally {
      setGuardandoProducto(false);
    }
  };

  const iniciarEdicion = (producto) => {
    setProductoEditando(producto);
    setMostrarFormulario(true);
  };

  const eliminarProducto = async (producto) => {
    const confirmar = window.confirm(
      `¿Seguro que quieres borrar el producto "${producto.name}"?`
    );

    if (!confirmar) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/products/${producto.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "No se pudo borrar el producto");
      }

      setProductos((productosActuales) =>
        productosActuales.filter((item) => item.id !== producto.id)
      );
      if (productoEditando?.id === producto.id) {
        setMostrarFormulario(false);
        setProductoEditando(null);
      }
      if (productoDetalle?.id === producto.id) {
        setProductoDetalle(null);
        setErrorDetalle("");
      }
    } catch (deleteError) {
      setError(deleteError.message);
    }
  };

  const verDetalleProducto = async (producto) => {
    setCargandoDetalle(true);
    setErrorDetalle("");

    try {
      const response = await fetch(`http://localhost:4000/api/products/${producto.id}`);

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.message || "No se pudo cargar el detalle del producto");
      }

      const detalle = await response.json();
      setProductoDetalle(detalle);
    } catch (detailError) {
      setProductoDetalle(null);
      setErrorDetalle(detailError.message);
    } finally {
      setCargandoDetalle(false);
    }
  };

  const cerrarDetalleProducto = () => {
    setProductoDetalle(null);
    setErrorDetalle("");
  };

  const abrirFormularioNuevo = () => {
    setProductoEditando(null);
    setMostrarFormulario((valorActual) => !valorActual);
  };

  const cerrarFormulario = () => {
    setMostrarFormulario(false);
    setProductoEditando(null);
  };

  if (loading) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  return (
    <div>
      <h1 style={{ marginLeft: "50px" }}>Productos</h1>
      <button
        onClick={abrirFormularioNuevo}
        style={{
          marginLeft: "40px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
        <IoIosAddCircleOutline />

      </button>

      {mostrarFormulario && (
        <ProductForm
          key={productoEditando?.id ?? "nuevo"}
          onSubmit={agregarProducto}
          onCancel={cerrarFormulario}
          saving={guardandoProducto}
          initialValues={productoEditando}
          title={productoEditando ? "Editar producto" : "Agregar producto"}
          submitLabel={productoEditando ? "Actualizar" : "Guardar"}
        />
      )}

      <table className="table table-striped" style={{ marginLeft: "40px", width: "80%" }}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.name}</td>
              <td>${producto.price}</td>
              <td>{producto.stock}</td>
              <td>
                <button
                  type="button"
                  onClick={() => verDetalleProducto(producto)}
                  style={{
                    backgroundColor: "#16a34a",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    marginLeft: "10px",

                  }}>
                  <FaEye />

                </button>
                <button
                  type="button"
                  onClick={() => iniciarEdicion(producto)}
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "50%",
                    cursor: "pointer",
                    marginLeft: "10px",

                  }}>
                  <FaEdit />

                </button>
                <button
                  type="button"
                  onClick={() => eliminarProducto(producto)}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",

                    borderRadius: "50%",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}>
                  <MdDeleteOutline />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {productoDetalle && (
        <div
          style={{
            marginLeft: "40px",
            marginTop: "20px",
            width: "80%",
            maxWidth: "640px",
            padding: "16px",
            borderRadius: "10px",
            border: "1px solid #bbf7d0",
            backgroundColor: "#f0fdf4",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
            <h3 style={{ margin: 0 }}>Detalle del producto</h3>
            <button
              type="button"
              onClick={cerrarDetalleProducto}
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#166534",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Cerrar
            </button>
          </div>

          {cargandoDetalle ? (
            <p style={{ marginTop: "12px" }}>Cargando detalle...</p>
          ) : errorDetalle ? (
            <p style={{ marginTop: "12px", color: "#dc2626" }}>{errorDetalle}</p>
          ) : (
            <div style={{ marginTop: "12px", display: "grid", gap: "8px" }}>
              <p style={{ margin: 0 }}><strong>ID:</strong> {productoDetalle.id}</p>
              <p style={{ margin: 0 }}><strong>Nombre:</strong> {productoDetalle.name}</p>
              <p style={{ margin: 0 }}><strong>Precio:</strong> ${productoDetalle.price}</p>
              <p style={{ margin: 0 }}><strong>Stock:</strong> {productoDetalle.stock}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Productos;
