import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './index.css'

import App from './App.jsx'
import Home from "./pages/Home.jsx";
import Habitaciones from './pages/Habitaciones.jsx'
import Salas from "./pages/Salas.jsx";
import Login from "./pages/Login.jsx"
import Admin from './components/admin/admin.jsx'
import HabitacionesDisponibles from "./pages/HabitacionesDisponibles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "habitaciones", element: <Habitaciones /> },
      { path: "habitaciones-disponibles", element: <HabitacionesDisponibles /> },
      { path: "salas", element: <Salas /> },
      { path: "login", element: <Login /> },
      { path: "admin", element: <Admin /> }
    ]
  },
  {
    path: "*",
    element: <h1>404 - Página no encontrada</h1>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)