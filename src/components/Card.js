class Card {
  #cardText;
  #cardImage;
  #cardSelector;
  #element;
  #isLiked;
  #handleOpenImage;
  #likeButton;
  #deleteButton;
  #placeImage;


  constructor(data, cardSelector, handleOpenImage) {
    this.#cardText = data.name;
    this.#cardImage = data.link;
    this.#cardSelector = cardSelector;
    this.#isLiked = false;
    this.#handleOpenImage = handleOpenImage;

  }

  #setEventListeners() {
    this.#likeButton.addEventListener('click', () => {
      this.#like()
    });

    this.#deleteButton.addEventListener('click', () => {
      this.#removeCard()
    });

    this.#placeImage.addEventListener('click', () => {
      this.#handleOpenImage(this.#cardText, this.#cardImage)
    });
  }

  #like() {
    this.#likeButton.classList.toggle('like_active');
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
    this.#likeButton = this.#element.querySelector('.like');
    this.#deleteButton = this.#element.querySelector('.trash');
    this.#placeImage = this.#element.querySelector('.place__image')


    this.#setEventListeners();

    // Добавим данные
    this.#placeImage.src = this.#cardImage;
    this.#placeImage.alt = this.#cardText;
    this.#element.querySelector('.place__name').textContent = this.#cardText;

    // Вернём элемент наружу
    return this.#element;
  }
}

export default Card
