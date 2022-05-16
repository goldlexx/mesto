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
  editAvatarForm,
  popupTriggerEditButton,
  popupTriggerAddButton,
  popupTriggerEditAvatar
} from '../utils/constants.js';

// import './index.css';

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
  url: 'https://mesto.nomoreparties.co/v1/cohort-41/',
  headers: {
    authorization: '773f7647-9f5b-47ff-aca1-eaec927fb96b',
    'Content-Type': 'application/json'
  }
});

// Создание экземпляра popup для увеличения картинок при клике
const popupTypeZoomImage = new PopupWithImage({
  popupSelector: '.popup_type_zoom-photo',
  imageUrl: '.popup__zoom-photo',
  imageName: '.popup__caption',
});

// Создание экземпляра popup для подтверждения удаления картинок при клике на иконку удаления
const popupDeleteCard = new PopupWithSubmit('.popup_type_confirm-delete',  (cardId) => {
  api.deleteCard(cardId)
  .then(() => {
    popupDeleteCard.close();
  })
  .catch(err => console.error(err));
});



// Цель функции подставлять текст при загрузке информации на сервер
const renderLoading = (popup, isLoading = false) => {
  const currentActiveButton = document.querySelector(`.${popup} .popup__submit-button`);
  if (isLoading) {
    currentActiveButton.textContent = 'Сохранение...';
  } else {
    currentActiveButton.textContent = 'Сохранить';
  }
};

// Функция увеличения картинки при клике
const handleCardClick = (name, link) => {
  popupTypeZoomImage.open(name, link);
};









// console.log(popupDeleteCard);

function handleDeleteIconClick (card) {
  popupDeleteCard.open();
  popupDeleteCard.getIdCard(card);
}

const setLike = (id) =>  {
  api.setLike(id).then((res) => {
    console.log('Лайк поставлен');
  }).catch((err) => {
    console.log(err);
  });
};

const removeLike = (id) => {
  api.removeLike(id).then((res) => {
    console.log('Лайк убран');
  }).catch((err) => {
    console.log(err);
  });
};

popupDeleteCard.setEventListeners();


const renderCard = (data) => {
  const card = new Card(data, '.card', userInfo._id, handleCardClick, handleDeleteIconClick, setLike, removeLike);
  const cardElement = card.generateCard();
  return cardElement;
};





const userInfo = new UserInfo({ name: '.profile__name', job: '.profile__job', avatar: '.profile__avatar' });


// Добавление одной карточки в верстку
const popupAddCard = new PopupWithForm('.popup_type_add', (data) => {
  renderLoading('popup_type_add', true);
  api.addNewCard(data).then((res) => {
    createCard.addItem(renderCard(res));
  }).catch((err) => {
    alert('Произошла ошибка добавления карточки')
    console.log(`Ошибка добавления карточки ${err}`);
  }).finally(() => {
    renderLoading('popup_type_add', false);
  });
});

const popupAddAvatar  = new PopupWithForm('.popup_type_add_avatar', (data) => {
  renderLoading('popup_type_add_avatar', true);
  userInfo.setUserAvatar(data);
  api.loadUserAvatar(data.link).then((res) => {
    console.log('Загрузка аватара прошла успешно');
  }).catch((err) => {
    console.log(`Ошибка загрузки аватара ${err}`);
  }).finally(() => {
    renderLoading('popup_type_add_avatar', false);
  });

});


popupTriggerEditAvatar.addEventListener('click', () => {
  popupAddAvatar.open();
  formValidAvatar.resetValidation();
});


popupAddAvatar.setEventListeners();
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
  renderLoading('popup_type_edit', true);
  api.setUserInfo(data).then((res) => {
    userInfo.setUserInfo(res);
  }).catch((err) => {
    alert('Произошла ошибка сохранения данных');
    console.log(err);
  }).finally(() => {
    renderLoading('popup_type_edit', false);
  });
});







// Получаем данны пользователя с сервера и вставляем их в поля
api.getUserInfo().then((data) => {
  handleUserInfo(data);
});

function handleUserInfo(data) {
  userInfo.setUserInfo(data);
  userInfo.setUserAvatar(data);
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






