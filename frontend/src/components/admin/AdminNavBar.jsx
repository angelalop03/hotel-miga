import { Link } from "react-router-dom";
import "./AdminNavBar.css";

export default function AdminNavBar() {
  return (
    <nav className="adminNav">
      <Link to="habitaciones">
        <button>Gestionar habitaciones</button>
      </Link>
      <Link to="salas">
        <button>Gestionar salas</button>
      </Link>
      <Link to="extras">
        <button>Gestionar extras</button>
      </Link>
      <Link to="reservas-salas">
        <button>Gestionar reservas de salas</button>
      </Link>
    </nav>
  );
}