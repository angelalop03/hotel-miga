import useFetch from "../../../../hooks/useFetch";
import ItemReservaHabitacion from "./ItemReservaHabitacion";

export default function GestionReservasHabitaciones(){
    const { data:reservas, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/reservas/habitaciones/`);
    
    return (
        <>
            <h2>Gestionar Reservas de habitaciones</h2>
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
                    {reservas?.map(reserva => (
                        <ItemReservaHabitacion reserva = {reserva} key={reserva.id}/>
                    ))}
                </tbody>
                 
            </table>
        </>
    )
}