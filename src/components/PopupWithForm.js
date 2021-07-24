import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  #handleSubmit;
  #inputList;
  #formElement;
  #saveButton;

  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this.#handleSubmit = handleSubmit; //функция, вызывая к-рую попап уведомляет о том
    // что пользователь нажал на кнопку сохранить. Должна возвращать промис. Если промис
    // выполнился успешно, попап закрывается
    this.#inputList = Array.from(
      this.popup.querySelectorAll(".popup__form-item")
    );
    this.#formElement = this.popup.querySelector(".popup__form");
    this.#saveButton = this.popup.querySelector(".popup__save");
  }

  #getInputValues() {
    const formValues = {};
    this.#inputList.forEach((input) => (formValues[input.name] = input.value));
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.#saveButton.textContent = "Сохранить..."; //меняем текст кнопки на время сохранения
      this.#handleSubmit(this.#getInputValues())
        .then(() => this.closePopup())
        .finally(() => (this.#saveButton.textContent = "Сохранить"));
    });
  }

  closePopup() {
    super.closePopup();
    this.#formElement.reset();
  }
}
