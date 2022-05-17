import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._popupBtnDelete = this._popupSelector.querySelector(
      '.popup__submit-button'
    );
    this._handleSubmit = handleSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupBtnDelete.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._id);
    });
  }

  getIdCard(card) {
    this._id = card._id;
    this._card = card;
  }
}
