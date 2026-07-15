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
import Usuarios from "./pages/Usuarios";
import Pedidos from "./pages/Pedidos";
import Footer from "./Components/Footer";

const estiloBase = {
  textDecoration: "none",
  marginRight: "20px",
};

const estiloNav = ({ isActive }) => ({
  ...estiloBase,
  color: isActive ? "#2563eb" : "#333",
  fontWeight: isActive ? "bold" : "normal",
});

export default function App() {
  return (
    <>

      <nav style={{ marginLeft: "40px" }}>
        <NavLink to="/" end style={estiloNav}>
          Inicio |
        </NavLink>

        <NavLink to="/acerca" style={estiloNav}>
          Acerca |
        </NavLink>

        <NavLink to="/contacto" style={estiloNav}>
          Contacto |
        </NavLink>

        <NavLink to="/registro" style={estiloNav}>
          Registro |
        </NavLink>

        <NavLink to="/login" style={estiloNav}>
          Login |
        </NavLink>

        <Link to="/productos" style={estiloBase}>
          Productos |
        </Link>

        <Link to="/usuarios" style={estiloBase}>
          Usuarios |
        </Link>

        <Link to="/pedidos" style={estiloBase}>
          Pedidos |
        </Link>

   
      </nav>

      <hr />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />

        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/pedidos" element={<Pedidos />} />
        <Route path="/acerca" element={<Acerca />} />
        <Route path="/contacto" element={<Contacto />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}