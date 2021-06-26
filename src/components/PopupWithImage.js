import Popup from './Popup.js';


export default class PopupWithImage extends Popup {
  #image;
  #caption;

  constructor(popupSelector) {
    super(popupSelector);
    this.#image = this.popup.querySelector('.popup__wide-image');
    this.#caption = this.popup.querySelector('.popup__name-wide-image');
  }

  open({ name, link }) {
    this.#image.src = link;
    this.#image.alt = name;
    this.#caption.textContent = name;
    super.open()
  }
}
