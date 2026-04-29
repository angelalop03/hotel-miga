import useFetch from "../../../../hooks/useFetch";
import { useState } from "react";

export default function FormHabitacion({ onClose, habitacion, onActualizado }) {

    const [numHabitacion, setNumHabitacion] = useState(habitacion?.num_habitacion || "");
    const [descripcion, setDescripcion] = useState(habitacion?.descripcion || "");
    const [numPersonas, setNumPersonas] = useState(habitacion?.num_personas || "");
    const [precio, setPrecio] = useState(habitacion?.precio || "");
    const [extrasSeleccionados, setExtrasSeleccionados] = useState(habitacion?.extras?.map(e => e.id) || []);
    const { data: extras } = useFetch("http://127.0.0.1:8000/extras/");
    const esEdicion = !!habitacion;

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
        ? `http://127.0.0.1:8000/habitaciones/${habitacion.num_habitacion}/`
        : "http://127.0.0.1:8000/habitaciones/";

    const method = esEdicion ? "PUT" : "POST";

    try {

        const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            num_habitacion: numHabitacion,
            descripcion,
            num_personas: numPersonas,
            precio,
            extras_ids: extrasSeleccionados
        })
        });

        if(!response.ok){
        throw new Error("Error guardando habitación");
        }

        if (onActualizado) {
        onActualizado();
        }      
        onClose();

    } catch(err){
        console.error(err);
        alert("Error guardando habitación");
    }
    };

    return (
    <div className="popup" onClick={onClose}>
        <div className="popup-content" onClick={(e)=>e.stopPropagation()}>

        <h3>{esEdicion ? "Editar habitación" : "Crear habitación"}</h3>

        <form onSubmit={handleSubmit}>

            <div>
                <label>Número habitación</label>
                <input
                    type="number"
                    value={numHabitacion}
                    onChange={(e)=>setNumHabitacion(e.target.value)}
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
                    value={numPersonas}
                    onChange={(e)=>setNumPersonas(e.target.value)}
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
                {extras?.map(extra => (
                    <label key={extra.id} style={{display:"block"}}>
                    <input
                        type="checkbox"
                        checked={extrasSeleccionados.includes(extra.id)}
                        onChange={() => toggleExtra(extra.id)}
                    />
                    {extra.nombre}
                    </label>
                ))}
                </div>

            <button className="btn-submit" type="submit">
            {esEdicion ? "Guardar cambios" : "Crear habitación"}
            </button>

        </form>

        </div>
    </div>
    )
}