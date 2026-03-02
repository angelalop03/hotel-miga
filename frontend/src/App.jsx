import useFetch from "./hooks/useFetch";
import './App.css'

function App() {
  const { data, loading, error } = useFetch("http://127.0.0.1:8000/habitaciones/");
  if(loading)
    return <p>Cargando ...</p>;
  if(error)
    return <p>Error {error}</p>;

  return (
    <>
      <h1>Hotel Miga</h1>     

      {data?.map((habitacion) => (
        <article key={data.id}>
          <h2>Número de habitación: {habitacion.num_habitacion}</h2>
          <p>Precio por noche: {habitacion.precio}</p>
          <p>Número de personas: {habitacion.num_personas}</p>
          <p>{habitacion.descripcion}</p>
          <h3>Extras</h3>
          <ul>
            {habitacion.extras?.map((extras) => (
              <li>{extras.nombre}</li>
            ))}
          </ul>
        </article>
      ))}
    </>    
  )
}

export default App
