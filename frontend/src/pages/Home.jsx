import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const [entrada, setEntrada] = useState("");
  const [salida, setSalida] = useState("");
  const [personas, setPersonas] = useState(1);

  const navigate = useNavigate();

  const buscarHabitacionesDisponibles = (e) => {
    e.preventDefault();

    if (!entrada || !salida || !personas) {
      alert("Debes rellenar fecha de entrada, salida y número de personas.");
      return;
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaEntrada = new Date(entrada);
    fechaEntrada.setHours(0, 0, 0, 0);

    if (fechaEntrada < hoy) {
      alert("La fecha de entrada no puede ser anterior a hoy.");
      return;
    }

    if (new Date(salida) <= new Date(entrada)) {
      alert("La fecha de salida debe ser posterior a la de entrada.");
      return;
    }

    navigate(
      `/habitaciones-disponibles?entrada=${entrada}&salida=${salida}&personas=${personas}`
    );
  };

  return (
    <div className="buscador">
      <form onSubmit={buscarHabitacionesDisponibles}>
        <div>
          <label>Entrada:</label>
          <input
            type="date"
            value={entrada}
            required
            onChange={(e) => setEntrada(e.target.value)}
          />
        </div>

        <div>
          <label>Salida:</label>
          <input
            type="date"
            value={salida}
            required
            onChange={(e) => setSalida(e.target.value)}
          />
        </div>

        <div>
          <label>Número de personas:</label>
          <input
            type="number"
            min="1"
            value={personas}
            required
            onChange={(e) => setPersonas(e.target.value)}
          />
        </div>

        <button type="submit">Buscar</button>
      </form>
    </div>
  );
}