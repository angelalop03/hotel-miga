# Hotel Miga

Hotel Miga es una aplicacion full stack para gestionar la oferta de un hotel: habitaciones, salas, extras y reservas. El proyecto esta dividido en dos partes principales:

- `backend/`: API REST desarrollada con Django y Django REST Framework.
- `frontend/`: aplicacion React desarrollada con Vite.

La aplicacion permite consultar habitaciones y salas disponibles desde la parte publica, realizar reservas y acceder a una zona de administracion para gestionar habitaciones, salas, extras y reservas.

## Decisiones Tecnicas

### Frontend

El frontend esta construido con React y Vite. Se eligio Vite porque ofrece una configuracion ligera, arranque rapido en desarrollo y una integracion sencilla con herramientas modernas de testing como Vitest.

Las rutas se gestionan con `react-router-dom`. La aplicacion tiene paginas publicas, como inicio, habitaciones, salas y login, y una seccion de administracion bajo la ruta `/admin`.

Las llamadas al backend se hacen con `fetch`. Para reutilizar parte de esa logica existen hooks propios como `useFetch` y `useFetchAutenticado`. La URL del backend se configura mediante la variable de entorno:

```env
VITE_BACKEND_URL=http://127.0.0.1:8000
```

### Backend

El backend esta desarrollado con Django y Django REST Framework. La API se organiza en varias apps:

- `habitacion`: gestion y consulta de habitaciones.
- `sala`: gestion y consulta de salas.
- `extras`: gestion de extras asociados a habitaciones y salas.
- `reservas`: reservas de habitaciones y salas.
- `accounts`: endpoints relacionados con autenticacion.

La autenticacion principal usa tokens de Django REST Framework. El login del frontend llama al endpoint `/auth/`, que devuelve un token si las credenciales son correctas.

### Base De Datos

En desarrollo se usa SQLite, con el archivo:

```txt
backend/db.sqlite3
```

Esta decision simplifica el arranque del proyecto, ya que no es necesario levantar un servidor externo de base de datos. Aun asi, el archivo `requirements.txt` incluye `mysqlclient`, por lo que el proyecto podria adaptarse a MySQL cambiando la configuracion de `DATABASES` en Django.

Los modelos principales son:

- `Habitacion`: numero, precio, ocupacion maxima, descripcion y extras.
- `Sala`: nombre, precio, capacidad, descripcion y extras.
- `ReservaHabitacion`: habitacion, fechas, datos del cliente y estado.
- `ReservaSala`: sala, fecha, horario, datos del cliente y estado.
- `Extras`: servicios adicionales reutilizables.

## Requisitos

Para ejecutar el proyecto necesitas tener instalado:

- Python 3
- Node.js y npm

En Windows, si PowerShell bloquea `npm`, se puede usar `npm.cmd` en lugar de `npm`.

## Ejecutar El Backend

Desde la raiz del proyecto:

```powershell
cd backend
```

Crear y activar un entorno virtual, si no existe:

```powershell
python -m venv .venv
.\.venv\Scripts\activate
```

Instalar dependencias:

```powershell
pip install -r requirements.txt
```

Aplicar migraciones:

```powershell
python manage.py migrate
```

Arrancar el servidor:

```powershell
python manage.py runserver
```

El backend quedara disponible en:

```txt
http://127.0.0.1:8000
```

## Ejecutar El Frontend

En otra terminal, desde la raiz del proyecto:

```powershell
cd frontend
```

Instalar dependencias:

```powershell
npm install
```

Arrancar Vite:

```powershell
npm run dev
```

Si PowerShell bloquea npm:

```powershell
npm.cmd run dev
```

El frontend quedara disponible normalmente en:

```txt
http://localhost:5173
```

Para que el frontend pueda comunicarse con el backend, el archivo `frontend/.env` debe contener:

```env
VITE_BACKEND_URL=http://127.0.0.1:8000
```

## Testing Del Backend

El backend usa el sistema de testing propio de Django. Los tests estan distribuidos en los archivos `tests.py` de cada app, por ejemplo:

- `backend/accounts/tests.py`
- `backend/habitacion/tests.py`
- `backend/sala/tests.py`
- `backend/reservas/tests.py`
- `backend/extras/tests.py`

Para ejecutar todos los tests del backend:

```powershell
cd backend
python manage.py test
```

Para ejecutar los tests de una app concreta:

```powershell
python manage.py test accounts
python manage.py test habitacion
python manage.py test sala
python manage.py test reservas
python manage.py test extras
```

Django crea una base de datos temporal de test, ejecuta las pruebas y la elimina al terminar. Esto permite probar el backend sin modificar directamente la base de datos de desarrollo.

## Testing Del Frontend

El frontend usa Vitest con React Testing Library. Esta eleccion encaja con Vite y permite probar componentes React desde el punto de vista del usuario.

Se han configurado:

- `vitest` como runner de tests.
- `jsdom` como entorno de navegador simulado.
- `@testing-library/react` para renderizar componentes.
- `@testing-library/jest-dom` para usar matchers como `toBeInTheDocument`.
- `@testing-library/user-event` para simular interacciones reales.

Los tests creados cubren:

- Utilidades puras de fechas.
- Renderizado e interaccion del selector de horarios.
- Renderizado e interaccion de tarjetas de salas.
- Formulario de login con mocks de `fetch`, `localStorage` y navegacion.

Para ejecutar todos los tests del frontend:

```powershell
cd frontend
npm test -- --run
```

En Windows, si PowerShell bloquea npm:

```powershell
npm.cmd test -- --run
```

Para ejecutar los tests en modo observacion:

```powershell
npm run test:watch
```

O con `npm.cmd`:

```powershell
npm.cmd run test:watch
```

Para ejecutar la cobertura:

```powershell
npm run test:coverage -- --run
```

O con `npm.cmd`:

```powershell
npm.cmd run test:coverage -- --run
```

Tambien se puede ejecutar un test concreto:

```powershell
npm.cmd test -- --run src/funcionesAuxiliares.test.js
npm.cmd test -- --run src/components/salas/SelectHorario.test.jsx
npm.cmd test -- --run src/components/salas/SalaCard.test.jsx
npm.cmd test -- --run src/pages/Login.test.jsx
```

## Scripts Utiles Del Frontend

Dentro de `frontend/`:

```powershell
npm run dev
npm run build
npm run preview
npm run lint
npm test -- --run
npm run test:coverage -- --run
```

## Coleccion Postman

El backend incluye una coleccion de Postman:

```txt
backend/Hotel miga.postman_collection.json
```

Puede utilizarse para probar manualmente los endpoints de la API.

## Flujo Recomendado De Desarrollo

1. Arrancar el backend con `python manage.py runserver`.
2. Arrancar el frontend con `npm run dev`.
3. Trabajar sobre la aplicacion en `http://localhost:5173`.
4. Ejecutar los tests del backend con `python manage.py test`.
5. Ejecutar los tests del frontend con `npm test -- --run`.

