
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';

}

const showInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`)

  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

const checkInputValidity = (formElement, inputElement, config) => {
  //проверить валидность инпута
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, config);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
}
const toggleButtonState = (buttonElement, inputList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
}

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...restConfig }) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
  // находим инпуты
  const inputList = Array.from(formElement.querySelectorAll(inputSelector))
  // находим кнопки
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // утановить лисенеры на инпуты
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      //проверить валидность
      checkInputValidity(formElement, inputElement, restConfig);
      toggleButtonState(buttonElement, inputList)
    })
  })
  toggleButtonState(buttonElement, inputList);
}



const enableValidation = ({ formSelector, ...restConfig }) => {
  //находим формы на странице
  const formList = Array.from(document.querySelectorAll(formSelector));
  //устанавливаем слушатели на инпути и кнопки
  formList.forEach(formElement => {
    setEventListeners(formElement, restConfig);
  });
}


