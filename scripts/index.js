const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__input-error_active'
}

//находим template-элемент карточки
const cardTemplate = document.querySelector('#template-place');
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

//находим элементы попапа с изображением
const image = popupImage.querySelector('.popup__wide-image');
const caption = popupImage.querySelector('.popup__name-wide-image');

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

//функция создания карточки места. Заполняет dom карточки данными из формы/массива
// и подписывается на событие лайка, открытия попапа с изображением и удаление
function createCard(place) {

  const newCard = cardTemplate.content.querySelector('.place').cloneNode(true);
  const cardText = newCard.querySelector('.place__name');
  const cardImage = newCard.querySelector('.place__image');
  const like = newCard.querySelector('.like')
  const cardRemoveButton = newCard.querySelector('.trash');

  cardText.textContent = place.name;
  cardImage.setAttribute('src', place.link);
  cardImage.setAttribute('alt', `${place.name}. Изображение`);
  cardImage.addEventListener('click', () => openImage(place))
  like.addEventListener('click', () => like.classList.toggle('like_active'));
  cardRemoveButton.addEventListener('click', () => newCard.remove());

  return newCard;
}

//цикл для загрузки мест из массива при открытии страницы
initialCards.forEach(function (currentCard) {
  const newCard = createCard(currentCard);
  placesContainer.append(newCard);
});

//функция для закрытия попапа — удаляет класс видимости попапа, сбрасывает данные
//из форм, снимает слушатели на события попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  if (popup === popupPlace) {
    placeFormElement.reset();
  }
  document.removeEventListener('keydown', closeEscPopup);
}

//функция для закрытия попапа по клику вне контейнера
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

//функция открытия попапа с изображением
function openImage(place) {
  image.setAttribute('src', place.link);
  image.setAttribute('alt', `${place.name}. Изображение`);
  caption.textContent = place.name;
  openPopup(popupImage);
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
  const newPlaceName = placeNameInput.value;
  const newPlaceLink = placeLinkInput.value;
  placeFormElement.reset(); //сброс значений полей формы
  // создание элемента с данными из формы
  const newCard = createCard({ name: newPlaceName, link: newPlaceLink });
  //вставка его как первого элемента
  placesContainer.prepend(newCard);

  closePopup(popupPlace);//вызов функции для закрытия попапа после сохранения
}

//функция преподготовки формы, деактивирует кнопку сохранения и очищает предыдущие ошибки формы
function prepareForm(popup) {
  popup.querySelector(config.submitButtonSelector).disabled = true;
  const spanErrorList = Array.from(popup.querySelectorAll('.popup__input-error'));
  spanErrorList.forEach(element => element.classList.remove(config.errorClass));
  const inputErrorList = Array.from(popup.querySelectorAll('.popup__form-item'));
  inputErrorList.forEach(element => element.classList.remove(config.inputErrorClass));
}

//подписка на события клика по кнопкам редактирования профиля и добавления места
profileEdit.addEventListener('click', () => {
  openPopup(popupProfile);
  prepareForm(popupProfile);
  fillCurrentData();

});

placeAdd.addEventListener('click', () => {
  openPopup(popupPlace);
  prepareForm(popupPlace);
});

//подписка на закрытие попапов по оверлею или кнопке
popupList.forEach(popup => popup.addEventListener('mousedown', (evt) => overlayClick(evt, popup)));
closePopupButtons.forEach(button => button.addEventListener('click', closePopupButton));

//отправка формы
placeFormElement.addEventListener('submit', handlerPlaceFormSubmit);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

enableValidation(config);

