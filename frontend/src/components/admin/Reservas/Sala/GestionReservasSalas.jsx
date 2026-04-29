import useFetch from "../../../../hooks/useFetch";
import ItemReservaSala from "./ItemReservaSala";

export default function GestionReservasSalas(){
    const { data:reservas, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/reservas/salas/`);
    
    return (
        <>
            <h2>Gestionar Reservas de salas</h2>
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
                    {reservas?.map(reserva => (
                        <ItemReservaSala reserva = {reserva} key={reserva.id}/>
                    ))}
                </tbody>
                 
            </table>
        </>
    )
}