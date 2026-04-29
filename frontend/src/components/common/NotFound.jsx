import { Link } from "react-router-dom";
import "./NotFound.css"

export default function NotFound() {
  return (
    <div className="not-found">
        <h1>404 - Página no encontrada</h1>
        <Link to="/">Volver al inicio</Link>
    </div>
  );
}