import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useEffect, useState } from "react"
import useFetch from "../../hooks/useFetch";
import { es } from "react-day-picker/locale";
import SelectHorario from "./SelectHorario";
import { formatearFechaAYYYYMMDD, formatearFechaADate } from "../../funcionesAuxiliares";


export default function Calendario({sala}){
    const [diaSeleccionado, setdiaSeleccionado] = useState(null);
    const [parcial, setParcial] = useState([]);
    const [completo, setCompleto] = useState([]);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
    const [horariosOcupados, setHorariosOcupados] = useState([]);

    const { data, loading, error } = useFetch(`http://127.0.0.1:8000/reservas/salas/ocupado/${sala.id}/`);

    function irFormularioReserva(){
        console.log(`Sala: ${sala.id} - Dia: ${formatearFechaAYYYYMMDD(diaSeleccionado.toLocaleDateString())} - horario: ${horarioSeleccionado}`)
        // Crear el componente con el formulario para reservar la sala
        return
    }

    useEffect(() => {
        // En la primera ejecucion data esta vacio porque esta esperando al backend
        if (!Array.isArray(data)) return;

        // Crear una estructura de datos con cada dia y su numero de reservas
        const contador = {}
        data?.forEach(({ fecha }) => {
            contador[fecha] = (contador[fecha] || 0) + 1;
        });
        
        const auxParciales = [];
        const auxCompletos = [];

        // Seleccionar las fechas que esten ocupadas ya sea completamente
        // o parcialmente
        for(const fecha in contador){
            const fechaFormateada = formatearFechaADate(fecha)
            if(contador[fecha] === 3){
                auxCompletos.push(fechaFormateada);
            } else {
                auxParciales.push(fechaFormateada);
            }
        }

        setCompleto(auxCompletos);
        setParcial(auxParciales);
    }, [data])

    useEffect(() => {
        // Cuando se cambia el dia seleccionado hay que calcular que horarios estan
        // disponibles lo que modifica el select y desabilita algunas opciones
        let ocupados = []
        setHorarioSeleccionado("");
        if(diaSeleccionado){
            data.forEach(item => {
                if(item.fecha == formatearFechaAYYYYMMDD(diaSeleccionado.toLocaleDateString()))
                    ocupados.push(item.horario);
            }) 
            setHorariosOcupados(ocupados);   
        }

    }, [diaSeleccionado])

    if(loading)
        return <p>Cargando ...</p>;
    if(error)
        return <p>Error {error}</p>;


    return (
        <>
            <h2>Reservar sala: {sala.nombre_sala}</h2>
            <DayPicker
                modifiers = {{
                    completo: completo,
                    parcial: parcial
                }}
                modifiersClassNames = {{
                    completo: "calendario-completo",
                    parcial: "calendario-parcial"
                }}
                disabled = {completo}
                animate
                locale= {es}
                mode = "single"
                selected = {diaSeleccionado}
                onSelect = {setdiaSeleccionado}
            />

            {<SelectHorario value={horarioSeleccionado} setHorario={setHorarioSeleccionado} horariosOcupados={horariosOcupados}/>}
            
            <button onClick={irFormularioReserva} disabled={!horarioSeleccionado}>Reservar</button>
        </>
    )
}
       