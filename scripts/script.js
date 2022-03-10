'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Переменные popup
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
  const formEdit = document.querySelector('.edit-form');
  const formAdd = document.querySelector('.add-form');
  const popupTriggerEditButton = document.querySelector('.profile__edit-button');
  const popupTriggerAddButton = document.querySelector('.profile__add-button');
  const profileName = document.querySelector('.profile__name');
  const profileJob = document.querySelector('.profile__job');
  const cardsContainer = document.querySelector('.elements__list');

  // Находим элементы в карточке template



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


  // Открываем popup редактирования профиля и вставляем данные
  const editProfile = () => {

    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openPopup(popupTypeEdit);
  };

  // Открытие модального окна
  const openPopup = (popup) => {
    popup.classList.add('popup_opened'); // С помощью add добавляем класс и открываем popup
  };

  // Закрытие модального окна
  const closePopup = (popup) => {
    popup.classList.remove('popup_opened'); // С помощью remove убираем класс скрываем popup
  };

  // Создание карточки на основе шаблона template
  const createCard = (data) => {
    // Находим элементы в карточке template
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.elements__item').cloneNode(true);
    const triggerLikeCardButton = cardElement.querySelector('.elements__like');
    const deleteButton = cardElement.querySelector('.elements__card-delete');
    const cardImage = cardElement.querySelector('.elements__image');
    const titleImage = cardElement.querySelector('.elements__title');

    // Наполняем карточку
    fillingСard(cardImage, titleImage, data);

    // Навешиваем обработчиков событий (лайк, удаление, открытие zoom картинки)
    triggerLikeCardButton.addEventListener('click', handleCardLike);
    deleteButton.addEventListener('click', handleDeleteCard);
    openPopupZoomImage(cardImage);
    // Возвращаем карточку
    return cardElement;
  };

  // Наполнение карточки
  const fillingСard = (cardImage, titleImage, data) => {
    cardImage.src = data.link;
    cardImage.alt = data.name;
    titleImage.textContent = data.name;
  };

  // Добавление новой карточки в верстку
  const renderCard = (data, cardsContainer) => {
    // Создаем карточку на основе данных
    const cardElement = createCard(data);
    // Помещаем ее в контейнер карточек
    cardsContainer.prepend(cardElement);
  };

  // Изменение стандартного поведения браузера при редактировании профиля
  const formSubmitHandler = (evt) => {
    evt.preventDefault();
    //Изменяем value на основании того, что ввел пользователь
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    //Закрываем popup
    closePopup(popupTypeEdit);
  };

  // Изменение стандартного поведения браузера при добавлении карточки
  const formSubmitHandlerCard = (evt) => {
    evt.preventDefault();

    // Создаем карточку и помещаем ее в контейнер
    renderCard({
      name: cardNameInput.value,
      link: cardLinkInput.value
    }, cardsContainer);

    // Очищаем input
    cardNameInput.value = '';
    cardLinkInput.value = '';

    // Закрываем popup
    closePopup(popupTypeAdd);
  };

  // Создание карточек при загрузке страницы
  const addingCards = (arr) => {
    arr.forEach((card) => {
      renderCard({
        name: card.name,
        link: card.link
      }, cardsContainer);
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
  const openPopupZoomImage = (cardImage) => {
    cardImage.addEventListener('click', () => {

      popupZoomImage.src = cardImage.src;
      popupZoomImageCaption.textContent = cardImage.alt;

      openPopup(popupTypeZoomImage);
    });
  };

  // Добавляем начальные карточки в верстку
  addingCards(initialCards);

  //Обработчик открытия popup изменения профиля + добавления фото
  popupTriggerEditButton.addEventListener('click', editProfile);
  popupTriggerAddButton.addEventListener('click', () => openPopup(popupTypeAdd));

  // Обработчик кнопок закрытия popup
  popupCloseBtnEdit.addEventListener('click', () => closePopup(popupTypeEdit));
  popupCloseBtnImage.addEventListener('click', () => closePopup(popupTypeAdd));
  popupCloseBtnZoomImage.addEventListener("click", () => closePopup(popupTypeZoomImage));

  // Обработчик событий отправки формы
  formEdit.addEventListener('submit', formSubmitHandler);
  formAdd.addEventListener('submit', formSubmitHandlerCard);

});
