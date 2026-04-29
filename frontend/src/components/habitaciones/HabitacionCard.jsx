export default function HabitacionCard({ habitacion }) {
    const imageUrl = habitacion.imagen || "/red-room.jpg";

    return (
        <article>
            <div>
                <h2>{habitacion.tipo || "Habitación"}</h2>

                <p>
                {habitacion.num_personas} personas · {habitacion.num_camas ?? "1"} cama
                </p>

                <p>
                {habitacion.extras?.length
                    ? habitacion.extras.map((e) => e.nombre).join(" | ")
                    : "Wifi | TV | Aire acondicionado"}
                </p>

                <button
                type="button"
                onClick={() => setHabitacionSeleccionada(habitacion)}
                >
                Ver detalles
                </button>
            </div>

            <div>
                <img src={imageUrl} alt="Habitación" />
            </div>
        </article>
    );
}