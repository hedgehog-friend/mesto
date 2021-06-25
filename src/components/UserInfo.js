// import {currentName, currentDescription} from '../utils/constants.js';

export default class UserInfo {
  #name;
  #description;

  constructor({ nameSelector, descriptionSelector }) {
    this.#name = document.querySelector(nameSelector);
    this.#description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {
      name: this.#name.textContent,
      description: this.#description.textContent
    }
  }

  setUserInfo({ newNameValue, newDescriptionValue }) {
    this.#name.textContent = newNameValue;
    this.#description.textContent = newDescriptionValue;

  }
}
