import checkResponse from '../utils/checkResponse';

export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  checkError(res) {
    return checkResponse(res);
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this.checkError(res));
  }

  setUserInfo(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this.checkError(res));
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => this.checkError(res));
  }

  addNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this.checkError(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this.checkError(res));
  }

  setLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this.checkError(res));
  }

  removeLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this.checkError(res));
  }

  loadUserAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => {
      return this.checkError(res);
    });
  }
}
