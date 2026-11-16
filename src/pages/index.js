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

// Импортируем константы
import {
  nameInput,
  jobInput,
  profileForm,
  cardAddForm,
  editAvatarForm,
  popupTriggerEditButton,
  popupTriggerAddButton,
  popupTriggerEditAvatar,
} from '../utils/constants.js';

import './index.css';

// Функции

// Функция добавления данных пользователя
const handleUserInfo = (data) => {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data);
  userInfo.id = data._id;
};

// Цель функции подставлять текст при загрузке информации на сервер
const renderLoading = (popup, isLoading = false) => {
  const currentActiveButton = document.querySelector(
    `.${popup} .popup__submit-button`
  );
  if (isLoading) {
    currentActiveButton.textContent = 'Сохранение...';
  } else {
    currentActiveButton.textContent = 'Сохранить';
  }
};

// Увеличение картинки при клике
const handleCardClick = (name, link) => {
  popupTypeZoomImage.open(name, link);
};

// Добавляется в класс Card. Цель открыть popup по клику на иконку удаления и получить ID карточки.
const handleDeleteIconClick = (card) => {
  popupDeleteCard.open();
  popupDeleteCard.getIdCard(card);
};

function showApiError(error) {
  const status = document.querySelector('.api-status');
  status.textContent = error?.message || 'The Mesto API request failed.';
  status.hidden = false;
}

const handleLikeClick = (card, isLike) => {
  const cardPromise = isLike ? api.removeLike(card._id) : api.setLike(card._id);
  cardPromise.then(() => {
    card.setLike(isLike);
    })
    .catch(showApiError);
};

// Создает класс кард и карточку. При создании класса используются колбеки.
const renderCard = (data) => {
  const card = new Card(
    data,
    '.card',
    userInfo._id,
    handleCardClick,
    handleDeleteIconClick,
    handleLikeClick
  );
  const cardElement = card.generateCard();
  return cardElement;
};

// Экземпляры класса валидации форм
const formValidProfile = new FormValidator(validationSetting, profileForm);
const formValidCard = new FormValidator(validationSetting, cardAddForm);
const formValidAvatar = new FormValidator(validationSetting, editAvatarForm);

// Запуск валидации форм
formValidProfile.enableValidation();
formValidCard.enableValidation();
formValidAvatar.enableValidation();

// Создание экземпляра класса Api
const api = new Api({
  url: process.env.MESTO_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Создание экземпляра popup для увеличения картинок при клике
const popupTypeZoomImage = new PopupWithImage({
  popupSelector: '.popup_type_zoom-photo',
  imageUrl: '.popup__zoom-photo',
  imageName: '.popup__caption',
});

// Создание экземпляра popup для подтверждения удаления картинок при клике на иконку удаления
const popupDeleteCard = new PopupWithSubmit(
  '.popup_type_confirm-delete',
  (cardId) => {
    api
      .deleteCard(cardId)
      .then(() => {
        popupDeleteCard._card.handleDeleteCard();
        popupDeleteCard.close();
      })
    .catch(showApiError);
  }
);

// Экземпляр класса, который делает
const profileEditPopup = new PopupWithForm('.popup_type_edit', (data) => {
  renderLoading('popup_type_edit', true);
  api
    .setUserInfo(data)
    .then((res) => {
      userInfo.setUserInfo(res);
      profileEditPopup.close();
    })
    .catch(showApiError)
    .finally(() => {
      renderLoading('popup_type_edit', false);
    });
});

// Создание экземпляра класса данных пользователя
const userInfo = new UserInfo({
  name: '.profile__name',
  job: '.profile__job',
  avatar: '.profile__avatar',
});

// Экземпляр класса добавление одной карточки в верстку
const popupAddCard = new PopupWithForm('.popup_type_add', (data) => {
  renderLoading('popup_type_add', true);
  api
    .addNewCard(data)
    .then((res) => {
      createCard.addItem(renderCard(res));
      popupAddCard.close();
    })
    .catch(showApiError)
    .finally(() => {
      renderLoading('popup_type_add', false);
    });
});

// Добавление аватара
const popupAddAvatar = new PopupWithForm('.popup_type_add-avatar', (data) => {
  renderLoading('popup_type_add-avatar', true);
  api
    .loadUserAvatar(data.link)
    .then((response) => {
      userInfo.setUserAvatar(response);
      popupAddAvatar.close();
    })
    .catch(showApiError)
    .finally(() => {
      renderLoading('popup_type_add-avatar', false);
    });
});

// Рендер карточек
const createCard = new Section(renderCard, '.elements__list');

// Запрос на добавление карточек и данных пользователя
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, userCard]) => {
    handleUserInfo(userData);
    createCard.rendered(userCard);
  })
  .catch(showApiError);

// Добавляем слушатели
popupDeleteCard.setEventListeners();
popupAddAvatar.setEventListeners();
popupTypeZoomImage.setEventListeners();
popupAddCard.setEventListeners();
profileEditPopup.setEventListeners();

// Слушатели кнопок
popupTriggerEditAvatar.addEventListener('click', () => {
  popupAddAvatar.open();
  formValidAvatar.resetValidation();
});

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
