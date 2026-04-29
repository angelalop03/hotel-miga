export default function HabitacionCard({ habitacion, setHabitacionSeleccionada }) {
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