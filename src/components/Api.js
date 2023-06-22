export default class Api {
  constructor(config) {
      this._url = config.url;
      this._headers = config.headers; 
      this._authorization = config.headers.authorization; // токен
  }

  getInitialCards () {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json());
  }

  getUserInfo () {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json());
  }

  setUserInfo(item) {
    return fetch(`${this._baseURL}users/me`, {
      method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
              name: item.name,
              about: item.about,
          }),
    }).then(res => res.json());
  }
}