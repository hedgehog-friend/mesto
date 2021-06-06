class Card {
  #cardText;
  #cardImage;
  #cardSelector;
  #element;
  #isLiked;
  #handleOpenImage;

  constructor(data, cardSelector, handleOpenImage) {
    this.#cardText = data.name;
    this.#cardImage = data.link;
    this.#cardSelector = cardSelector;
    this.#isLiked = false;
    this.#handleOpenImage = handleOpenImage;
  }

  #setEventListeners() {
    this.#element.querySelector('.like').addEventListener('click', () => {
      this.#like()
    });

    this.#element.querySelector('.trash').addEventListener('click', () => {
      this.#removeCard()
    });

    this.#element.querySelector('.place__image').addEventListener('click', () => {
      this.#handleOpenImage(this.#cardText, this.#cardImage)
    });
  }

  #like() {
    this.#element.querySelector('.like').classList.toggle('like_active');
    this.#isLiked = !this.#isLiked;
  }

  #removeCard() {
    this.#element.remove();
    this.#element.null;
  }

  #getTemplate() {
    const newCard = document
      .querySelector(this.#cardSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return newCard;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    this.#element = this.#getTemplate();
    this.#setEventListeners();

    // Добавим данные
    this.#element.querySelector('.place__image').src = this.#cardImage;
    this.#element.querySelector('.place__image').alt = this.#cardText;
    this.#element.querySelector('.place__name').textContent = this.#cardText;

    // Вернём элемент наружу
    return this.#element;
  }
}

export default Card
