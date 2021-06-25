// import { } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
  };

  #handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    };
  }

  #overlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      this.closePopup();
    }
  }

  openPopup() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this.#handleEscClose);
  };

  closePopup() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this.#handleEscClose);
  };

  setEventListeners() {
    const closePopupButton = this.popup.querySelector('.popup__exit');
    closePopupButton.addEventListener('click', this.closePopup);
    this.popup.addEventListener('mousedown', this.#overlayClick);
  };
}
