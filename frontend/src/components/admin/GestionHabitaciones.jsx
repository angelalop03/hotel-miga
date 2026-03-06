import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ItemHabitacion from "./ItemHabitacion"
import FormHabitacion from "./FormHabitacion";

export default function GestionHabitaciones(){
    const { data:habitaciones, loading, error, refetch } = useFetch("http://127.0.0.1:8000/habitaciones/");
    const [habitacionEditando, setHabitacionEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    
    const abrirCrear = () => {
        setHabitacionEditando(null);
        setMostrarFormulario(true);
    };

    const abrirEditar = (habitacion) => {
        setHabitacionEditando(habitacion);
        setMostrarFormulario(true);
    };

    return (
        <>
            <h2>Gestionar Habitaciones</h2>

            <button onClick={abrirCrear}>
                Crear habitación
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Número</th>
                        <th>Descripción</th>
                        <th>Ocupación máxima</th>
                        <th>Precio</th>
                        <th>Extras</th>
                        <th>Administrar</th>
                    </tr>  
                </thead>
                <tbody>
                    {habitaciones?.map(habitacion => (
                        <ItemHabitacion 
                            habitacion = {habitacion} 
                            key={habitacion.id}
                            onEditar={() => abrirEditar(habitacion)}
                            onActualizado={refetch}
                        />
                    ))}
                </tbody>
            </table>

            {mostrarFormulario && (
                <FormHabitacion
                    habitacion={habitacionEditando}
                    onClose={() => setMostrarFormulario(false)}
                    onActualizado={() => {
                        setMostrarFormulario(false);
                        refetch();
                    }}
                />
            )}
        </>
    )
}