import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './index.css'

import App from './App.jsx'
import Home from "./pages/Home.jsx";
import Habitaciones from './pages/Habitaciones.jsx'
import SalasHabitaciones from "./pages/SalasHabitaciones.jsx";
import Login from "./pages/Login.jsx"
import Admin from './components/admin/admin.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "habitaciones", element: <Habitaciones /> },
      { path: "salas", element: <SalasHabitaciones /> },
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