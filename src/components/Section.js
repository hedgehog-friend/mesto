export default class Section {
  #items;
  #renderer;
  #container;

  constructor(renderer, containerSelector) {
    // this.#items = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  addItem(item) {
    const htmlElement = this.#renderer(item);
    this.#container.prepend(htmlElement);
  }
}
