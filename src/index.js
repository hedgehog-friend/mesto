import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {
  initialCards,
  profileNameInput,
  profileDescriptionInput,
  profileEdit,
  placeAdd,
  config
} from '../utils/constants.js';
import '../pages/index.css';

const imageSection = new Section({
  items: initialCards,
  renderer: (card) => {
    const newCard = new Card(card, '#template-place', handleOpenImage);
    return newCard.generateCard();
  }
}, '.places');

imageSection.renderItems();

const userInfo = new UserInfo({ nameSelector: '.profile__name', descriptionSelector: '.profile__description' });


// Обработчик «отправки» формы
function handleProfileFormSubmit({ name, description }) {
  // Замена данных профиля в соответствии с введенными в форме значениями
  userInfo.setUserInfo({ newNameValue: name, newDescriptionValue: description })
}

function handlePlaceFormSubmit({ name, description }) {
  // Получение новых значении из формы
  const item = {
    name: name,
    link: description
  }

  imageSection.addItem(item);
}

const popupPlace = new PopupWithForm(handlePlaceFormSubmit, '.popup_type_place');
popupPlace.setEventListeners();
const popupProfile = new PopupWithForm(handleProfileFormSubmit, '.popup_type_profile')
popupProfile.setEventListeners();

const editPlaceFormValidator = new FormValidator(config, popupPlace.popup);
editPlaceFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(config, popupProfile.popup);
editProfileFormValidator.enableValidation();


//функция открытия попапа с изображением
function handleOpenImage(name, link) {
  const popupImage = new PopupWithImage({ name, link }, '.popup_type_image');
  popupImage.setEventListeners();
  popupImage.openPopup();

  // //находим элементы попапа с изображением
  // const image = popupImage.querySelector('.popup__wide-image');
  // const caption = popupImage.querySelector('.popup__name-wide-image');
  // image.src = link;
  // image.alt = name;
  // caption.textContent = name;
  // openPopup(popupImage);
}





// const dataProfileList = new Section({
//   data: items, renderer: () => {

//   }
// }, containerSelector);



// //создаем новый объект-карточку
// function renderCard(item) {
//   const newCard = new Card(item, '#template-place', handleOpenImage);
//   const newElement = newCard.generateCard();
//   return newElement;
// }

// initialCards.forEach((item) => {
//   // Создадим экземпляр карточки и добавляем в DOM
//   placesContainer.append(renderCard(item));
// });


// enableValidation(config);

// const config = {
//   inputSelector: '.popup__form-item',
//   submitButtonSelector: '.popup__save',
//   inputErrorClass: 'popup__form-item_type_error',
//   errorClass: 'popup__input-error_active'
// }




//функция для закрытия попапа — удаляет класс видимости попапа, сбрасывает данные
//из форм, снимает слушатели на события попапа
// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeEscPopup);
// }


// функция для закрытия попапа по клику вне контейнера
// function overlayClick(evt, popup) {
//   if (evt.target.classList.contains('popup')) {
//     closePopup(popup);
//   }
// }

//функция закрытия попапов по кнопке закрытия
// function closePopupButton(evt) {
//   if (evt.target.classList.contains('popup__exit')) {
//     const popup = evt.target.closest('.popup');
//     closePopup(popup);
//   }
// }

//функция закрытия попапов по esc
// function closeEscPopup(evt) {
//   if (evt.key === 'Escape') {
//     const popup = document.querySelector('.popup_opened');
//     closePopup(popup);
//   };
// }

//функция по дефолтному присвоению текущих данных профиля в полях ввода формы профиля
function fillCurrentData() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}

// ф-ция открытия попапа, включающая добавление слушателя по esc
// function openPopup(popup) {
//   popup.classList.add('popup_opened');

//   document.addEventListener('keydown', closeEscPopup);
// }



//подписка на события клика по кнопкам редактирования профиля и добавления места
profileEdit.addEventListener('click', () => {
  editProfileFormValidator.prepareForm();
  fillCurrentData();
  popupProfile.openPopup();
});

placeAdd.addEventListener('click', () => {
  editPlaceFormValidator.prepareForm();
  popupPlace.openPopup();
  // placeFormElement.reset();
});

//подписка на закрытие попапов по оверлею или кнопке
// popupList.forEach(popup => popup.addEventListener('mousedown', (evt) => overlayClick(evt, popup)));
// closePopupButtons.forEach(button => button.addEventListener('click', closePopupButton));


// //отправка формы
// placeFormElement.addEventListener('submit', handlerPlaceFormSubmit);
// profileFormElement.addEventListener('submit', handleProfileFormSubmit);

