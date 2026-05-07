// import { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// import AppContext from "../contexts/AppContext";

// export default function ProtectedRoute({ children, anonymous = false }) {
//   const location = useLocation();
//   const from = location.state?.from || "/";

//   const { isLoggedIn } = useContext(AppContext);

//   if (anonymous && isLoggedIn) {
//     return <Navigate to={from} />;
//   }

//   if (!anonymous && !isLoggedIn) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   return children;
// }

import React from "react";
import { Navigate } from "react-router-dom";

// Quitamos el useContext para evitar el error de 'undefined'
function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
  // Si el usuario ya está logueado e intenta ir a Login/Register, mándalo a /cards
  if (anonymous && isLoggedIn) {
    return <Navigate to="/cards" />;
  }

  // Si la ruta es protegida y NO está logueado, mándalo al login
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  // Si todo está bien, renderiza el componente (Main, Login o Register)
  return children;
}

export default ProtectedRoute;