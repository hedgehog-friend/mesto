import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
  #handleSubmit;

  constructor(handleSubmit, popupSelector) {
    super(popupSelector);
    this.#handleSubmit = handleSubmit;
  }

  #getInputForm() {
    const nameInput = this.popup.querySelector('.popup__form-item_el_name');
    const descriptionInput = this.popup.querySelector('.popup__form-item_el_description');
    return {
      name: nameInput.value,
      description: descriptionInput.value
    }
  };

  setEventListeners() {
    super.setEventListeners();
    this.popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.#handleSubmit(this.#getInputForm());
      this.closePopup();

    })
  }

  closePopup() {
    super.closePopup();
    const formElement = this.popup.querySelector('.popup__form');
    formElement.reset();
  }
}
