import useFetch from "../../../../hooks/useFetch";
import ItemReservaSala from "./ItemReservaSala";

export default function GestionReservasSalas(){
    const { data:reservas, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/reservas/salas/`);
    
    return (
        <>
            <h2>Gestionar Reservas de salas</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Id de la reserva</th>
                            <th>Nombre de la sala</th>
                            <th>Fecha</th>
                            <th>Horario</th>
                            <th>Nombre de contacto</th>
                            <th>Email de contacto</th>
                            <th>Teléfono de contacto</th>
                            <th>Estado</th>
                        </tr>  
                    </thead>
                    <tbody>
                        {/* Primero mostrar las pendientes */}
                        {reservas?.sort((a, b) => {
                            if (a.estado === "pendiente" && b.estado !== "pendiente") return -1;
                            if (a.estado !== "pendiente" && b.estado === "pendiente") return 1;
                            return 0;
                        }).map(reserva => (
                            <ItemReservaSala reserva = {reserva} key={reserva.id}/>
                        ))}
                    </tbody>
                </table>
            </div>            
        </>
    )
}