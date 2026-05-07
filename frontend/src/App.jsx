// ... (tus imports están perfectos)
import Header from "./components/Header/Header";

import Main from "./components/Main/Main";

import Footer from "./components/Footer/Footer";

import Login from "./components/Login/Login";

import Register from "./components/Register/Register";
import InfoTooltip from "./components/InfoTooltip/InfoTooltip";
import * as auth from "../utils/auth";

import { api } from "../utils/api";

import { getToken, setToken } from "../utils/token";

import { useState, useEffect } from "react";

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import AppContext from "./components/contexts/CurrentUserContext";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export default function App() {
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  function handleCloseAllPopups() {
    setIsInfoTooltipOpen(false);
  }

  // 1. CORRECCIÓN DE SIGN OUT (Faltaba cerrar la llave '}')
  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false); // Usamos isLoggedIn que es tu estado
    setEmail("");
    navigate("/login");
  } // <--- Esta llave faltaba

  // 🔐 REGISTRO
  const handleRegistration = ({ email, password }) => {
    auth
      .register(email, password)
      .then((res) => {
        // 1. Mostramos el popup de éxito
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);

        // 2. Esperamos 2 segundos para que el usuario lea el mensaje
        setTimeout(() => {
          // 3. Cerramos el popup
          handleCloseAllPopups();
          // 4. ¡Lo mandamos al login!
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        // Si hay error, mostramos el popup de error (este no se cierra solo)
        setIsSuccess(false);
        setTooltipMessage(err.message || "Algo salió mal");
        setIsInfoTooltipOpen(true);
      });
  };

  // 🔐 LOGIN
  const handleLogin = ({ email, password }) => {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          setEmail(email);
          navigate("/cards");
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        // 'err.message' o 'err.error' suele ser donde la API de Tripleten guarda el texto
        // Si err es un string, lo usamos directo, si es objeto, buscamos la propiedad
        const message = err.message || err.error || "Algo salió mal";
        setTooltipMessage(message);
        setIsInfoTooltipOpen(true);
      });
  };

  const handleCardLike = (card) => {
    const isLiked = card.isLiked;
    api
      .toggleLikeCard(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)),
        );
      })
      .catch(console.error);
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch(console.error);
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .createCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .editProfile({ name, about })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch(console.error);
  };

  const handleUpdateAvatar = (data) => {
    api
      .editPhoto(data.avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
      })
      .catch(console.error);
  };

  // 🔄 CARGAR DATOS
  useEffect(() => {
    if (!isLoggedIn) return;

    api
      .getUserInfo()
      .then(setCurrentUser)
      .catch((err) => {
        console.log("Error silencioso de carga:", err);
        // No abras el Tooltip aquí para no molestar al usuario
      });

    api.getInitialCards().then(setCards).catch(console.error);
  }, [isLoggedIn]);

  // 🔄 AUTO LOGIN
  // App.jsx

  // App.jsx

  useEffect(() => {
    const jwt = getToken();
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          // Tu consola dijo que los datos vienen en 'res.data'
          if (res && res.data) {
            setIsLoggedIn(true);

            // ESTA ES LA CLAVE:
            // Pasamos res.data.email al estado 'email' de App.jsx
            setEmail(res.data.email);

            navigate("/cards");
          }
        })
        .catch((err) => {
          console.error("Error validando token:", err);
        });
    }
  }, []); // Se ejecuta una vez al cargar la web

  return (
    <AppContext.Provider value={{ isLoggedIn, currentUser }}>
      <Header
        loggedIn={isLoggedIn}
        userEmail={email}
        onSignOut={handleSignOut}
      />

      <Routes>
        <Route
          path="/cards"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Main
                cards={cards}
                currentUser={currentUser}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onAddPlaceSubmit={handleAddPlaceSubmit}
                onUpdateUser={handleUpdateUser}
                onUpdateAvatar={handleUpdateAvatar}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
              <Register handleRegistration={handleRegistration} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
              <Login handleLogin={handleLogin} />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            isLoggedIn ? <Navigate to="/cards" /> : <Navigate to="/login" />
          }
        />
      </Routes>

      <InfoTooltip
        isOpen={isInfoTooltipOpen} // ¿Se llama así tu variable?
        onClose={handleCloseAllPopups}
        isSuccess={isSuccess}
        message={tooltipMessage}
      />

      <Footer />
    </AppContext.Provider>
  );
}
