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
import './index.css';

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
  userInfo.setUserInfo({ newNameValue: name, newDescriptionValue: description });
}

function handlePlaceFormSubmit({ name, description }) {
  // Получение новых значении из формы
  const item = {
    name: name,
    link: description
  };

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
}

//функция по дефолтному присвоению текущих данных профиля в полях ввода формы профиля
function fillCurrentData() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}


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
