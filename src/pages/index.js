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
function handleProfileFormSubmit(formValues) {
  // Замена данных профиля в соответствии с введенными в форме значениями
  userInfo.setUserInfo({ newNameValue: formValues['name-profile'], newDescriptionValue: formValues['description-profile'] });
}

function handlePlaceFormSubmit(formValues) {
  // Получение новых значении из формы
  const item = {
    name: formValues['name-place'],
    link: formValues['link']
  };

  imageSection.addItem(item);
}

const popupPlace = new PopupWithForm(handlePlaceFormSubmit, '.popup_type_place');
popupPlace.setEventListeners();
const popupProfile = new PopupWithForm(handleProfileFormSubmit, '.popup_type_profile')
popupProfile.setEventListeners();
const popupImage = new PopupWithImage('.popup_type_image');
popupImage.setEventListeners();

const editPlaceFormValidator = new FormValidator(config, popupPlace.popup);
editPlaceFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(config, popupProfile.popup);
editProfileFormValidator.enableValidation();


//функция открытия попапа с изображением
function handleOpenImage(name, link) {
  popupImage.open({ name, link });
}

//функция по дефолтному присвоению текущих данных профиля в полях ввода формы профиля
function fillCurrentData() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}


//подписка на события клика по кнопкам редактирования профиля и добавления места
profileEdit.addEventListener('click', () => {
  editProfileFormValidator.resetValidation();
  fillCurrentData();
  popupProfile.open();
});

placeAdd.addEventListener('click', () => {
  editPlaceFormValidator.resetValidation();
  popupPlace.open();
});
