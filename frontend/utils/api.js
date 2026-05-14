import { getToken } from "./token";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://socialmed.vitdam.org";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  // 🔐 HEADERS DINÁMICOS CON TOKEN
  _getHeaders() {
    const token = getToken();

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 👈 CLAVE
    };
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, about }),
    }).then(this._checkResponse);
  }

  editPhoto(url) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(this._checkResponse);
  }

  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._getHeaders(),
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  toggleLikeCard(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: BASE_URL,
});
