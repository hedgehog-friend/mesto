class Card {
  #cardText;
  #cardImage;
  #cardSelector;
  #likesCounter;
  #element;
  #likes;
  // #isLiked;
  #handleOpenImage;
  #likeButton;
  #deleteButton;
  #placeImage;
  #id;
  #api;
  #ownerId;
  #currentUserId;
  #confirmDeletion;

  constructor(data, cardSelector, handleOpenImage, confirmDeletion, api, currentUserId) {
    this.#cardText = data.name;
    this.#cardImage = data.link;
    this.#id = data._id;
    this.#likes = data.likes;
    this.#currentUserId = currentUserId;
    this.#ownerId = data.owner._id
    this.#api = api;
    this.#cardSelector = cardSelector;
    // this.#isLiked = false;
    this.#handleOpenImage = handleOpenImage;
    this.#confirmDeletion = confirmDeletion;
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

  //функция проверки наличия лайка текущего пользователя
  #isLiked() {
    // this.#likes.forEach(user => {
    //   return user._id === this.#currentUserId;
    // })
    return this.#likes.some(user => user._id === this.#currentUserId);
    // const likes = this.#likes;
    // for (let user of likes) {
    //   if (this.#currentUserId === user._id) {
    //     return true;
    //   }
    // }
    // return false;
  }

  #updateLikesControl() {
    //обновляем количество лайков
    this.#likesCounter.textContent = this.#likes.length;
    //отображение счетчика (скрываем при нуле)
    if (this.#likes.length === 0) { this.#likesCounter.classList.remove('likesCounter_active') }
    else { this.#likesCounter.classList.add('likesCounter_active') }
    //отображение лайка на основании того, лайкал ли пользователь карточку
    if (this.#isLiked()) {
      this.#likeButton.classList.add('like_active');
    } else { this.#likeButton.classList.remove('like_active'); }
  }

  #like() {
    //проверяем есть ли лайк текущего пользователя в массиве
    if (this.#isLiked()) {
      this.#api.removeLike(this.#id)
        .then((card) => {
          this.#likes = card.likes;
          this.#updateLikesControl()
        })
    } else {
      this.#api.addLike(this.#id)
        .then((card) => {
          this.#likes = card.likes;
          this.#updateLikesControl()
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

  #removeCard() {
    this.#confirmDeletion()
      .then(() => {
        return this.#api.deleteCard(this.#id);
      })
      .then(() => {
        this.#element.remove();
        this.#element.null;
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
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
    this.#likesCounter = this.#element.querySelector('.likesCounter');
    this.#placeImage = this.#element.querySelector('.place__image');
    if (this.#ownerId != this.#currentUserId) {
      this.#deleteButton.classList.add('trash_hidden')
    }

    this.#updateLikesControl();
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
