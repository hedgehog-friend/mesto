import Popup from "./Popup.js";

export default class ConfirmationPopup extends Popup {
  #actionOnConfirmation;

  constructor(popupSelector) {
    super(popupSelector);
  }

  //принимает колбеки с помощью которых переводит далее промис подтверждения
  // в одно из двух его состояний и открывает попап
  open(actionOnConfirmation) {
    super.open();
    this.#actionOnConfirmation = actionOnConfirmation;
  }

  setEventListeners() {
    super.setEventListeners();
    const confirmPopupButton = this.popup.querySelector(".popup__save");
    // подписка на клик кнопки подтверждения удаления карточки
    confirmPopupButton.addEventListener("click", () => {
      this.#actionOnConfirmation().then(() => {
        this.closePopup();
      });
    });
  }
}
