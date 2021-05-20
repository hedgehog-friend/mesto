//скрыть ошибку
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

//показать ошибку
const showInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

//проверка валидности
const checkInputValidity = (formElement, inputElement, config) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

//наличие невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

//переключение состояний кнопки
const toggleButtonState = (buttonElement, inputList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

//установка слушателей
const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...restConfig }) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  // находим инпуты
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // находим кнопки
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(buttonElement, inputList);
  // установить лисенеры на инпуты
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      //проверить валидность
      checkInputValidity(formElement, inputElement, restConfig);

      toggleButtonState(buttonElement, inputList);
    });
  });
};

const enableValidation = ({ formSelector, ...restConfig }) => {
  //находим формы на странице
  const formList = Array.from(document.querySelectorAll(formSelector));
  //устанавливаем слушатели на инпуты и кнопки
  formList.forEach(formElement => {
    setEventListeners(formElement, restConfig);
  });
}


