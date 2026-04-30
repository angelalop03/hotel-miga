import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useMemo } from "react"
import useFetch from "../../hooks/useFetch";
import { es } from "react-day-picker/locale";
import SelectHorario from "./SelectHorario";
import "./Calendario.css";
import { formatearFechaAYYYYMMDD, formatearFechaADate } from "../../funcionesAuxiliares";


export default function Calendario({sala, diaSeleccionado, setdiaSeleccionado, horarioSeleccionado, setHorarioSeleccionado}){
    const { data, loading, error } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/reservas/salas/ocupado/${sala.id}/`);

    const { parcial, completo } = useMemo(() => {
        // En la primera ejecucion data esta vacio porque esta esperando al backend
        if (!Array.isArray(data)) {
            return { parcial: [], completo: [] };
        }

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

        return { parcial: auxParciales, completo: auxCompletos };
    }, [data])

    const horariosOcupados = useMemo(() => {
        // Cuando se cambia el dia seleccionado hay que calcular que horarios estan
        // disponibles lo que modifica el select y desabilita algunas opciones
        let ocupados = []
        if(diaSeleccionado && Array.isArray(data)){
            data.forEach(item => {
                if(item.fecha == formatearFechaAYYYYMMDD(diaSeleccionado.toLocaleDateString()))
                    ocupados.push(item.horario);
            }) 
        }

        return ocupados;
    }, [diaSeleccionado, data])

    function seleccionarDia(dia) {
        setdiaSeleccionado(dia);
        setHorarioSeleccionado("");
    }

    if(loading)
        return <p className="page-loading">Cargando ...</p>;
    if(error)
        return <p className="page-error">Error {error}</p>;


    return (
        <div className="container-calendario">
            
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
                onSelect = {seleccionarDia}
            />

            {<SelectHorario value={horarioSeleccionado} setHorario={setHorarioSeleccionado} horariosOcupados={horariosOcupados}/>}
        </div>
    )
}
       
