import useFetchAutenticado from "../../../../hooks/useFetchAutenticado";
import ItemReservaHabitacion from "./ItemReservaHabitacion";

export default function GestionReservasHabitaciones(){
    const { data:reservas, loading, error } = useFetchAutenticado(`${import.meta.env.VITE_BACKEND_URL}/reservas/habitaciones/`);
    
    return (
        <>
            <h2>Gestionar Reservas de habitaciones</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Id de la reserva</th>
                            <th>Id habitación</th>
                            <th>Num habitación</th>
                            <th>Fecha entrada</th>
                            <th>Fecha salida</th>
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
                            <ItemReservaHabitacion reserva = {reserva} key={reserva.id}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}