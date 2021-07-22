import Popup from './Popup.js';


export default class ConfirmationPopup extends Popup {
  #confirm;
  #reject;

  constructor(popupSelector) {
    super(popupSelector);
  }
  //принять колбеки в опен
  //вызывать колбек закрытия при закрытии
  // вызывать колбек подтверждения при сабмите формы
  open(confirm, reject) {
    super.open()
    this.#confirm = confirm;
    this.#reject = reject;
  }



  setEventListeners() {
    super.setEventListeners();
    const confirmPopupButton = this.popup.querySelector('.popup__save');
    confirmPopupButton.addEventListener('click', (evt) => {
      this.#confirm();
      this.closePopup();

    })
  }

  closePopup() {
    super.closePopup();
    this.#reject();
  }
}
