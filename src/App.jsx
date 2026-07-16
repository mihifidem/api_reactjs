import { Routes, Route, NavLink } from "react-router-dom";
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

const estiloNav = ({ isActive }) => ({
  color: isActive ? "#05151d" : "rgba(232, 255, 254, 0.8)",
  background: isActive ? "linear-gradient(135deg, #5eead4, #38bdf8)" : "transparent",
  boxShadow: isActive ? "0 12px 28px rgba(56, 189, 248, 0.18)" : "none",
});

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-shell__header">
        <div className="app-shell__brand">
          <span className="app-shell__brand-mark">BT</span>
          <div>
            <strong>Blue Turquoise</strong>
            <span>Tech interface</span>
          </div>
        </div>

        <nav className="app-shell__nav" aria-label="Principal">
        <NavLink to="/" end style={estiloNav}>
          Inicio
        </NavLink>

        <NavLink to="/acerca" style={estiloNav}>
          Acerca
        </NavLink>

        <NavLink to="/contacto" style={estiloNav}>
          Contacto
        </NavLink>

        <NavLink to="/registro" style={estiloNav}>
          Registro
        </NavLink>

        <NavLink to="/login" style={estiloNav}>
          Login
        </NavLink>

        <NavLink to="/productos" style={estiloNav}>
          Productos
        </NavLink>

        <NavLink to="/usuarios" style={estiloNav}>
          Usuarios
        </NavLink>

        <NavLink to="/pedidos" style={estiloNav}>
          Pedidos
        </NavLink>
        </nav>
      </header>

      <main className="app-shell__content">
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
      </main>

      <Footer />
    </div>
  );
}