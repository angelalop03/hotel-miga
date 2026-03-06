import "./Admin.css"
import { Outlet } from "react-router-dom"
import AdminNavBar from "./AdminNavBar"

export default function Admin() {

  function logout(){
    fetch("http://127.0.0.1:8000/api/logout/",{
      method:"POST"
    })
    window.location="/login"
  }

  return (
    <div className="admin-container">

        <button className="logout-btn" onClick={logout}>
            Logout
        </button>

        <h2>Panel de Administración</h2>
        <AdminNavBar/>
        <Outlet />

    </div>
  )
}