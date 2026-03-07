import { useState } from "react";
import useFetch from "../hooks/useFetch";
import "./Espacios.css";

export default function Salas() {
  const { data, loading, error } = useFetch("http://127.0.0.1:8000/salas/");
  const [salaSeleccionada, setSalaSeleccionada] = useState(null);

  if (loading) return <p className="page-loading">Cargando...</p>;
  if (error) return <p className="page-error">Error: {String(error)}</p>;

  function SalaCard({ sala }) {
    const imageUrl = sala.image || `/sala-${sala.id}.jpg`;

    return (
      <article className="espacio-card">
        <div className="espacio-info">
          <h2 className="espacio-name">{sala.nombre_sala || "Sala"}</h2>

          <p className="espacio-meta">
            {sala.personas_max} personas maximo
          </p>

          <p className="espacio-extras">
            {sala.extras?.length
              ? sala.extras.map((e) => e.nombre).join(" | ")
              : "Wifi | TV | Aire acondicionado"}
          </p>

          <button
            className="espacio-link"
            type="button"
            onClick={() => setSalaSeleccionada(sala)}
          >
            Ver detalles
          </button>
        </div>

        <div className="espacio-imageWrap">
          <img
            className="espacio-image"
            src={imageUrl}
            alt={sala.nombre_sala || "Sala"}
            onError={(e) => {
              e.currentTarget.src = "/red-room.jpg";
            }}
          />
        </div>
      </article>
    );
  }

  return (
    <div className="espacios-page">
      <div className="espacios-hero">
        <h1 className="espacios-title">Nuestras salas</h1>

        <div className="espacios-list">
          {data?.map((sala) => (
            <SalaCard key={sala.id} sala={sala} />
          ))}
        </div>

        {salaSeleccionada && (
          <div className="popup" onClick={() => setSalaSeleccionada(null)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h2>{salaSeleccionada.nombre_sala || "Sala"}</h2>
              <p>{salaSeleccionada.descripcion || "Sin descripcion"}</p>
              <p>Precio: {salaSeleccionada.precio ?? "-"} EUR</p>

              <button type="button" onClick={() => setSalaSeleccionada(null)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
