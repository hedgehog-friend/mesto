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

  // другие методы работы с API
}


