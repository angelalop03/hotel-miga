import ButtonReservarSala from "./ButtonReservarSala"

export default function ItemReservaSala({reserva}){
    return (
        <tr>
            <td>{reserva.id}</td>
            <td>{reserva.nombre_sala}</td>
            <td>{reserva.fecha}</td>
            <td>{reserva.horario}</td>
            <td>{reserva.nombre}</td>
            <td>{reserva.email}</td>
            <td>{reserva.telefono}</td>
            <ButtonReservarSala estadoOriginal={reserva.estado} id_reserva={reserva.id}/>
        </tr>
    )
}
