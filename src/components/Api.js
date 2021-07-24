export default class Api {
  #baseUrl;
  #headers;

  constructor({ baseUrl, headers }) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
  }

  //загрузка карточек с сервера
  getInitialCards() {
    const url = `${this.#baseUrl}/cards`;
    return fetch(url, {
      headers: this.#headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //получение данных пользователя
  getUserData() {
    const url = `${this.#baseUrl}/users/me`;
    return fetch(url, {
      headers: this.#headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  createCard(card) {
    const url = `${this.#baseUrl}/cards`;
    return fetch(url, {
      headers: this.#headers,
      method: "POST",
      body: JSON.stringify(card),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    const url = `${this.#baseUrl}/cards/${cardId}`;
    return fetch(url, {
      headers: this.#headers,
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  //метод для обновления инфы при редактировании данных профиля
  updateUser(user) {
    const url = `${this.#baseUrl}/users/me`;
    return fetch(url, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateAvatar(user) {
    const url = `${this.#baseUrl}/users/me/avatar`;
    return fetch(url, {
      method: "PATCH",
      headers: this.#headers,
      body: JSON.stringify(user),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addLike(cardId) {
    const url = `${this.#baseUrl}/cards/likes/${cardId}`;
    return fetch(url, {
      method: "PUT",
      headers: this.#headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  removeLike(cardId) {
    const url = `${this.#baseUrl}/cards/likes/${cardId}`;
    return fetch(url, {
      method: "DELETE",
      headers: this.#headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
