import { useState } from "react";
import "./Home.css";

export default function Home() {
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [personas, setPersonas] = useState(1);

  const buscarHabitacionesDisponibles = (e) => {
    e.preventDefault();

    console.log("Buscar habitaciones con:");
    console.log("Entrada:", entrada);
    console.log("Salida:", salida);
    console.log("Personas:", personas);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <form onSubmit={buscarHabitacionesDisponibles} style={{ marginTop: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label>Fecha de entrada:</label>
          <br />
          <input
            type="date"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Fecha de salida:</label>
          <br />
          <input
            type="date"
            value={salida}
            onChange={(e) => setSalida(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Número de personas:</label>
          <br />
          <input
            type="number"
            min="1"
            value={personas}
            onChange={(e) => setPersonas(e.target.value)}
          />
        </div>

        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}