import initialCards from './content.js';

const closesAllOverlayPopup = document.querySelectorAll('.popup'); 
const editButton = document.querySelector('.profile__edit-button');
const editOpenPopup = document.querySelector('.popup_type_edit-profile');
const inputName = document.querySelector('.popup__input_type_name');
const inputStatus = document.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const editPopupForm = document.querySelector('.popup__form_save_submit');
const profileAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_add-card');
const cardTemplate = document.getElementById('card-template');
const cardElements = document.querySelector('.elements');
const editCardForm = document.querySelector('.popup__form_type_submit');
const popupCardPhoto = document.querySelector('.popup_type_card-photo');
const popupImg = document.querySelector('.popup__img');
const popupFigcaption = document.querySelector('.popup__figcaption');
const nameInput = editCardForm.querySelector('.popup__input_type_title');
const linkInput = editCardForm.querySelector('.popup__input_type_link');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupEsc);
};

// Закрытие попапа нажатием на Esc

function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

editButton.addEventListener('click', function() {
    openPopup(editOpenPopup);
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;
});

editPopupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = inputName.value;
    const status = inputStatus.value;
    profileName.textContent = name;
    profileStatus.textContent = status;
    closePopup(editOpenPopup);
});

// добавление карточек


profileAddCard.addEventListener('click', () => {
    openPopup(popupCard);
});

const createCardElement = (cardData) => {
  const cardElement = cardTemplate.content.querySelector('.element').cloneNode(true);
  const cardName = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__photo');
  const deleteButton = cardElement.querySelector('.element__del');
  const likeButton = cardElement.querySelector('.element__like');

  cardName.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const handleDelete = () => {
    cardElement.remove();
  };
  const handleLike = () => {
    likeButton.classList.toggle('element__like_active');
  };

  deleteButton.addEventListener('click', handleDelete);
  likeButton.addEventListener('click', handleLike);
  cardImage.addEventListener('click', () => {
    popupImg.src = cardData.link;
    popupFigcaption.textContent = cardData.name;
    popupFigcaption.alt = cardData.name;
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
  const name = nameInput.value;
  const link = linkInput.value;
  const cardData = {
    name,
    link,
  };
  renderCardElementPrepend(createCardElement(cardData));
  closePopup(popupCard);
  event.target.reset();
}

editCardForm.addEventListener('submit', handleEditCardSubmit);

// Закрытие всех попап кликом на оверлей
closesAllOverlayPopup.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  })
});