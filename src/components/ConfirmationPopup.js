import Popup from './Popup.js';


export default class ConfirmationPopup extends Popup {
  #confirm;
  #reject;

  constructor(popupSelector) {
    super(popupSelector);
  }
  //принимает колбеки с помощью которых переводит далее промис подтверждения
  // в одно из двух его состояний и открывает попап
  open(confirm, reject) {
    super.open()
    this.#confirm = confirm;
    this.#reject = reject;
  }

  setEventListeners() {
    super.setEventListeners();
    const confirmPopupButton = this.popup.querySelector('.popup__save');
    // подписка на клик кнопки подтверждения удаления карточки
    confirmPopupButton.addEventListener('click', () => {
      this.#confirm(); //переводит промис в состояние resolved() и закрывает попап
      super.closePopup();

    })
  }

  //закрывает поппап и  отклоняет промис
  closePopup() {
    super.closePopup();
    this.#reject();
  }
}
