
export const BASE_URL = "https://socialmed.vitdam.org";

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    // Si la respuesta es 400 o 409 (usuario ya existe), capturamos el JSON del error
    if (!res.ok) {
      return res.json().then((err) => Promise.reject(err));
    }
    return res.json(); // Si todo ok, devolvemos los datos del usuario creado
  });
};

// auth.js
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    // Si la respuesta no es ok (400, 401, etc)
    if (!res.ok) {
      // Retornamos el json para capturar el mensaje de la API
      return res.json().then((err) => Promise.reject(err));
    }
    return res.json();
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Envía el token al servidor para que nos diga quién es el usuario
    },
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
};
