'use strict';

export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._title = name;
    this._image = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageCard = this._element.querySelector('.elements__image');
    imageCard.src = this._image;
    imageCard.alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;

    return this._element;
  }

  _handleCardLike() {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleCardClick() {
    this._handleCardClick(this._title, this._image);
  }

  _setEventListeners() {

    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._handleCardLike();
    });

    this._element.querySelector('.elements__card-delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });

  }
}
