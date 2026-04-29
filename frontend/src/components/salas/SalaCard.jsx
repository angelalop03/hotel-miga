export default function SalaCard({ sala, setSalaSeleccionada, setReservandoSala }) {
    const imageUrl = sala.image || `/sala-${sala.id}.jpg`;

    return (
      <article>
        <div>
          <h2>{sala.nombre_sala || "Sala"}</h2>

          <p>
            {sala.personas_max} personas maximo
          </p>

          <p>
            {sala.extras?.length
              ? sala.extras.map((e) => e.nombre).join(" | ")
              : "Wifi | TV | Aire acondicionado"}
          </p>

          <button            
            type="button"
            onClick={() => setSalaSeleccionada(sala)}
          >
            Ver detalles
          </button>
        </div>

        <div>
          <img
            src={imageUrl}
            alt={sala.nombre_sala || "Sala"}
            onError={(e) => {
              e.currentTarget.src = "/red-room.jpg";
            }}
          />
        </div>

        <button
            type="button"
            onClick={() => setReservandoSala(sala)}
          >
            Reservar
          </button>
      </article>
    );
  }