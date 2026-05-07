import logo from "../../assets/images/logo.png"; // Ajusta la ruta de tu logo
import { Link, useLocation } from "react-router-dom";

export default function Header({ loggedIn, userEmail, onSignOut }) {
  const location = useLocation(); // Esto nos dice en qué URL estamos

  return (
    <header className="header">
      <img src={logo} alt="Around the U.S. logo" className="header__logo" />

      <div className="header__container">
        {/* CASO 1: Si está logueado, muestra el email y el botón de Salir */}
        {loggedIn ? (
          <>
            <span className="header__user-email">{userEmail}</span>
            <button className="header__logout" onClick={onSignOut}>
              Logout
            </button>
          </>
        ) : (
          /* CASO 2: Si NO está logueado, cambia entre Login y Register según la URL */
          <Link
            to={location.pathname === "/register" ? "/login" : "/register"}
            className="header__logout"
          >
            {location.pathname === "/register" ? "Login" : "Register"}
          </Link>
        )}
      </div>
    </header>
  );
}
