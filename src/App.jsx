import { Routes, Route, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Acerca from "./pages/Acerca";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";
import Producto from "./pages/Producto";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const estilo = ({ isActive }) => ({
  textDecoration: "none",
  marginRight: "20px",
  color: isActive ? "#2563eb" : "#333",
  fontWeight: isActive ? "bold" : "normal",
});

export default function App() {
  return (
    <>
      <nav>
        <NavLink to="/" end style={estilo}>
          Inicio
        </NavLink>

        <NavLink to="/acerca" style={estilo}>
          Acerca
        </NavLink>

        <NavLink to="/contacto" style={estilo}>
          Contacto
        </NavLink>

           <NavLink to="/registro" style={estilo}>
          Registro
        </NavLink>

        <NavLink to="/login" style={estilo}>
          Login
        </NavLink>

         <Link to="/producto/1">
    Producto 1
</Link>

<Link to="/producto/2">
    Producto 2
</Link>

<Link to="/producto/3">
    Producto 3
</Link>
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/contacto" element={<Contacto />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}