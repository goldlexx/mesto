'use strict';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import initialCards from '../utils/initialCards.js';
import validationSetting from '../utils/validationSetting.js';
import {
  nameInput,
  jobInput,
  profileForm,
  cardAddForm,
  popupTriggerEditButton,
  popupTriggerAddButton,
} from '../utils/constants.js';

//Экземпляры класса валидации форм
const formValidProfile = new FormValidator(validationSetting, profileForm);
const formValidCard = new FormValidator(validationSetting, cardAddForm);

const popupTypeZoomImage = new PopupWithImage({
  selector: '.popup_type_zoom-photo',
  imageUrl: '.popup__zoom-photo',
  imageName: '.popup__caption',
});

const handleCardClick = (name, link) => {
  popupTypeZoomImage.open(name, link);
};

const popupTypeEdit = new Popup('.popup_type_edit');
const popupTypeAdd = new Popup('.popup_type_add');

// Создание карточек на странице
const createCard = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.card', handleCardClick);
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  '.elements__list'
);

// Добавление карточек в верстку
createCard.rendered();


const userData = new UserInfo({ name: '.profile__name', job: '.profile__job' });

// Добавление одной карточки в верстку
const popupAddCard = new PopupWithForm('.popup_type_add', (data) => {
  createCard.addItem(data);
});

// Редактирование карточки профиля
const popupProfile = new PopupWithForm('.popup_type_edit', (data) => {
  userData.setUserInfo(data);
});


popupAddCard.setEventListeners();
popupProfile.setEventListeners();



popupTriggerEditButton.addEventListener('click', () => {
  const getUserData = userData.getUserInfo();

  nameInput.value = getUserData.name;
  jobInput.value = getUserData.job;

  popupTypeEdit.open();
  formValidProfile.resetValidation();
});


popupTriggerAddButton.addEventListener('click', () => {
  formValidCard.resetValidation();
  popupTypeAdd.open();
});
