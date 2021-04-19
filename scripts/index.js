//находим кнопку редактирования профиля
let profileEdit = document.querySelector('.profile__edit');

//находим оверлэй для его последующей активации либо закрытия
let popupMode = document.querySelector('.popup');

//находим кнопку закрытия попапа
let closeProfileEdit = document.querySelector('.popup__profile-exit');

// Находим форму
let formElement = document.querySelector('.popup__form');

// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__form-item_el_name');
let jobInput = document.querySelector('.popup__form-item_el_description');

//находим текущие данные профиля
let currentName = document.querySelector('.profile__name');
let currentJob = document.querySelector('.profile__description');

//функция для изменения состояния попапа через добавление/удаление класса
function togglePopup(evt) {
  evt.preventDefault();
  popupMode.classList.toggle('popup_opened');
}

//функция для закрытия попапа по клику вне контейнера
function overlayClick(event) {
  if (event.target === event.currentTarget) {
    togglePopup(event);
  }
}

//функция по дефолтному присвоению текущих данных профиля в полях ввода
function fillCurrentData() {
  nameInput.value = currentName.textContent;
  jobInput.value = currentJob.textContent;
}

//т.к. togglePopup используется в разных слушателях, а предзаполнение полей формы
//нужно только при открытии, предзаполнение вынесено в функцию currentData и они обе
//объединены в функцию openPopup, которая вызывается при клике на кнопку редактирования профиля
function openPopup(evt) {
  togglePopup(evt);
  fillCurrentData();
}

// Обработчик «отправки» формы
function formSubmitHandler(evt) {
  evt.preventDefault();

  // Получение новых значении из формы
  let newNameInput = nameInput.value;
  let newJobInput = jobInput.value;

  // Замена данных профиля в соответствии с введенными в форме значениями
  currentName.textContent = newNameInput;
  currentJob.textContent = newJobInput;
  togglePopup(evt);//вызов функции для закрытия попапа после сохранения
}

// обработка клавиши enter
function enter(evt) {
  if (evt.keyCode === 13) {
    formSubmitHandler(evt);
  }
}

//открывает форму с предзаполенными полями
profileEdit.addEventListener('click', openPopup);

//закрывает форму по клику на крестик
closeProfileEdit.addEventListener('click', togglePopup);

//для закрытия по клику вне контейнера формы
popupMode.addEventListener('click', overlayClick)

//отправка формы
formElement.addEventListener('submit', formSubmitHandler);
formElement.addEventListener('keydown', enter);
