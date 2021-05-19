//находим template-элемент карточки
const cardTemplate = document.querySelector('#template-place');
//находим контейнер для добавления карточек
const placesContainer = document.querySelector('.places');
//находим кнопку редактирования профиля
const profileEdit = document.querySelector('.profile__edit');
//находим кнопку добавления карточки
const placeAdd = document.querySelector('.place-edit')

//находим попапы
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');
const popupImage = document.querySelector('.popup_type_image')

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

//функция открытия попапа с изображением
function openImage(place) {

  image.setAttribute('src', place.link);
  image.setAttribute('alt', `${place.name}. Изображение`);
  caption.textContent = place.name;
  openPopup(popupImage);
}

//цикл для загрузки мест из массива при открытии страницы
initialCards.forEach(function (currentCard) {
  const newCard = createCard(currentCard);
  placesContainer.append(newCard);
});

//функция для закрытия попапа — удаляет класс видимости попапа, сбрасывает данные
//из форм, снимает слушатели на события попапа
function closePopup(popup) {
  const closePopupButton = popup.querySelector('.popup__exit')
  popup.classList.remove('popup_opened');
  if (placeFormElement) {
    placeFormElement.reset();
  };
  document.removeEventListener('keydown', (evt) => closeEscPopup(evt, popup));
  popup.removeEventListener('mousedown', (evt) => overlayClick(evt, popup));
  closePopupButton.removeEventListener('click', () => closePopup(popup));
}

//функция для закрытия попапа по клику вне контейнера
function overlayClick(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
}

//функция закрытия попапов по esc
function closeEscPopup(evt, popup) {
  if (evt.key === 'Escape') {
    closePopup(popup);
  };
}

//функция по дефолтному присвоению текущих данных профиля в полях ввода формы профиля
function fillCurrentData() {
  profileNameInput.value = currentName.textContent;
  profileDescriptionInput.value = currentDescription.textContent;
}

//функция для открытия попапа профиля, объединяющая открытие и предзаполнение полей
//ввода текущими данными пользователя плюс добавляет слушатели на события попапа
function openPopup(popup) {
  const closePopupButton = popup.querySelector('.popup__exit')
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', (evt) => closeEscPopup(evt, popup));
  popup.addEventListener('mousedown', (evt) => overlayClick(evt, popup));
  closePopupButton.addEventListener('click', () => closePopup(popup));
  if (popup === popupProfile) {
    fillCurrentData();
  }
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



//подписка на события клика по кнопкам редактирования профиля и добавления места
profileEdit.addEventListener('click', () => openPopup(popupProfile));
placeAdd.addEventListener('click', () => openPopup(popupPlace));

//отправка формы
placeFormElement.addEventListener('submit', handlerPlaceFormSubmit);
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

//валидация форм
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__input-error_active'
});

