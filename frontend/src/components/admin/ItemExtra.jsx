export default function ItemExtra({extra, onEditar, onActualizado}){

    const borrarExtra = async () => {
        if (!window.confirm("¿Confirma que desea eliminar este extra?")) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8000/extras/${extra.id}/`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("Error eliminando extra");
            }

            onActualizado();

        } catch(err) {
            console.error(err);
            alert("Error eliminando extra");
        }
    };

    return (
        <tr>
            <td>{extra.id}</td>
            <td>{extra.nombre}</td>
            <td>
                <button onClick={() => onEditar(extra)}>
                    Editar
                </button>

                <button onClick={borrarExtra}>
                    Borrar
                </button>
            </td>            
        </tr>
    )
}