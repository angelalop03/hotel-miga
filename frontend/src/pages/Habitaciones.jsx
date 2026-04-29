import { useState } from "react";
import useFetch from "../hooks/useFetch";
import "./Espacios.css"
import HabitacionCard from "../components/habitaciones/HabitacionCard";

export default function Habitaciones() {
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/habitaciones/`);
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  if (loading) return <p className="page-loading">Cargando...</p>;
  if (error) return <p className="page-error">Error: {String(error)}</p>;

  return (
    <div className="espacios-page">
      <div className="espacios-hero">
        <h1 className="espacios-title">Nuestras habitaciones</h1>

        <div className="espacios-list">
          {data?.map((habitacion) => (
            <HabitacionCard key={habitacion.id} habitacion={habitacion} setHabitacionSeleccionada={setHabitacionSeleccionada} />
          ))}
        </div>

        
        {habitacionSeleccionada && (
          <div className="popup" onClick={() => setHabitacionSeleccionada(null)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h2>{habitacionSeleccionada.tipo || "Habitación"}</h2>
              <p>{habitacionSeleccionada.descripcion || "Sin descripción"}</p>
              <p>Precio: {habitacionSeleccionada.precio ?? "-"} €</p>

              <button className="popup-btn" type="button" onClick={() => setHabitacionSeleccionada(null)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
