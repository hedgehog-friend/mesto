import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  #name;
  #link;


  constructor(data, popupSelector) {
    super(popupSelector);
    this.#name = data.name;
    this.#link = data.link;
  }

  openPopup() {
    const image = this.popup.querySelector('.popup__wide-image');
    const caption = this.popup.querySelector('.popup__name-wide-image');
    image.src = this.#link;
    image.alt = this.#name;
    caption.textContent = this.#name;
    super.openPopup()
  }
}
