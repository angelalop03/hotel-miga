import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import "./Habitaciones.css";
import "./HabitacionesDisponibles.css";

export default function HabitacionesDisponibles() {
  const [params] = useSearchParams();

  const entrada = params.get("entrada");
  const salida = params.get("salida");
  const personas = params.get("personas");

  const url = `http://127.0.0.1:8000/habitaciones/disponibles/?fecha_entrada=${entrada}&fecha_salida=${salida}&personas=${personas}`;

  const { data, loading, error } = useFetch(url);

  const [habitacionSeleccionada, setHabitacionSeleccionada] = useState(null);
  const [reservandoHabitacion, setReservandoHabitacion] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  if (loading) return <p className="page-loading">Cargando...</p>;
  if (error) return <p className="page-error">Error: {String(error)}</p>;

  if (data && data.length === 0) {
    return (
      <div className="message">
        <div className="message-content">
          <h2>Lo sentimos</h2>
          <p>No hay habitaciones disponibles para esas fechas.</p>
          <button onClick={() => window.history.back()}>Volver</button>
        </div>
      </div>
    );
  }

  function HabitacionCard({ habitacion }) {
    const imageUrl = habitacion.imagen || "/red-room.jpg";

    return (
      <article className="habitacion-card">
        <div className="habitacion-info">
          <h2 className="habitacion-name">{habitacion.tipo || "Habitación"}</h2>

          <p className="habitacion-meta">
            {habitacion.num_personas} personas · {habitacion.num_camas ?? "1"} cama
          </p>

          <p className="habitacion-extras">
            {habitacion.extras?.length
              ? habitacion.extras.map((e) => e.nombre).join(" | ")
              : "Wifi | TV | Aire acondicionado"}
          </p>

          <button
            className="habitacion-link"
            type="button"
            onClick={() => setHabitacionSeleccionada(habitacion)}
          >
            Ver detalles
          </button>
          <button
            className="habitacion-link"
            type="button"
            onClick={() => setReservandoHabitacion(habitacion)}
          >
            Reservar
          </button>
        </div>

        <div className="habitacion-imageWrap">
          <img className="habitacion-image" src={imageUrl} alt="Habitación" />
        </div>
      </article>
    );
  }

  return (
    <div className="habitaciones-page">
      <div className="habitaciones-hero">
        <h1 className="habitaciones-title">Nuestras habitaciones</h1>

        <div className="habitaciones-list">
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

        {reservandoHabitacion && (
          <div className="popup" onClick={() => setReservandoHabitacion(null)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h2>Reservar habitación</h2>
              <p>{reservandoHabitacion.tipo || "Habitación"}</p>
              <p>Precio: {reservandoHabitacion.precio ?? "-"} €</p>
              <form onSubmit={async (e) => {
                e.preventDefault();
                
                try {
                  const response = await fetch(
                    "http://127.0.0.1:8000/reservas/habitaciones/",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id_habitacion: reservandoHabitacion.id,
                        fecha_entrada: entrada,
                        fecha_salida: salida,
                        num_personas: personas,
                        nombre: nombre,
                        email: email,
                        telefono: telefono,
                      }),
                    }
                  );

                  if (!response.ok) {
                    throw new Error("Error al crear la reserva");
                  }

                  //const data = await response.json();

                  alert("Reserva creada correctamente");

                  setReservandoHabitacion(null);

                } 
                catch (err) {
                  console.error(err);
                  alert("Error al realizar la reserva");
                }
              }}>
                <div>
                  <label>Nombre completo:</label>
                  <input 
                    type="text" 
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>    
                <div>
                  <label>Email:</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />   
                </div>
                <div>
                  <label>Teléfono:</label>
                  <input 
                    type="tel" 
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    required
                  />
                </div>  
                <button type="submit">Confirmar reserva</button>
              </form>
              <button type="button" onClick={() => setReservandoHabitacion(null)}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}