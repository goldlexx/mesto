'use strict';
import { openPopup, popupZoomImage, popupZoomImageCaption, popupTypeZoomImage } from './index.js';

export default class Card {
  constructor(data, cardSelector) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
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
    popupZoomImage.src = this._image;
    popupZoomImage.alt = this._title;
    popupZoomImageCaption.textContent = this._title;

    openPopup(popupTypeZoomImage);
  }

  _setEventListeners() {

    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._handleCardLike();
    });

    this._element.querySelector('.elements__card-delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });

    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick();
    });

  }
}
