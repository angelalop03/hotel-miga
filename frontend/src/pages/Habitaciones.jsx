import { useState } from "react";
import useFetch from "../hooks/useFetch";
import "./Espacios.css";

export default function Habitaciones() {
  const { data, loading, error } = useFetch("http://127.0.0.1:8000/habitaciones/");
  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);

  if (loading) return <p className="page-loading">Cargando...</p>;
  if (error) return <p className="page-error">Error: {String(error)}</p>;

  function HabitacionCard({ habitacion }) {
    const imageUrl = habitacion.imagen || "/red-room.jpg";

    return (
      <article className="espacio-card">
        <div className="espacio-info">
          <h2 className="espacio-name">{habitacion.tipo || "Habitación"}</h2>

          <p className="espacio-meta">
            {habitacion.num_personas} personas · {habitacion.num_camas ?? "1"} cama
          </p>

          <p className="espacio-extras">
            {habitacion.extras?.length
              ? habitacion.extras.map((e) => e.nombre).join(" | ")
              : "Wifi | TV | Aire acondicionado"}
          </p>

          <button
            className="espacio-link"
            type="button"
            onClick={() => setHabitacionSeleccionada(habitacion)}
          >
            Ver detalles
          </button>
        </div>

        <div className="espacio-imageWrap">
          <img className="espacio-image" src={imageUrl} alt="Habitación" />
        </div>
      </article>
    );
  }

  return (
    <div className="espacios-page">
      <div className="espacios-hero">
        <h1 className="espacios-title">Nuestras habitaciones</h1>

        <div className="espacios-list">
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
