export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this._name = document.querySelector(nameSelector);
    this._description = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    this._data = {};
    this._data.profileName = this._name.textContent;
    this._data.profileDescription = this._description.textContent;
    return this._data; //возвращаю объект с данными
  }

  setUserInfo(name, description) {
    this._name.textContent = name;
    this._description.textContent = description;
  }
}
