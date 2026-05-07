import { useEffect, useState } from "react"

export default function ButtonReservarSala({id_reserva, estadoOriginal}){
    const [estado, setEstado] = useState(estadoOriginal);

    // Función para enviar la confirmación o cancelación al backend
    const enviarConfirmacion = (nuevoEstado) => async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reservas/salas/estado/${id_reserva}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ estado: nuevoEstado })
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || "Error al actualizar el estado de la reserva");
            }
            setEstado(nuevoEstado);
        }
        catch (error) {
            console.error("Error al actualizar el estado de la reserva:", error);
            return;
        }
    }

    useEffect(() => {
        setEstado(estadoOriginal);
    }, [estadoOriginal])
    
    if(estado == "pendiente"){
        return (
            <td>            
                <button
                    onClick={enviarConfirmacion("confirmado")}
                >
                    Confirmar
                </button>
                <button
                    onClick={enviarConfirmacion("cancelado")}
                >
                    Rechazar
                </button>
            </td>
        )
    } else{
        return (
            <td>{estado}</td>
        )
    }
}