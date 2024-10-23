export default class Card {
  constructor(name, link, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

   _getTemplate = () => {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _removeCard = () => {
    this._element.remove()
  }

  _likeCard = () => {
    this._likebutton.classList.toggle('element__like_active');
  }

  _setEventListeners = () => {
    this._element.querySelector('.element__delete').addEventListener('click', this._removeCard);
    this._likebutton.addEventListener('click', this._likeCard);
    this._image.addEventListener('click', this._handleCardClick)
  }



  renderCard = () => {
    this._element = this._getTemplate();
    this._likebutton = this._element.querySelector('.element__like');
    this._image = this._element.querySelector('.element__img');
    this._image.setAttribute('src', this._link);
    this._image.setAttribute('alt', this._name);
    this._element.querySelector('.element__name').textContent = this._name;
    this._setEventListeners();
    return this._element;
  }
}

