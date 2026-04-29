export default function ItemSala({sala, onEditar, onActualizado}){

    const borrarSala = async () => {
        if (!window.confirm("¿Confirma que desea eliminar esta sala?")) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/salas/${sala.id}/`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error eliminando sala");
            }

            onActualizado();

        } catch(err) {
            console.error(err);
            alert("Error eliminando sala");
        }
    };

    return (
        <tr>
            <td>{sala.id}</td>
            <td>{sala.nombre_sala}</td>
            <td>{sala.descripcion}</td>
            <td>{sala.personas_max}</td>
            <td>{sala.precio}</td>
            <td>{sala.extras?.map(e => e.nombre).join(", ")}</td>
            <td>
                <button onClick={() => onEditar(sala)}>
                    Editar
                </button>

                <button onClick={borrarSala}>
                    Borrar
                </button>
            </td>            
        </tr>
    )
}