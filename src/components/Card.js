export default class Card {
  constructor(
    { name, link, likes, _id, owner },
    cardSelector,
    userId,
    handleCardClick,
    handleDeleteIconClick,
    setLike,
    removeLike
  ) {
    this._title = name;
    this._image = link;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._countLike = this._likes.length;

    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._setLike = setLike;
    this._removeLike = removeLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const imageCard = this._element.querySelector('.elements__image');
    const likeCount = this._element.querySelector('.elements__count-like');
    const likeBtn = this._element.querySelector('.elements__like');

    imageCard.src = this._image;
    imageCard.alt = this._title;
    this._element.querySelector('.elements__title').textContent = this._title;

    likeCount.textContent = this._likes.length;

    if (this._owner._id !== this._userId) {
      this._element.querySelector('.elements__card-delete').remove();
    }

    if (this._likes.some((likeAuthor) => likeAuthor._id === this._userId)) {
      likeBtn.classList.add('elements__like_active');
    }

    return this._element;
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _handleCardLike(evt) {
    if (!evt.target.classList.contains('elements__like_active')) {
      evt.target.classList.add('elements__like_active');
      evt.target.nextElementSibling.textContent = String(this._countLike + 1);
      this._countLike += 1;
      this._setLike(this._id);
    } else {
      evt.target.classList.remove('elements__like_active');
      evt.target.nextElementSibling.textContent = String(this._countLike - 1);
      this._countLike -= 1;
      this._removeLike(this._id);
    }
  }

  _setEventListeners() {
    this._element
      .querySelector('.elements__card-delete')
      .addEventListener('click', () => {
        this._handleDeleteIconClick(this);
      });

    this._element
      .querySelector('.elements__like')
      .addEventListener('click', (evt) => {
        this._handleCardLike(evt);
      });

    this._element
      .querySelector('.elements__image')
      .addEventListener('click', () => {
        this._handleCardClick(this._title, this._image);
      });
  }
}
