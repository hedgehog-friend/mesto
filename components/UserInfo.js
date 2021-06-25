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
      name: this.#name.value,
      description: this.#description.value
    }
  }

  setUserInfo({ newNameValue, newDescriptionValue }) {
    this.#name.value = newNameValue;
    this.#description.value = newDescriptionValue;

  }
}
