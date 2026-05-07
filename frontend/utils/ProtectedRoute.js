// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../../contexts/AppContext"; // Importación correcta

function ProtectedRoute({ children }) {
  // Consumimos el contexto que creaste
  const context = React.useContext(AppContext);

  // Si por alguna razón el context sigue siendo undefined, 
  // añadimos una protección para que no explote la app
  if (!context) {
    return null; 
  }

  const { isLoggedIn } = context;

  return isLoggedIn ? children : <Navigate to="/signin" />;
}

export default ProtectedRoute;