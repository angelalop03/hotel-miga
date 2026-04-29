import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Calendario from "../components/salas/Calendario";
import SalaCard from "../components/salas/SalaCard";

export default function Salas() {
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/salas/`);
  const [salaSeleccionada, setSalaSeleccionada] = useState(null);
  const [reservandoSala, setReservandoSala] = useState(null);

  if (loading) return <p className="page-loading">Cargando...</p>;
  if (error) return <p className="page-error">Error: {String(error)}</p>;

  return (
    <div className="salas-page">
      <div className="salas-wrapper">
        <h2 className="salas-title">Nuestras salas</h2>

        <div className="salas-grid">
          {data?.map((sala) => (
            <SalaCard
              key={sala.id}
              sala={sala}
              setReservandoSala={setReservandoSala}
              setSalaSeleccionada={setSalaSeleccionada}
            />
          ))}
        </div>

        {salaSeleccionada && (
          <div className="popup" onClick={() => setSalaSeleccionada(null)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h3>{salaSeleccionada.nombre_sala || "Sala"}</h3>
              <p>{salaSeleccionada.descripcion || "Sin descripcion"}</p>
              <p>Precio: {salaSeleccionada.precio ?? "-"} EUR</p>

              <button className="popup-btn" type="button" onClick={() => setSalaSeleccionada(null)}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {reservandoSala && (
          <div className="popup" onClick={() => setReservandoSala(null)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <Calendario sala={reservandoSala} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}