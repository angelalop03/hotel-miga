import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <h1>Hotel Miga</h1>
      <Link to="/">
        <button>Inicio</button>
      </Link>
      <Link to="/habitaciones">
        <button>Ver habitaciones</button>
      </Link>
      <Link to="/salas">
        <button>Ver salas y habitaciones</button>
      </Link>
      <Link to="/login">
        <button>Admin Login</button>
      </Link>
    </div>
  );
}