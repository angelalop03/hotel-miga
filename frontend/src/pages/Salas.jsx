import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Calendario from "../components/salas/Calendario";
import SalaCard from "../components/salas/SalaCard";
import "./Espacios.css"
import { formatearFechaAYYYYMMDD } from "../funcionesAuxiliares";

export default function Salas() {
  const { data, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/salas/`);
  const [salaSeleccionada, setSalaSeleccionada] = useState(null);
  const [reservandoSala, setReservandoSala] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [diaSeleccionado, setdiaSeleccionado] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  function cerrarReservaSala() {
    setReservandoSala(null);
    setNombre("");
    setEmail("");
    setTelefono("");
    setdiaSeleccionado(null);
    setHorarioSeleccionado("");
  }

  if (loading) return <p className="page-loading">Cargando...</p>;
  if (error) return <p className="page-error">Error: {String(error)}</p>;

  async function onSubmit(e){
    e.preventDefault();

    if (!diaSeleccionado || !horarioSeleccionado) {
      alert("Selecciona un dia y un horario para la reserva");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/reservas/salas/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id_sala: reservandoSala.id,
            fecha: formatearFechaAYYYYMMDD(diaSeleccionado.toLocaleDateString()),
            horario: horarioSeleccionado,
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

      cerrarReservaSala();
    } 
    catch (err) {
      console.error(err);
      alert("Error al realizar la reserva");
    }
  }

  return (
    <div className="espacios-page">
      <div className="espacios-hero">
        <h2 className="espacios-title">Nuestras salas</h2>

        <div className="espacios-list">
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

              <button className="popup-btn-cerrar" type="button" onClick={() => setSalaSeleccionada(null)}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {reservandoSala && (
          <div className="popup" onClick={cerrarReservaSala}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h2>Reservar sala: {reservandoSala.nombre_sala}</h2>
              <Calendario 
                key={reservandoSala.id}
                sala={reservandoSala}
                diaSeleccionado={diaSeleccionado}
                setdiaSeleccionado={setdiaSeleccionado}
                horarioSeleccionado={horarioSeleccionado}
                setHorarioSeleccionado={setHorarioSeleccionado} />
  
              <form onSubmit={onSubmit}>  
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
                <button className="popup-btn" type="submit">Confirmar reserva</button>
              </form>
              <button className="popup-btn-cerrar" onClick={cerrarReservaSala}>
                Cerrar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
