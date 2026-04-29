import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <nav className="main-nav">
      <h1>Hotel Miga</h1>
      <div className="nav-btn">
        <Link to="/">
          <button>Inicio</button>
        </Link>
        <Link to="/habitaciones">
          <button>Ver habitaciones</button>
        </Link>
        <Link to="/salas">
          <button>Ver Salas</button>
        </Link>
        <Link to="/login">
          <button>Admin Login</button>
        </Link>
      </div>
      
    </nav>
  );
}