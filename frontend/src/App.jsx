import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import "./App.css";

export default function App() {
  return (
    <div className="layout">      
      <NavBar />     
       
      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}