export default class Popup {
  constructor(popupSelector) {
    this.popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    };
  }

  #overlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
      this.closePopup();
    }
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  };

  closePopup() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  setEventListeners() {
    const closePopupButton = this.popup.querySelector('.popup__exit');
    closePopupButton.addEventListener('click', () => this.closePopup());
    this.popup.addEventListener('mousedown', (evt) => this.#overlayClick(evt));
  };
}
