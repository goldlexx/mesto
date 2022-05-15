export default class Card {

  constructor({ name, link, likes, _id, owner}, cardSelector, handleCardClick, handleDeleteIconClick, userId) {
    this._title = name;
    this._image = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
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
    const likeCount = this._element.querySelector('.elements__count-like');


    imageCard.src = this._image;
    imageCard.alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;


    likeCount.textContent = this._likes.length;





    if (this._owner._id !== this._userId) {
      this._element.querySelector('.elements__card-delete').remove();
    }

    return this._element;
  }

  _handleCardLike() {
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.elements__card-delete').addEventListener('click', () => {
      this._handleDeleteIconClick(this);
    });

    this._element.querySelector('.elements__like').addEventListener('click', () => {
      this._handleCardLike();
    });



    this._element.querySelector('.elements__image').addEventListener('click', () => {
      this._handleCardClick(this._title, this._image);
    });
  }



}
