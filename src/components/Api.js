export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  checkError(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this.checkError(res);
    });
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      return this.checkError(res);
    });
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this.checkError(res);
    });
  }


  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      return this.checkError(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => {
      return this.checkError(res);
    });
  }



}

