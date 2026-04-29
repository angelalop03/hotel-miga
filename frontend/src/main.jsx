import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './index.css'

import App from './App.jsx'
import Home from "./pages/Home.jsx";
import Habitaciones from './pages/Habitaciones.jsx'
import Salas from "./pages/Salas.jsx";
import Login from "./pages/Login.jsx"
import Admin from './components/admin/Admin.jsx'
import AdminReservasSalas from './components/admin/AdminReservasSalas.jsx'
import AdminHabitaciones from './components/admin/AdminHabitaciones.jsx'
import AdminSalas from './components/admin/AdminSalas.jsx'
import AdminExtras from './components/admin/AdminExtras.jsx'
import HabitacionesDisponibles from "./pages/HabitacionesDisponibles";
import AdminReservasHabitaciones from './components/admin/AdminReservasHabitaciones.jsx'
import NotFound from './components/common/NotFound.jsx'

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
      { 
        path: "admin", 
        element: <Admin />,
        children: [
          { path: "reservas-salas", element: <AdminReservasSalas /> },
          { path: "reservas-habitaciones", element: <AdminReservasHabitaciones /> },
          { path: "salas", element: <AdminSalas /> },
          { path: "habitaciones", element: <AdminHabitaciones /> },
          { path: "extras", element: <AdminExtras /> },
        ]
       }
    ] 
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)