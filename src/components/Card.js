class Card {
  #cardText;
  #cardImage;
  #cardSelector;
  #likesCounter;
  #element;
  #likes;
  #handleOpenImage;
  #likeButton;
  #deleteButton;
  #placeImage;
  #id;
  #api;
  #ownerId;
  #currentUserId;
  #confirmDeletion;

  //передаю экземпляр api, т.к. используется 3 метода из него
  //(лайк, удаление лайка и удаление карточки), т.е. если передавать колбеками, то
  //получается немного громоздкий список параметров конструктора
  // confirmDeletion — функция, которая создает промис, который будет
  // подтвержден или отклонен в зависимости от ответа пользователя в попапе подтверждения

  constructor(data, cardSelector, handleOpenImage, confirmDeletion, api, currentUserId) {
    this.#cardText = data.name;
    this.#cardImage = data.link;
    this.#id = data._id;
    this.#likes = data.likes;
    this.#currentUserId = currentUserId;
    this.#ownerId = data.owner._id
    this.#api = api;
    this.#cardSelector = cardSelector;
    this.#handleOpenImage = handleOpenImage;
    this.#confirmDeletion = confirmDeletion;
  }

  //функция слушателей для для лайка, удаления и открытия попапа места
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
    return this.#likes.some(user => user._id === this.#currentUserId);
  }

  #updateLikesControl() {
    //обновляем количество лайков
    this.#likesCounter.textContent = this.#likes.length;
    //отображение счетчика (скрываем при нуле)
    if (this.#likes.length === 0) { this.#likesCounter.classList.remove('likesCounter_active') }
    else { this.#likesCounter.classList.add('likesCounter_active') }
    //отображение дизайна лайка на основании того, лайкал ли пользователь карточку
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

  //с помощью confirmDletion запрашивает пользовательское подтверждение
  // и если получает его, то вызывает метод удаления у апи,
  // а затем удаляет карточку из интерфейса пользователя
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
    //проверяем владельца карточки и скрываем иконку удаления для чужих карточек
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
