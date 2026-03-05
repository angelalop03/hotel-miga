import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './components/admin/admin.jsx'
import Habitaciones from './pages/Habitaciones.jsx'
import SalasHabitaciones from "./pages/SalasHabitaciones.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/habitaciones", element: <Habitaciones /> },
  { path: "/salas", element: <SalasHabitaciones /> },
  { path: "/admin", element: <Admin /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)