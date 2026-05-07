import { useState, useEffect } from "react";

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try{
            const response = await fetch(url,
                {
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                }
            );
            if(!response.ok) 
                throw new Error(`HTTP error! status ${response.status}`)

            const result = await response.json();
            setData(result);
        } catch(err){
            if(err.name === "AbortError"){
                console.error("Fetch abortado, el componente se desmontó antes de recibir respuesta");
                return;
            }
            console.error("Error al obtener los datos", err.message);
            setError(err.message);
        } finally{
            setLoading(false);
        }  
    };
    
    useEffect(()=>{
        fetchData();
    }, [url]);

    return { data, loading, error, refetch: fetchData };
}