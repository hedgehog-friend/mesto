export default class Section {
  #renderer;
  #container;

  constructor(renderer, containerSelector) {
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  addItem(item) {
    const htmlElement = this.#renderer(item);
    this.#container.prepend(htmlElement);
  }
}
