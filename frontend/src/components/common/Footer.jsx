import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div>
        <h3>Hotel Miga</h3>

        <p>
          By <strong>M</strong>íchel Acosta, <strong>Í</strong>ñigo Uribarri, <strong>G</strong>onzalo Martínez &amp; <strong>Á</strong>ngela López.          
        </p>

        <p>
          © {new Date().getFullYear()} Hotel Miga
        </p>
      </div>
    </footer>
  );
}