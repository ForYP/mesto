import initialCards from './content.js';

const editButton = document.querySelector('.profile__edit-button');
const editOpenPopup = document.querySelector('.popup_type_edit-profile');
const editClosePopup = document.querySelector('.popup__close_edit_profile');
const inputName = document.querySelector('.popup__input_type_name');
const inputStatus = document.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const editPopupForm = document.querySelector('.popup__form_save_submit');

function openPopup(popup) {
    popup.classList.add('popup_opened');
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

editButton.addEventListener('click', function() {
    openPopup(editOpenPopup);
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;
});

editClosePopup.addEventListener('click', function() {
    closePopup(editOpenPopup);
});

editPopupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = inputName.value;
    const status = inputStatus.value;
    profileName.textContent = name;
    profileStatus.textContent = status;
    closePopup(editOpenPopup);
});

// block card

const profileAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_add-card');
profileAddCard.addEventListener('click', () => {
    openPopup(popupCard);
});

const popupCloseCard = document.querySelector('.popup__close_card');
popupCloseCard.addEventListener('click', () => {
    closePopup(popupCard);
});

const cardTemplate = document.getElementById('card-template');
const cardElements = document.querySelector('.elements');
const editCardForm = document.querySelector('.popup__form_type_submit');

const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);

  const cardName = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__photo');

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector('.element__del');
  const likeButton = cardElement.querySelector('.element__like');

  const handleDelete = () => {
    cardElement.remove();
  };
  const handleLike = () => {
    likeButton.classList.toggle('element__like_active');
  };

  deleteButton.addEventListener('click', handleDelete);
  likeButton.addEventListener('click', handleLike);
  cardImage.addEventListener('click', () => {
    const popupImg = document.querySelector('.popup__img');
    const popupFigcaption = document.querySelector('.popup__figcaption');
    popupImg.src = cardData.link;
    popupFigcaption.textContent = cardData.name;
    openPopup(popupCardPhoto);
  });
  
  return cardElement;
};

const renderCardElement = (cardElement) => {
  cardElements.append(cardElement);
};
const renderCardElementPrepend = (cardElement) => {
  cardElements.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCardElement(createCardElement(card));
});

const handleEditCardSubmit = (event) => {
  event.preventDefault();
  const nameInput = editCardForm.querySelector('.popup__input_type_title');
  const linkInput = editCardForm.querySelector('.popup__input_type_link');

  const name = nameInput.value;
  const link = linkInput.value;

  const cardData ={
    name,
    link,
  };
  renderCardElementPrepend(createCardElement(cardData));
  closePopup(popupCard);
}

editCardForm.addEventListener('submit', handleEditCardSubmit);

// block card photo

const popupCardPhoto = document.querySelector('.popup_type_card-photo');
const popupCloseCardPhoto = document.querySelector('.popup__close_card_photo');
popupCloseCardPhoto.addEventListener('click', () => {
  closePopup(popupCardPhoto);
});