import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login/`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username:username,
        password:password
      })
    })

    if(res.ok){
      navigate("/admin")
    }else{
      alert("Login incorrecto")
    }
  }

  return (
    <div className="login-container">

      <h2>LOGIN</h2>

      <form onSubmit={handleLogin}>

        <input
          placeholder="username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button type="submit">
          Confirmar
        </button>

      </form>

    </div>
  )
}