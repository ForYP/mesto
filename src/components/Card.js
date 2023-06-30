export default class Card {
  constructor (cardData, templateSelector, handleCardClick, deleteCard, userInfo, handleLikeClick) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._alt = cardData.name;
    this._ownerId = cardData.owner._id;
    this._myId = userInfo._myId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCard = deleteCard;
    this._cardId = cardData._id;
    this._likes = cardData.likes;
    this._handleLikeClick = handleLikeClick
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
    this._image = this._element.querySelector('.element__photo');
    this._image.src = this._link;
    this._image.alt = this._alt;
    this._element.querySelector('.element__title').textContent = this._name;
    this._setEventListeners();
    this.updateLikes(this._likes)
    if (this._myId !== this._ownerId) {
      this._deleteButton.remove();
    }
    
    return this._element;
  }

  _setEventListeners () {
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__del');
    this._reactionCounter = this._element.querySelector('.element__reaction-counter');
    this._deleteButton.addEventListener('click', () => {
        this._deleteCard(this, this._cardId);
      });
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick(this);
    })

    this._image.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  updateLikes(likes) {
    this._likes = likes;
    this._likeButton.classList.toggle('element__like_active', this.isLiked());
    this._reactionCounter.textContent = this._likes.length;
  }

  deleteCardElement () {
    this._element.remove();
    this._element = null;
  }

  isLiked () {
    return this._likes.some((like) => {
      return like._id === this._myId
    })
  }
}