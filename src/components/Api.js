export default class Api {
  #baseUrl;
  #headers;

  constructor({ baseUrl, headers }) {
    this.#baseUrl = baseUrl;
    this.#headers = headers;
  }

  getInitialCards() {
    const url = `${this.#baseUrl}/cards`;
    return fetch(url, {
      headers: this.#headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  getUserData() {
    const url = `${this.#baseUrl}/users/me`;
    return fetch(url, {
      headers: this.#headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  createCard(card) {
    const url = `${this.#baseUrl}/cards`;
    return fetch(url, {
      headers: this.#headers,
      method: 'POST',
      body: JSON.stringify(card)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  deleteCard(cardId) {
    const url = `${this.#baseUrl}/cards/${cardId}`;
    return fetch(url, {
      headers: this.#headers,
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }
}
