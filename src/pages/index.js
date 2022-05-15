'use strict';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import validationSetting from '../utils/validationSetting.js';

import {
  nameInput,
  jobInput,
  profileForm,
  cardAddForm,
  popupTriggerEditButton,
  popupTriggerAddButton,
} from '../utils/constants.js';

// import './index.css';

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




// ========================================================================================================================================
// Создание экземпляра класса popup
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: '773f7647-9f5b-47ff-aca1-eaec927fb96b',
    'Content-Type': 'application/json'
  }
});



const popupDeleteCard = new PopupWithSubmit('.popup_type_confirm-delete',  (cardId) => {
  api.deleteCard(cardId)
  .then(() => {
    popupDeleteCard.close();
  })
  .catch(err => console.error(err));
});

// console.log(popupDeleteCard);

function handleDeleteIconClick (card) {
  popupDeleteCard.open();
  popupDeleteCard.getIdCard(card);
}


popupDeleteCard.setEventListeners();


const renderCard = (data) => {
  const card = new Card(data, '.card', handleCardClick, handleDeleteIconClick, userInfo._id);
  const cardElement = card.generateCard();
  return cardElement;
};






// Добавление одной карточки в верстку
const popupAddCard = new PopupWithForm('.popup_type_add', (data) => {
  api.addNewCard(data).then((res) => {
    createCard.addItem(renderCard(res));
  }).catch((err) => {
    console.log(err);
  });
});
// ================================================================

// ==================================================================
// Создание карточек на странице 3 пункт

const createCard = new Section(renderCard, '.elements__list');


api.getInitialCards().then((data) => {
  createCard.rendered(data);
})
  .catch((err) => console.log(err));
// ================================================================

// Добавление карточек в верстку

// ================================================================// ================================================================// ================================================================// ================================================================// ================================================================


// ================================================================// ================================================================// ================================================================// ================================================================// ================================================================// ================================================================
// Создание popup редактирования профиля (изменяем данные пользователя на сайте и на сервере)
const profileEditPopup = new PopupWithForm('.popup_type_edit', (data) => {
  api.setUserInfo(data).then((res) => {
    userInfo.setUserInfo(res);
  }).catch((err) => {
    console.log(err);
  });
});





const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__job', avatar: '.profile__avatar' });

// Получаем данны пользователя с сервера и вставляем их в поля
api.getUserInfo().then((data) => {
  handleUserInfo(data);
});

function handleUserInfo(data) {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data.avatar);
  userInfo.id = data._id;
}
// ==============================================================



// ======================================================
popupTypeZoomImage.setEventListeners();
popupAddCard.setEventListeners();
profileEditPopup.setEventListeners();

// Слушателя кнопок
popupTriggerAddButton.addEventListener('click', () => {
  formValidCard.resetValidation();
  popupAddCard.open();
});

popupTriggerEditButton.addEventListener('click', () => {

  const getUserData = userInfo.getUserInfo();

  nameInput.value = getUserData.name;
  jobInput.value = getUserData.job;

  profileEditPopup.open();
  formValidProfile.resetValidation();
});




