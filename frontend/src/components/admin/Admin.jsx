import "./Admin.css"
import { Outlet } from "react-router-dom"
import AdminNavBar from "./AdminNavBar"

export default function Admin() {

  function logout(){
    // Eliminar el token del localStorage
    localStorage.removeItem("token");

    window.location="/login"
  }

  return (
    <div className="admin-container">

        <button className="logout-btn" onClick={logout}>
            Logout
        </button>

        <AdminNavBar/>
        <Outlet/>

    </div>
  )
}