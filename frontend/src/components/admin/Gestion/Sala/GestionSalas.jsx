import { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import ItemSala from "./ItemSala"
import FormSala from "./FormSala";

export default function GestionSalas(){
    const { data:salas, loading, error, refetch } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/salas/`);
    const [salaEditando, setSalaEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    
    const abrirCrear = () => {
        setSalaEditando(null);
        setMostrarFormulario(true);
    };

    const abrirEditar = (habitacion) => {
        setSalaEditando(habitacion);
        setMostrarFormulario(true);
    };

    return (
        <>
            <h2>Gestionar Salas</h2>

            <button className="button-pop-up" onClick={abrirCrear}>
                Crear sala
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Ocupación máxima</th>
                        <th>Precio</th>
                        <th>Extras</th>
                        <th>Administrar</th>
                    </tr>  
                </thead>
                <tbody>
                    {salas?.map(sala => (
                        <ItemSala 
                            sala = {sala} 
                            key={sala.id}
                            onEditar={() => abrirEditar(sala)}
                            onActualizado={refetch}
                        />
                    ))}
                </tbody>
            </table>

            {mostrarFormulario && (
                <FormSala
                    sala={salaEditando}
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