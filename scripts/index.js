//предзаполенный массив с карточками
const initialCards = [
  {
    name: 'Домбай',
    link: './images/places/Dombai.jpg'
  },
  {
    name: 'Эльбрус',
    link: './images/places/Elbrus.png'
  },
  {
    name: 'Карачаево-Черкесия',
    link: './images/places/Karachaevo.png'
  },
  {
    name: 'Минеральные воды',
    link: './images/places/MineralnyeVody.jpg'
  },
  {
    name: 'Пятигорск',
    link: './images/places/beshtau.jpg'
  },
  {
    name: 'Кисловодск',
    link: './images/places/BolshoeSedlo.jpg'
  }
];

//находим template-элемент карточки
const cardTemplate = document.querySelector('#template-place');
//находим контейнер для добавления карточек
const placesContainer = document.querySelector('.places');
//находим кнопку редактирования профиля
const profileEdit = document.querySelector('.profile__edit');
//находим кнопку добавления карточки
const placeAdd = document.querySelector('.place-edit')
//const likeTap = document.querySelectorAll('.place__image')

//находим попапы
const popupProfile = document.querySelector('.popup_type_profile');
const popupPlace = document.querySelector('.popup_type_place');

//находим кнопку закрытия попапа
const closePopupButtons = document.querySelectorAll('.popup__exit');

// Находим форму
const profileFormElement = popupProfile.querySelector('.popup__form');
const placeFormElement = popupPlace.querySelector('.popup__form');
// Находим поля формы в DOM
const profileNameInput = popupProfile.querySelector('.popup__form-item_el_name');
const profileDescriptionInput = popupProfile.querySelector('.popup__form-item_el_description');
const placeNameInput = popupPlace.querySelector('.popup__form-item_el_name');
const placeLinkInput = popupPlace.querySelector('.popup__form-item_el_description');

//находим текущие данные профиля
const currentName = document.querySelector('.profile__name');
const currentDescription = document.querySelector('.profile__description');

function createCard(place) {

  const newCard = cardTemplate.content.querySelector('.place').cloneNode(true);
  const cardText = newCard.querySelector('.place__name');
  const cardImage = newCard.querySelector('.place__image');
  const like = newCard.querySelector('.like')
  const cardRemoveButton = newCard.querySelector('.trash');

  cardText.textContent = place.name;
  cardImage.setAttribute('src', place.link);
  cardImage.setAttribute('alt', `${place.name}. Изображение`);
  like.addEventListener('click', () => like.classList.toggle('like_active'));
  cardRemoveButton.addEventListener('click', () => newCard.remove());

  return newCard;
}


initialCards.forEach(function (currentCard) {
  const newCard = createCard(currentCard);
  placesContainer.append(newCard);
});

//функция для изменения состояния попапа через добавление/удаление класса
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

function closePopup(evt) {
  let popup = evt.target.closest('.popup');
  togglePopup(popup);
}

//функция для закрытия попапа по клику вне контейнера
function overlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt);
  }
}

//функция по дефолтному присвоению текущих данных профиля в полях ввода
function fillCurrentData() {
  profileNameInput.value = currentName.textContent;
  profileDescriptionInput.value = currentDescription.textContent;
}

//т.к. togglePopup используется в разных слушателях, а предзаполнение полей формы
//нужно только при открытии, предзаполнение вынесено в функцию currentData и они обе
//объединены в функцию openPopup, которая вызывается при клике на кнопку редактирования профиля
function openProfilePopup(popup) {

  togglePopup(popup);
  fillCurrentData();
}
// Обработчик «отправки» формы
function profileSubmitHandler(evt) {
  evt.preventDefault();
  // Получение новых значении из формы
  let newName = profileNameInput.value;
  let newDescription = profileDescriptionInput.value;
  // Замена данных профиля в соответствии с введенными в форме значениями
  currentName.textContent = newName;
  currentDescription.textContent = newDescription;
  closePopup(evt);//вызов функции для закрытия попапа после сохранения
}

function placeSubmitHandler(evt) {
  evt.preventDefault();
  // Получение новых значении из формы
  let newPlaceName = placeNameInput.value;
  let newPlaceLink = placeLinkInput.value;
  placeFormElement.reset();
  const newCard = createCard({ name: newPlaceName, link: newPlaceLink });
  placesContainer.prepend(newCard);

  closePopup(evt);//вызов функции для закрытия попапа после сохранения
}

//открывает форму с предзаполненными полями
profileEdit.addEventListener('click', evt => openProfilePopup(popupProfile));
placeAdd.addEventListener('click', evt => togglePopup(popupPlace));
//закрывает форму по клику на крестик
closePopupButtons.forEach(button => button.addEventListener('click', closePopup));
//для закрытия по клику вне контейнера формы
popupProfile.addEventListener('mousedown', overlayClick);
popupPlace.addEventListener('mousedown', overlayClick);

//отправка формы
placeFormElement.addEventListener('submit', placeSubmitHandler);
profileFormElement.addEventListener('submit', profileSubmitHandler);

