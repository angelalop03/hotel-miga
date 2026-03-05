import GestionReservasSalas from "./GestionReservasSalas"

function Admin() {

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

        <h1>Admin dashboard</h1>

        <GestionReservasSalas/>

    </div>
  )
}

export default Admin