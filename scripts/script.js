'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // Обьявляем переменные
  const popupTriggerEditButton = document.querySelector('.profile__edit-button');
  const popupTypeEdit = document.querySelector('.popup_type_edit');
  const popupCloseBtn = popupTypeEdit.querySelector('.popup__close');
  const formElement = document.querySelector('.edit-form');
  // Поля input + элементы DOM для вставки нового value
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_job');
  const profileName = document.querySelector('.profile__name');
  const profileJob = document.querySelector('.profile__job');

  // Объявляем функции

  //Открытие модального окна
  function openPopup(popup) {
    popup.classList.add('popup_opened'); // С помощью add добавляем класс и открываем popup
  }

  //Закрытие модального окна
  function closePopup(popup) {
    popup.classList.remove('popup_opened'); // С помощью remove убираем класс скрываем popup
  }

  //Функция, которая изменяет стандартное поведение браузера при отправке формы
  function formSubmitHandler(evt) {
    evt.preventDefault();
    //Изменяем value на основании того, что ввел пользователь
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    //Закрываем popup
    closePopup(popupTypeEdit);
  }

  //Обработчик открытия и закрытия модального окна
  popupTriggerEditButton.addEventListener('click', () => {

    nameInput.value = 'Жак-Ив Кусто';
    jobInput.value = 'Исследователь океана';

    openPopup(popupTypeEdit);
  });
  popupCloseBtn.addEventListener('click', () => closePopup(popupTypeEdit));

  // Обработчик события отправки формы
  formElement.addEventListener('submit', formSubmitHandler);

});
