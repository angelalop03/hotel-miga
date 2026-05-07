export default function ItemHabitacion({habitacion, onEditar, onActualizado}){

    const borrarHabitacion = async () => {
        if (!window.confirm("¿Confirma que desea eliminar esta habitación?")) {
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/habitaciones/${habitacion.num_habitacion}/`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                throw new Error("Error eliminando habitación");
            }

            onActualizado();

        } catch(err) {
            console.error(err);
            alert("Error eliminando habitación");
        }
    };

    return (
        <tr>
            <td>{habitacion.id}</td>
            <td>{habitacion.num_habitacion}</td>
            <td>{habitacion.descripcion}</td>
            <td>{habitacion.num_personas}</td>
            <td>{habitacion.precio}</td>
            <td>{habitacion.extras.map(e => e.nombre).join(", ")}</td>
            <td>
                <button onClick={() => onEditar(habitacion)}>
                    Editar
                </button>

                <button onClick={borrarHabitacion}>
                    Borrar
                </button>
            </td>            
        </tr>
    )
}