import useFetch from "../../../../hooks/useFetch";
import { useState } from "react";

export default function FormExtra({ onClose, extra, onActualizado }) {

    const [idExtra, setIdExtra] = useState(extra?.id || "");
    const [nombreExtra, setNombreExtra] = useState(extra?.nombre || "");    
    const esEdicion = !!extra;
    
    const handleSubmit = async (e) => {
    e.preventDefault();

    const url = esEdicion
        ? `http://127.0.0.1:8000/extras/${idExtra}/`
        : "http://127.0.0.1:8000/extras/";

    const method = esEdicion ? "PUT" : "POST";

    try {

        const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idExtra,
            nombre: nombreExtra,    
        })
        });

        if(!response.ok){
        throw new Error("Error guardando extra");
        }

        if (onActualizado) {
        onActualizado();
        }      
        onClose();

    } catch(err){
        console.error(err);
        alert("Error guardando extra");
    }
    };

    return (
    <div className="popup" onClick={onClose}>
        <div className="popup-content" onClick={(e)=>e.stopPropagation()}>

        <h3>{esEdicion ? "Editar extra" : "Crear extra"}</h3>

        <form onSubmit={handleSubmit}>

            <div>
                <label>Nombre del extra</label>
                <input
                    type="text"
                    value={nombreExtra}
                    onChange={(e)=>setNombreExtra(e.target.value)}
                    required
                />
            </div>            

            <button className="btn-submit" type="submit">
            {esEdicion ? "Guardar cambios" : "Crear extra"}
            </button>

        </form>

        </div>
    </div>
    )
}