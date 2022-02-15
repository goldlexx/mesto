'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Обьявляем переменные
  const popupTriggerEditButton = document.querySelector('.profile__edit-button');
  const popupTypeEdit = document.querySelector('.popup_type_edit');
  const popupCloseBtn = popupTypeEdit.querySelector('.popup__close');
  const formElement = document.querySelector('.edit-form');

  // Объявляем функции

  //Открытие модального окна
  function openPopap(popup) {
    popup.classList.toggle('popup_opened'); // С помощью toggle добавляем класс и открываем popup
  }

  //Закрытие модального окна
  function closePopap(popup) {
    popup.classList.toggle('popup_opened'); // С помощью toggle убираем класс скрываем popup
  }

  //Функция, которая изменяет стандартное поведение браузера при отправке формы
  function formSubmitHandler(evt) {
    evt.preventDefault();

    // Находим необходимый input
    const nameInput = document.querySelector('.popup__input-name');
    const postInput = document.querySelector('.popup__input-post');

    // Находим поля формы в DOM
    const profileName = document.querySelector('.profile__name');
    const profilePost = document.querySelector('.profile__post');

    //Изменяем value на основании того, что ввел пользователь
    profileName.textContent = nameInput.value;
    profilePost.textContent = postInput.value;

    //Закрываем popup
    closePopap(popupTypeEdit);
  }

  //Обработчик открытия и закрытия модального окна
  popupTriggerEditButton.addEventListener('click', () => openPopap(popupTypeEdit));
  popupCloseBtn.addEventListener('click', () => closePopap(popupTypeEdit));

  // Обработчик события отправки формы
  formElement.addEventListener('submit', formSubmitHandler);

});
