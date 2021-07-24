import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  profileNameInput,
  profileDescriptionInput,
  profileEdit,
  placeAdd,
  config,
  profileAvatar,
  profileAvatarClick,
} from "../utils/constants.js";
import "./index.css";
import ConfirmationPopup from "../components/ConfirmationPopup.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-26",
  headers: {
    authorization: "ef9c4dff-4cef-417b-a4dd-85f6d4ba3fef",
    "Content-Type": "application/json",
  },
});

//объявляем идентификатор текущего пользователя. Значение будут установлено на основании ответа апи
let currentUserId = null;

const imageSection = new Section((card) => {
  const newCard = new Card(
    card,
    "#template-place",
    handleOpenImage,
    handleDeleteImageConfirmPopup,
    api,
    currentUserId
  );
  return newCard.generateCard();
}, ".places");

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  descriptionSelector: ".profile__description",
});

//подгружаем данные пользователя с сервера
api
  .getUserData()
  .then((data) => {
    userInfo.setUserInfo({
      newNameValue: data.name,
      newDescriptionValue: data.about,
    });
    profileAvatar.src = data.avatar;
    currentUserId = data._id;
    //для корректной работы карточек необходим id пользователя, поэтому загружаем
    // их после его получения
    api
      .getInitialCards()
      .then((data) => {
        data.forEach((item) => imageSection.addItem(item));
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

// Обработчик «отправки» формы
function handleProfileFormSubmit(formValues) {
  // Замена данных профиля в соответствии с введенными в форме значениями
  return api
    .updateUser({
      name: formValues["name-profile"],
      about: formValues["description-profile"],
    })
    .then((user) => {
      userInfo.setUserInfo({
        newNameValue: user.name,
        newDescriptionValue: user.about,
      });
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
      return Promise.reject(err); //
    });
}

function handlePlaceFormSubmit(formValues) {
  // Получение новых значении из формы
  const item = {
    name: formValues["name-place"],
    link: formValues["link"],
  };
  return api
    .createCard(item)
    .then((createdCard) => {
      imageSection.addItem(createdCard);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
      return Promise.reject(err); //передаем ошибку далее, чтобы попап остался открытым
    });
}

function handleAvatarFormSubmit(formValues) {
  return api
    .updateAvatar({
      avatar: formValues["link"],
    })
    .then((user) => {
      profileAvatar.src = user.avatar;
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
      return Promise.reject(err);
    });
}

const popupPlace = new PopupWithForm(
  handlePlaceFormSubmit,
  ".popup_type_place"
);
popupPlace.setEventListeners();
const popupProfile = new PopupWithForm(
  handleProfileFormSubmit,
  ".popup_type_profile"
);
popupProfile.setEventListeners();
const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();
const popupConfirm = new ConfirmationPopup(".popup_type_confirm-deletion");
popupConfirm.setEventListeners();
const popupAvatar = new PopupWithForm(
  handleAvatarFormSubmit,
  ".popup_type_avatar"
);
popupAvatar.setEventListeners();

const editPlaceFormValidator = new FormValidator(config, popupPlace.popup);
editPlaceFormValidator.enableValidation();
const editProfileFormValidator = new FormValidator(config, popupProfile.popup);
editProfileFormValidator.enableValidation();
const editAvatarFormValidator = new FormValidator(config, popupAvatar.popup);
editAvatarFormValidator.enableValidation();

//функция открытия попапа с изображением
function handleOpenImage(name, link) {
  popupImage.open({ name, link });
}

//функция открытия попапа с подтверждением удаления
function handleDeleteImageConfirmPopup() {
  return new Promise(function (resolve, reject) {
    popupConfirm.open(resolve, reject);
  });
}

//функция по дефолтному присвоению текущих данных профиля в полях ввода формы профиля
function fillCurrentData() {
  const userData = userInfo.getUserInfo();
  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
}

//подписка на события клика по кнопкам редактирования профиля, аватора и добавления места
profileEdit.addEventListener("click", () => {
  editProfileFormValidator.resetValidation();
  fillCurrentData();
  popupProfile.open();
});

placeAdd.addEventListener("click", () => {
  editPlaceFormValidator.resetValidation();
  popupPlace.open();
});

profileAvatarClick.addEventListener("click", () => {
  editAvatarFormValidator.resetValidation();
  popupAvatar.open();
});
