export default class Card {
  constructor (cardData, templateSelector, handlePhotoCardsClick) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.name;
    this._templateSelector = templateSelector;
    this._handlePhotoCardsClick = handlePhotoCardsClick;
  }

  _getTemplate () {
    const newCardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector('.element')
      .cloneNode(true);

    return newCardElement;
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__photo').src = this._link;
    this._element.querySelector('.element__photo').alt = this._alt;
    this._element.querySelector('.element__title').textContent = this._name;

    return this._element;
  }

  _setEventListeners = () => {
    this._likeButton = this._element.querySelector('.element__like');
    this._element.querySelector('.element__del').addEventListener('click', () => {
        this._deleteCardElement()
      });

    this._likeButton.addEventListener('click', () => {
      this._handleCardLike();
    })

    this._element.querySelector('.element__photo').addEventListener('click', () => {
        this._handlePhotoCardsClick(this._name, this._link);
      });
  }

  _deleteCardElement = () => {
    this._element.remove();
    this._element = null;
  }

  _handleCardLike = () => {
    this._likeButton.classList.toggle('element__like_active');
  }
}