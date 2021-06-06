class FormValidator {
  #inputSelector;
  #submitButtonSelector;
  #inputErrorClass;
  #errorClass;
  #currentForm;
  #inputList;
  #buttonElement;

  constructor(data, currentForm) {
    this.#inputSelector = data.inputSelector;
    this.#submitButtonSelector = data.submitButtonSelector;
    this.#inputErrorClass = data.inputErrorClass;
    this.#errorClass = data.errorClass;
    this.#currentForm = currentForm;
  }

  //скрыть ошибку
  #hideInputError = (inputElement) => {
    const errorElement = this.#currentForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.#inputErrorClass);
    errorElement.classList.remove(this.#errorClass);
    errorElement.textContent = '';
  }

  //показать ошибку
  #showInputError = (inputElement) => {
    const errorElement = this.#currentForm.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.#inputErrorClass);
    errorElement.classList.add(this.#errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  //проверка валидности
  #checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this.#hideInputError(inputElement);
    } else {
      this.#showInputError(inputElement);
    }
  }

  //наличие невалидного поля
  #hasInvalidInput = () => {
    return this.#inputList.some(inputElement => !inputElement.validity.valid);
  }

  //переключение состояний кнопки
  #toggleButtonState = () => {
    if (this.#hasInvalidInput()) {
      this.#buttonElement.disabled = true;
    } else {
      this.#buttonElement.disabled = false;
    }
  }

  //установка слушателей
  #setEventListeners = () => {
    this.#currentForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    // находим инпуты
    this.#inputList = Array.from(this.#currentForm.querySelectorAll(this.#inputSelector));
    // находим кнопки
    this.#buttonElement = this.#currentForm.querySelector(this.#submitButtonSelector);
    this.#toggleButtonState();
    // установить лисенеры на инпуты
    this.#inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        //проверить валидность
        this.#checkInputValidity(inputElement);

        this.#toggleButtonState();
      });
    });
  };

  //чистка формы от ошибок при валидации на предыдущем открытии попапа
  prepareForm = () => {
    this.#currentForm.querySelector(this.#submitButtonSelector).disabled = true;
    const spanErrorList = Array.from(this.#currentForm.querySelectorAll('.popup__input-error'));
    spanErrorList.forEach(element => element.classList.remove(this.#errorClass));
    const inputErrorList = Array.from(this.#currentForm.querySelectorAll('.popup__form-item'));
    inputErrorList.forEach(element => element.classList.remove(this.#inputErrorClass));
  }

  enableValidation = () => {

    this.#setEventListeners();
  }
}

export default FormValidator
