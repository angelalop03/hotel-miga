
export default function SelectHorario({ value, setHorario, horariosOcupados }){
    const horarios = [
        {
            valor: "mañana",
            str: "Mañana"
        },
        {
            valor: "mediodia",
            str: "Mediodía"
        },
        {
            valor: "noche",
            str: "Noche"
        }];

    return (
        <>
            <select
                name="select-horarios"
                id="select-horarios"
                value={value}
                onChange={(e) => setHorario(e.target.value)}
            >
                <option value="">Selecciona un horario disponible</option>
                {horarios.map(item => {
                    const estaOcupado = horariosOcupados.includes(item.valor);
                    return (
                        <option
                            key={item.valor}
                            value={item.valor}
                            disabled={estaOcupado}
                        >
                            {item.str}
                        </option>
                    )
                })}
            </select>
        </>
    )
}