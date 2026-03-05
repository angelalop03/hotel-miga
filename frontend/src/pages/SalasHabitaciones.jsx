import useFetch from "../hooks/useFetch";
import Calendario from "../components/salas/Calendario";

export default function SalasHabitaciones() {
  const { data, loading, error } = useFetch("http://127.0.0.1:8000/habitaciones/");
  const { data: salas, loading: loadingSalas, error: errorSalas } = useFetch("http://127.0.0.1:8000/salas/");

  if (loading || loadingSalas)
    return <p>Cargando ...</p>;

  if (error)
    return <p>Error {error}</p>;

  if (errorSalas)
    return <p>Error {errorSalas}</p>;

  return (
    <>
      <h1>Hotel Miga</h1>

      {data?.map((habitacion) => (
        <article key={habitacion.id}>
          <h2>Número de habitación: {habitacion.num_habitacion}</h2>
          <p>Precio por noche: {habitacion.precio}</p>
          <p>Número de personas: {habitacion.num_personas}</p>
          <p>{habitacion.descripcion}</p>

          <h3>Extras</h3>
          <ul>
            {habitacion.extras?.map((extra) => (
              <li key={extra.id}>{extra.nombre}</li>
            ))}
          </ul>
        </article>
      ))}

      {salas?.map((sala) => (
        <article key={sala.id}>
          <h2>Nombre de la sala: {sala.nombre_sala}</h2>
          <p>Precio: {sala.precio}</p>
          <p>Aforo máximo: {sala.personas_max}</p>
          <p>{sala.descripcion}</p>

          <h3>Extras</h3>
          <ul>
            {sala.extras?.map((extra) => (
              <li key={extra.id}>{extra.nombre}</li>
            ))}
          </ul>
        </article>
      ))}

      {salas && salas.length > 0 && (
        <Calendario sala={salas[0]} />
      )}
    </>
  );
}