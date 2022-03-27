'use strict';
// Массив с карточками
const initialCards = [
  {
    name: 'Нижний Новгород',
    link: 'https://i.ibb.co/Nrjd2h5/image.jpg',
  },
  {
    name: 'Рязань',
    link: 'https://i.ibb.co/9Y8HnZp/image.jpg',
  },
  {
    name: 'Синево-Дуброво',
    link: 'https://i.ibb.co/9HWWWRg/image.jpg',
  },
  {
    name: 'Сланцы',
    link: 'https://i.ibb.co/QjDhgj6/image.jpg',
  },
  {
    name: 'Суздаль',
    link: 'https://i.ibb.co/h1S7TnF/image.jpg',
  },
  {
    name: 'Челябинск',
    link: 'https://i.ibb.co/5Yy7wkV/image.jpg',
  },
];

// Переменные popup
const popupCollection = document.querySelectorAll('.popup');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeAdd = document.querySelector('.popup_type_add');
const popupTypeZoomImage = document.querySelector('.popup_type_zoom-photo');
const popupZoomImage = document.querySelector('.popup__zoom-photo');
const popupZoomImageCaption = document.querySelector('.popup__caption');
const popupCloseBtnEdit = popupTypeEdit.querySelector('.popup__close');
const popupCloseBtnZoomImage = popupTypeZoomImage.querySelector('.popup__close');
const popupCloseBtnImage = popupTypeAdd.querySelector('.popup__close');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardLinkInput = document.querySelector('.popup__input_type_card-link');

// Переменные формы popup + profile + elements
const profileForm = document.querySelector('.edit-form');
const addCardForm = document.querySelector('.add-form');
const popupSubmitEditProfileBtn = profileForm.querySelector('.popup__submit-button_type_edit');
const popupSubmitAddCardBtn = addCardForm.querySelector('.popup__submit-button_type_add');
const popupTriggerEditButton = document.querySelector('.profile__edit-button');
const popupTriggerAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsContainer = document.querySelector('.elements__list');

// Открываем popup редактирования профиля и вставляем данные
const editProfile = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  openPopup(popupTypeEdit);
};

// Открытие модального окна
const openPopup = (popup) => {
  document.addEventListener('keydown', handleEscUp);
  document.addEventListener('mousedown', handleOverlayClick);

  popup.classList.add('popup_opened');
};

// Закрытие модального окна
const closePopup = (popup) => {
  document.removeEventListener('keydown', handleEscUp);
  document.removeEventListener('mousedown', handleOverlayClick);

  popup.classList.remove('popup_opened');
};


// Закрытие popup кликом на overlay
const handleOverlayClick = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
    closePopup(activePopup);
  }
};

// Закрытие popup кликом на esc
const handleEscUp = (evt) => {
  const activePopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape') {
    closePopup(activePopup);
  }
};

// Создание карточки на основе шаблона template
const createCard = (data) => {
  // Находим элементы в карточке template
  const cardTemplate = document.querySelector('.card').content;
  const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
  const triggerLikeCardButton = cardElement.querySelector('.elements__like');
  const deleteButton = cardElement.querySelector('.elements__card-delete');
  const cardImage = cardElement.querySelector('.elements__image');
  const titleImage = cardElement.querySelector('.elements__title');

  // Наполняем карточку
  cardImage.src = data.link;
  cardImage.alt = data.name;
  titleImage.textContent = data.name;

  // Навешиваем обработчиков событий (лайк, удаление, открытие zoom картинки)
  triggerLikeCardButton.addEventListener('click', handleCardLike);
  deleteButton.addEventListener('click', handleDeleteCard);
  setImageClickHandler(cardImage);

  // Возвращаем карточку
  return cardElement;
};

// Добавление новой карточки в верстку
const renderCard = (data, cardsContainer) => {
  // Создаем карточку на основе данных
  const cardElement = createCard(data);
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement);
};

// Изменение стандартного поведения браузера при редактировании профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  //Изменяем value на основании того, что ввел пользователь
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  //Закрываем popup
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

  // Закрываем popup
  closePopup(popupTypeAdd);
};

// Создание карточек при загрузке страницы
const addCards = (initialCards) => {
  initialCards.forEach((card) => {
    renderCard(
      {
        name: card.name,
        link: card.link,
      },
      cardsContainer
    );
  });
};

// Переключение лайков
const handleCardLike = (evt) => {
  evt.target.classList.toggle('elements__like_active');
};

// Удаление одной карточки
const handleDeleteCard = (evt) => {
  evt.target.closest('.elements__item').remove();
};

// Увеличение изображения при клике
const setImageClickHandler = (cardImage) => {
  cardImage.addEventListener('click', () => {
    popupZoomImage.src = cardImage.src;
    popupZoomImage.alt = cardImage.alt;
    popupZoomImageCaption.textContent = cardImage.alt;

    openPopup(popupTypeZoomImage);
  });
};

// Сброс формы
const resetForm = () => {
  const formList = document.querySelectorAll('.popup__form');
  formList.forEach((element) => {
    element.reset();
  });
};

// Сброс ошибки, удаление ошибки после клика на overlay или esc
const resetInputError = () => {
  const errorList = document.querySelectorAll('.popup__error');
  const inputList = document.querySelectorAll('.popup__input');

  inputList.forEach((element) => {
    element.classList.remove('popup__input_type_error');
  });

  errorList.forEach((element) => {
    element.classList.remove('popup__error_visible');
    element.textContent = '';
  });
};

// Добавляем начальные карточки в верстку
addCards(initialCards);

//Обработчик открытия popup изменения профиля + добавления фото
popupTriggerEditButton.addEventListener('click', () => {
  editProfile();
  resetInputError();
});

popupTriggerAddButton.addEventListener('click', () => {
  openPopup(popupTypeAdd);
  resetInputError();
  resetForm();
});

// Обработчик кнопок закрытия popup
popupCloseBtnEdit.addEventListener('click', () => {
  closePopup(popupTypeEdit);
  resetInputError();
  resetForm();
});

popupCloseBtnImage.addEventListener('click', () => {
  closePopup(popupTypeAdd);
  resetInputError();
  resetForm();
});

popupCloseBtnZoomImage.addEventListener('click', () =>
  closePopup(popupTypeZoomImage)
);

// Обработчик событий отправки формы
profileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

