import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  #handleSubmit;
  #inputList;
  #formElement;
  #saveButton;

  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this.#handleSubmit = handleSubmit;
    this.#inputList = Array.from(this.popup.querySelectorAll('.popup__form-item'));
    this.#formElement = this.popup.querySelector('.popup__form');
    this.#saveButton = this.popup.querySelector('.popup__save');
  }

  #getInputValues() {
    const formValues = {};
    this.#inputList.forEach(input => formValues[input.name] = input.value);
    return formValues;
  };

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#saveButton.textContent = 'Сохранить...';
      this.#handleSubmit(this.#getInputValues())
        .then(() => this.closePopup())
        .finally(() => this.#saveButton.textContent = 'Сохранить');
    })
  }

  closePopup() {
    super.closePopup();
    this.#formElement.reset();
  }
}
