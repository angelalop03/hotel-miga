export default function SalaCard({ sala, setSalaSeleccionada, setReservandoSala }) {
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

        <button
            className="espacio-btn"
            type="button"
            onClick={() => setReservandoSala(sala)}
          >
            Reservar
          </button>
      </article>
    );
  }