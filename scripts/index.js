import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './initial-сards.js';

//находим контейнер для добавления карточек
const placesContainer = document.querySelector('.places');
//находим кнопку редактирования профиля
const profileEdit = document.querySelector('.profile__edit');
//находим кнопку добавления карточки
const placeAdd = document.querySelector('.place-edit')

//находим попапы
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupImage = document.querySelector('.popup_type_image')

//находим кнопку закрытия попапа
const closePopupButtons = Array.from(document.querySelectorAll('.popup__exit'));

// Находим формы
const profileFormElement = popupProfile.querySelector('.popup__form');
const placeFormElement = popupPlace.querySelector('.popup__form');


// Находим поля форм в DOM
const profileNameInput = popupProfile.querySelector('.popup__form-item_el_name');
const profileDescriptionInput = popupProfile.querySelector('.popup__form-item_el_description');
const placeNameInput = popupPlace.querySelector('.popup__form-item_el_name');
const placeLinkInput = popupPlace.querySelector('.popup__form-item_el_description');


//находим текущие данные профиля
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');
//функция открытия попапа с изображением
function handleOpenImage(name, link) {
  //находим элементы попапа с изображением
  const image = popupImage.querySelector('.popup__wide-image');
  const caption = popupImage.querySelector('.popup__name-wide-image');
  image.src = link;
  image.alt = name;
  caption.textContent = name;
  openPopup(popupImage);
}

//создаем новый объект-карточку
function renderCard(item) {
  const newCard = new Card(item, '#template-place', handleOpenImage);
  const newElement = newCard.generateCard();
  return newElement;
}

initialCards.forEach((item) => {
  // Создадим экземпляр карточки и добавляем в DOM
  placesContainer.append(renderCard(item));
});


// enableValidation(config);

const config = {
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__input-error_active'
}

const editPlaceFormValidator = new FormValidator(config, popupPlace);
editPlaceFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(config, popupProfile);
editProfileFormValidator.enableValidation();


//функция для закрытия попапа — удаляет класс видимости попапа, сбрасывает данные
//из форм, снимает слушатели на события попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup);
}


// функция для закрытия попапа по клику вне контейнера
function overlayClick(evt, popup) {
  if (evt.target.classList.contains('popup')) {
    closePopup(popup);
  }
}

//функция закрытия попапов по кнопке закрытия
function closePopupButton(evt) {
  if (evt.target.classList.contains('popup__exit')) {
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  }
}

//функция закрытия попапов по esc
function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
}

//функция по дефолтному присвоению текущих данных профиля в полях ввода формы профиля
function fillCurrentData() {
  profileNameInput.value = currentName.textContent;
  profileDescriptionInput.value = currentDescription.textContent;
}

// ф-ция открытия попапа, включающая добавление слушателя по esc
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('keydown', closeEscPopup);
}

// Обработчик «отправки» формы
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  // Получение новых значении из формы
  const newName = profileNameInput.value;
  const newDescription = profileDescriptionInput.value;
  // Замена данных профиля в соответствии с введенными в форме значениями
  currentName.textContent = newName;
  currentDescription.textContent = newDescription;
  closePopup(popupProfile);//вызов функции для закрытия попапа после сохранения
}

function handlerPlaceFormSubmit(evt) {
  evt.preventDefault();
  // Получение новых значении из формы
  const item = {
    name: placeNameInput.value,
    link: placeLinkInput.value
  }

  // placeFormElement.reset(); //сброс значений полей формы
  placesContainer.prepend(renderCard(item));

  closePopup(popupPlace);//вызов функции для закрытия попапа после сохранения
}


//подписка на события клика по кнопкам редактирования профиля и добавления места
profileEdit.addEventListener('click', () => {
  editProfileFormValidator.prepareForm();
  openPopup(popupProfile);
  fillCurrentData();

});

placeAdd.addEventListener('click', () => {
  openPopup(popupPlace);
  placeFormElement.reset();
  editPlaceFormValidator.prepareForm();
});

//подписка на закрытие попапов по оверлею или кнопке
popupList.forEach(popup => popup.addEventListener('mousedown', (evt) => overlayClick(evt, popup)));
closePopupButtons.forEach(button => button.addEventListener('click', closePopupButton));


//отправка формы
placeFormElement.addEventListener('submit', handlerPlaceFormSubmit);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

