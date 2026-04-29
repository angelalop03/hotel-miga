import { Link, useLocation  } from "react-router-dom";
import "./AdminNavBar.css";

export default function AdminNavBar() {
  const location = useLocation();

  
  return (
    <nav className="admin-nav">
      <Link to="habitaciones">
        <button className={location.pathname === "/admin/habitaciones" ? "activo" : ""}>
          Gestionar habitaciones
        </button>
      </Link>
      <Link to="salas">
        <button className={location.pathname === "/admin/salas" ? "activo" : ""}>
          Gestionar salas
        </button>
      </Link>
      <Link to="extras">
        <button className={location.pathname === "/admin/extras" ? "activo" : ""}>
          Gestionar extras
        </button>
      </Link>
      <Link to="reservas-salas">
        <button className={location.pathname === "/admin/reservas-salas" ? "activo" : ""}>
          Gestionar reservas de salas
        </button>
      </Link>
      <Link to="reservas-habitaciones">
        <button className={location.pathname === "/admin/reservas-habitaciones" ? "activo" : ""}>
          Gestionar reservas de habitaciones
        </button>
      </Link>
    </nav>
  );
}