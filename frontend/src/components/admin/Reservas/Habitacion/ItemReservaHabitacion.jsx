import ButtonReservarHabitacion from "./ButtonReservarHabitacion"

export default function ItemReservaHabitacion({reserva}){
    return (
        <tr>
            <td>{reserva.id}</td>
            <td>{reserva.id_habitacion}</td>
            <td>{reserva.num_habitacion}</td>
            <td>{reserva.fecha_entrada}</td>
            <td>{reserva.fecha_salida}</td>
            <td>{reserva.nombre}</td>
            <td>{reserva.email}</td>
            <td>{reserva.telefono}</td>
            <ButtonReservarHabitacion estadoOriginal={reserva.estado} id_reserva={reserva.id}/>
        </tr>
    )
}
