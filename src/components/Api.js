import { BASE_URL, API_KEY } from '../utils/constant.js'

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers; 
    this._authorization = config.headers.authorization; // токен
  }

  getInitialCards () {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(res => res.json());
  }

  getUserInfo () {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(res => res.json());
  }

  updateUserInfo(item) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about,
      }),
    }).then(res => res.json()); // краткая запись 
  }

  updateAvatar(newUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newUrl
      })
    }).then((res) => {
      return res.json()
    })
  }

  updateCards(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    }).then((res) => {
      return res.json()
    })
  }

  deleteCardApi(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return res.json()
    })
  }

  putCardLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return res.json()
    })
  }
  
  deleteCardLike (cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return res.json()
    })
  }
}

const api = new Api({
  url: BASE_URL,
  headers: {
    authorization: API_KEY,
    'Content-Type': 'application/json'
  }
})

export default api;