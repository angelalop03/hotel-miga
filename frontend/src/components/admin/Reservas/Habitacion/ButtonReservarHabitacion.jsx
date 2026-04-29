import { useEffect, useState } from "react"

export default function ButtonReservarHabitacion({id_reserva, estadoOriginal}){
    const [estado, setEstado] = useState(estadoOriginal);

    // Función para enviar la confirmación o cancelación al backend
    const enviarConfirmacion = (nuevoEstado) => async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/reservas/habitaciones/estado/${id_reserva}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
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