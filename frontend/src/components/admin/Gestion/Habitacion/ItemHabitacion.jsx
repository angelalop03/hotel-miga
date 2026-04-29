export default function ItemHabitacion({habitacion, onEditar, onActualizado}){

    const borrarHabitacion = async () => {
        if (!window.confirm("¿Confirma que desea eliminar esta habitación?")) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/habitaciones/${habitacion.num_habitacion}/`, {
                method: "DELETE"
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