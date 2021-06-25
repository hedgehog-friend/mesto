export default class Section {
  #items;
  #renderer;
  #container;

  constructor({ items, renderer }, containerSelector) {
    this.#items = items;
    this.#renderer = renderer;
    this.#container = document.querySelector(containerSelector);
  }

  renderItems() {
    this.#items.forEach((item) => {
      const htmlElement = this.#renderer(item);
      this.#container.append(htmlElement);
    });
  }

  addItem(item) {
    const htmlElement = this.#renderer(item);
    this.#container.prepend(htmlElement);
  }
}
