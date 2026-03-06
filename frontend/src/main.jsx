import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './index.css'

import App from './App.jsx'
import Home from "./pages/Home.jsx";
import Habitaciones from './pages/Habitaciones.jsx'
import SalasHabitaciones from "./pages/SalasHabitaciones.jsx";
import Login from "./pages/Login.jsx"
import Admin from './components/admin/Admin.jsx'
import AdminReservasSalas from './components/admin/AdminReservasSalas.jsx'
import AdminHabitaciones from './components/admin/AdminHabitaciones.jsx'
import AdminSalas from './components/admin/AdminSalas.jsx'
import HabitacionesDisponibles from "./pages/HabitacionesDisponibles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "habitaciones", element: <Habitaciones /> },
      { path: "habitaciones-disponibles", element: <HabitacionesDisponibles /> },
      { path: "salas", element: <SalasHabitaciones /> },
      { path: "login", element: <Login /> },
      { 
        path: "admin", 
        element: <Admin />,
        children: [
          { path: "reservas-salas", element: <AdminReservasSalas /> },
          { path: "salas", element: <AdminSalas /> },
          { path: "habitaciones", element: <AdminHabitaciones /> }
        ]
       }
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