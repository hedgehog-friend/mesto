import dombaiImage from '../images/places/Dombai.jpg';
import elbrusImage from '../images/places/Elbrus.png';
import karachaevoImage from '../images/places/Karachaevo.png';
import minvodyImage from '../images/places/MineralnyeVody.jpg';
import beshtauImage from '../images/places/beshtau.jpg';
import kislovodskImage from '../images/places/BolshoeSedlo.jpg';

//предзаполненный массив с карточками
const initialCards = [
  {
    name: 'Домбай',
    link: dombaiImage
  },
  {
    name: 'Эльбрус',
    link: elbrusImage
  },
  {
    name: 'Карачаево-Черкесия',
    link: karachaevoImage
  },
  {
    name: 'Минеральные воды',
    link: minvodyImage
  },
  {
    name: 'Пятигорск',
    link: beshtauImage
  },
  {
    name: 'Кисловодск',
    link: kislovodskImage
  }
];


const config = {
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__save',
  inputErrorClass: 'popup__form-item_type_error',
  errorClass: 'popup__input-error_active'
}


//находим кнопку редактирования профиля
const profileEdit = document.querySelector('.profile__edit');
//находим кнопку добавления карточки
const placeAdd = document.querySelector('.place-edit')

// Находим поля формы пользователя в DOM
const profileNameInput = document.querySelector('#name-profile');
const profileDescriptionInput = document.querySelector('#description-profile');



export {
  initialCards,
  config,
  profileEdit,
  placeAdd,
  profileNameInput,
  profileDescriptionInput,
}
