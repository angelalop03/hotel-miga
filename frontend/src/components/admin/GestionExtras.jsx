import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import ItemExtra from "./ItemExtra"
import FormExtra from "./FormExtra";

export default function GestionExtras(){
    const { data:extras, loading, error, refetch } = useFetch("http://127.0.0.1:8000/extras/");
    const [extraEditando, setExtraEditando] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    
    const abrirCrear = () => {
        setExtraEditando(null);
        setMostrarFormulario(true);
    };

    const abrirEditar = (extra) => {
        setExtraEditando(extra);
        setMostrarFormulario(true);
    };

    return (
        <>
            <h2>Gestionar Extras</h2>

            <button onClick={abrirCrear}>
                Crear extra
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>                        
                        <th>Administrar</th>
                    </tr>  
                </thead>
                <tbody>
                    {extras?.map(extra => (
                        <ItemExtra 
                            extra = {extra} 
                            key={extra.id}
                            onEditar={() => abrirEditar(extra)}
                            onActualizado={refetch}
                        />
                    ))}
                </tbody>
            </table>

            {mostrarFormulario && (
                <FormExtra
                    extra={extraEditando}
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