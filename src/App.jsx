import { Routes, Route, NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Acerca from "./pages/Acerca";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";
import Productos from "./pages/Productos";
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

        <Link to="/productos">
          Productos
        </Link>

   
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
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