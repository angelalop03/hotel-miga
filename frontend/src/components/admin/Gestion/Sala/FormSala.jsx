import useFetch from "../../../../hooks/useFetch";
import { useState } from "react";

export default function FormSala({ onClose, sala, onActualizado }) {

    const [idSala, setIdSala] = useState(sala?.id || "");
    const [nombreSala, setNombreSala] = useState(sala?.nombre_sala || "");
    const [descripcion, setDescripcion] = useState(sala?.descripcion || "");
    const [personasMax, setPersonasMax] = useState(sala?.personas_max || "");
    const [precio, setPrecio] = useState(sala?.precio || "");
    const [extrasSeleccionados, setExtrasSeleccionados] = useState(sala?.extras?.map(e => e.id) || []);
    const { data: extras } = useFetch(`${import.meta.env.VITE_BACKEND_URL}/extras/`);
    const esEdicion = !!sala;

    const toggleExtra = (id) => {
        setExtrasSeleccionados(prev => 
            prev.includes(id)
            ? prev.filter(e => e !== id)
            : [...prev, id]
        );
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const url = esEdicion
        ? `${import.meta.env.VITE_BACKEND_URL}/salas/${sala.id}/`
        : `${import.meta.env.VITE_BACKEND_URL}/salas/`;

    const method = esEdicion ? "PUT" : "POST";

    try {

        const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
            id: idSala,
            nombre_sala: nombreSala,    
            descripcion: descripcion,
            personas_max: personasMax,
            precio,
            extras_ids: extrasSeleccionados
        })
        });

        if(!response.ok){
        throw new Error("Error guardando sala");
        }

        if (onActualizado) {
        onActualizado();
        }      
        onClose();

    } catch(err){
        console.error(err);
        alert("Error guardando sala");
    }
    };

    return (
    <div className="popup" onClick={onClose}>
        <div className="popup-content" onClick={(e)=>e.stopPropagation()}>

        <h3>{esEdicion ? "Editar sala" : "Crear sala"}</h3>

        <form onSubmit={handleSubmit}>

            <div>
                <label>Nombre de la sala</label>
                <input
                    type="text"
                    value={nombreSala}
                    onChange={(e)=>setNombreSala(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Descripción</label>
                <input
                    type="text"
                    value={descripcion}
                    onChange={(e)=>setDescripcion(e.target.value)}
                />
            </div>

            <div>
                <label>Ocupación máxima</label>
                <input
                    type="number"
                    value={personasMax}
                    onChange={(e)=>setPersonasMax(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Precio</label>
                <input
                    type="number"
                    step="0.01"
                    value={precio}
                    onChange={(e)=>setPrecio(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Extras</label>
                <div className="popup-extras">
                    {extras?.map(extra => (
                        <label key={extra.id}>
                        <input
                            type="checkbox"
                            checked={extrasSeleccionados.includes(extra.id)}
                            onChange={() => toggleExtra(extra.id)}
                        />
                        {extra.nombre}
                        </label>
                    ))}
                </div>
            </div>
            <button className="popup-btn" type="submit">
            {esEdicion ? "Guardar cambios" : "Crear sala"}
            </button>

        </form>
        <button className="popup-btn-cerrar" onClick={onClose}>
            Cerrar
        </button>

        </div>
    </div>
    )
}