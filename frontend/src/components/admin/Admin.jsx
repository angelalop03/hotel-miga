import "./Admin.css"
import { Outlet } from "react-router-dom"
import AdminNavBar from "./AdminNavBar"

export default function Admin() {

  function logout(){
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/logout/`,{
      method:"POST"
    })
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