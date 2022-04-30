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

import './index.css';

// Экземпляры класса валидации форм
const formValidProfile = new FormValidator(validationSetting, profileForm);
const formValidCard = new FormValidator(validationSetting, cardAddForm);

// Запуск валидации форм
formValidProfile.enableValidation();
formValidCard.enableValidation();

// Создание popup для увеличения картинок при клике
const popupTypeZoomImage = new PopupWithImage({
  popupSelector: '.popup_type_zoom-photo',
  imageUrl: '.popup__zoom-photo',
  imageName: '.popup__caption',
});

// Функция увеличения картинки при клике
const handleCardClick = (name, link) => {
  popupTypeZoomImage.open(name, link);
};

// Логика инициализации класса Card

const renderCard = (data) => {
  const card = new Card(data, '.card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

// Создание карточек на странице
const createCard = new Section(
  {
    items: initialCards,
    renderer: renderCard
  },
  '.elements__list'
);

// Добавление карточек в верстку
createCard.rendered();


const userData = new UserInfo({ name: '.profile__name', job: '.profile__job' });

// Добавление одной карточки в верстку
const popupAddCard = new PopupWithForm('.popup_type_add', (data) => {
  createCard.addItem(renderCard(data));
});

// Редактирование карточки профиля
const popupProfile = new PopupWithForm('.popup_type_edit', (data) => {
  userData.setUserInfo(data);
});

popupTypeZoomImage.setEventListeners();
popupAddCard.setEventListeners();
popupProfile.setEventListeners();



popupTriggerEditButton.addEventListener('click', () => {
  const getUserData = userData.getUserInfo();

  nameInput.value = getUserData.name;
  jobInput.value = getUserData.job;

  popupProfile.open();
  formValidProfile.resetValidation();
});


popupTriggerAddButton.addEventListener('click', () => {
  formValidCard.resetValidation();
  popupAddCard.open();
});
