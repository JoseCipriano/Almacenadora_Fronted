import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/navbars/Navbar"
import './dashboardPage.css'

 export function DashboardPage() {

  const navigate = useNavigate();

  const handleNavigateToAuthPage = () => {
    navigate('/auth');
  }
  return (
    <div>
      <Navbar/>
      <div className="homepage">
      <header className="hero">
        <h1>Bienvenido a TOP Almacen</h1>
        <br />
        <button className="cta-button" onClick={handleNavigateToAuthPage}> 
          <strong>Inicia Sesión</strong>
        </button>
      </header>

      <footer className="footer">
        <p>© 2025 &nbsp;&nbsp; | &nbsp;&nbsp; Almacenadora App &nbsp;&nbsp; | &nbsp;&nbsp; contacto@alamcenadora.com</p>
      </footer>
    </div>

        
      
    </div>
  )
}


