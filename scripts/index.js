'use strict';

import FormValidator from './FormValidator.js';
import Card from './Card.js';
import initialCards from './initialCards.js';

// Объект настроек с классами и селекторами для валидации
const validationSetting = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorElement: 'popup__error',
};

// Переменные popup
const popups = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeZoomImage = document.querySelector('.popup_type_zoom-photo');
const popupZoomImage = document.querySelector('.popup__zoom-photo');
const popupZoomImageCaption = document.querySelector('.popup__caption');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_card-link');

// Переменные формы popup + profile + elements
const cardsContainer = document.querySelector('.elements__list');
const profileForm = document.querySelector('.edit-form');
const cardAddForm = document.querySelector('.add-form');
const popupTriggerEditButton = document.querySelector('.profile__edit-button');
const popupTriggerAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');



//Экземпляры класса валидации форм
const formValidProfile = new FormValidator(validationSetting, profileForm);
const formValidCard = new FormValidator(validationSetting, cardAddForm);

// Открытие модального окна
const openPopup = (popup) => {
  document.addEventListener('keydown', handleEscUp);
  popup.classList.add('popup_opened');
};

// Закрытие модального окна
const closePopup = (popup) => {
  document.removeEventListener('keydown', handleEscUp);
  popup.classList.remove('popup_opened');
};

const handleCardClick = (title, image) => {
  popupZoomImage.src = image;
  popupZoomImage.alt = title;
  popupZoomImageCaption.textContent = title;

  openPopup(popupTypeZoomImage);
};

// Закрытие popup кликом на esc
const handleEscUp = (evt) => {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
};

const renderCard = (dataCard, cardsContainer) => {
  cardsContainer.prepend(createCard(dataCard));
};

// Создание карточки
const createCard = (data) => {
  const card = new Card(data, '.card', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;

};


// Добавление карточек в верстку
const addCards = (initialCards) => {
  initialCards.forEach((item) => {
    renderCard(item, cardsContainer);
  });
};

const closePopupClickCross = (popups) => {
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup__button-close')) {
        closePopup(popup);
      }
    });
  });
};

// Закрытие popup кликом на overlay
const handleOverlayClick = (popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target === popup && popup.classList.contains('popup_opened')) {
      closePopup(popup);
    }
  });
};

// Проходим по всем popup и добавляем возможность закрывать при помощи клика на overlay или esc
const setEventListenersClosePopupOverlay = (popups) => {
  popups.forEach((popup) => {
    handleOverlayClick(popup);
  });
};

// Изменение стандартного поведения браузера при редактировании профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  // Изменяем value на основании того, что ввел пользователь
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupTypeEdit);
};

// Изменение стандартного поведения браузера при добавлении карточки
const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  // Создаем карточку и помещаем ее в контейнер
  renderCard(
    {
      name: cardNameInput.value,
      link: cardLinkInput.value,
    },
    cardsContainer
  );

  closePopup(popupTypeAdd);

  cardAddForm.reset();
};

//Добавление карточек в верстку
addCards(initialCards);

// Запускаем валидацию форм
formValidProfile.enableValidation();
formValidCard.enableValidation();

//Проходим по всем popup и добавляем возможность закрывать их кликом на overlay
setEventListenersClosePopupOverlay(popups);

//Проходим по всем popup и добавляем возможность закрывать их кликом на крестик
closePopupClickCross(popups);

//Обработчик открытия popup изменения профиля + добавления фото
popupTriggerEditButton.addEventListener('click', () => {

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  formValidProfile.resetValidation();

  openPopup(popupTypeEdit);
});

popupTriggerAddButton.addEventListener('click', () => {
  formValidCard.resetValidation();
  openPopup(popupTypeAdd);
});

// Обработчик событий отправки формы
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardAddForm.addEventListener('submit', handleAddCardFormSubmit);
