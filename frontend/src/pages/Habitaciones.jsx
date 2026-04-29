import { useState } from "react";
import useFetch from "../hooks/useFetch";
import HabitacionCard from "../components/habitaciones/HabitacionCard";

export default function Habitaciones() {
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/habitaciones/`);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  if (loading) return <p className="page-loading">Cargando...</p>;
  if (error) return <p className="page-error">Error: {String(error)}</p>;

  return (
    <div>
      <div>
        <h1>Nuestras habitaciones</h1>

        <div>
          {data?.map((habitacion) => (
            <HabitacionCard key={habitacion.id} habitacion={habitacion} />
          ))}
        </div>

        
        {habitacionSeleccionada && (
          <div className="popup" onClick={() => setHabitacionSeleccionada(null)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h2>{habitacionSeleccionada.tipo || "Habitación"}</h2>
              <p>{habitacionSeleccionada.descripcion || "Sin descripción"}</p>
              <p>Precio: {habitacionSeleccionada.precio ?? "-"} €</p>

              <button type="button" onClick={() => setHabitacionSeleccionada(null)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
