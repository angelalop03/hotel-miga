import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

export default function Login() {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username:username,
        password:password
      })
    })

    const result = await res.json();

    // Guardar el token en el localStorage
    if (result.token) {
      localStorage.setItem("token", result.token);
      navigate("/admin");
    } else {
      alert("Login incorrecto");
    }
  }

  return (
    <div className="login-container">

      <h2>LOGIN</h2>

      <form onSubmit={handleLogin}>
        <label>Nombre de usuario:</label>
        <input
          placeholder="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">
          Acceder
        </button>

      </form>

    </div>
  )
}