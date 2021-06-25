//предзаполненный массив с карточками
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


const config = {
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__input-error_active'
}












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

export {
  initialCards,
  config,
  placesContainer,
  profileEdit,
  placeAdd,
  popupList,
  popupProfile,
  popupPlace,
  popupImage,
  closePopupButtons,
  profileFormElement,
  placeFormElement,
  profileNameInput,
  profileDescriptionInput,
  placeNameInput,
  placeLinkInput,

}