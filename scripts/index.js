import {initialCards, config} from './content.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'

const closesAllOverlayPopup = document.querySelectorAll('.popup'); 
const editButton = document.querySelector('.profile__edit-button');
const editOpenPopup = document.querySelector('.popup_type_edit-profile');
const inputName = document.querySelector('.popup__input_type_name');
const inputStatus = document.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const editPopupForm = document.querySelector('.popup__form_save_submit');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupCard = document.querySelector('.popup_type_add-card');
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
};

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

// открытие попапа с фото 

function handlePhotoCardsClick (name, link) {
  openPopup(popupCardPhoto)
  popupFigcaption.textContent = name;
  popupImg.src = link;
  popupFigcaption.alt = name;
}

// добавление карточек

buttonAddCard.addEventListener('click', () => {
    openPopup(popupCard);
});
const createCardElement = (cardData) => {
  const newCard = new Card(cardData, '#card-template', handlePhotoCardsClick);
  return newCard.generateCard();
}

function renderCardElement (cardElement) {
    cardElements.prepend(cardElement);
  }

function renderCardElementAdd  (cardElement) {
  cardElements.append(cardElement);
}

initialCards.forEach(cardData => {
  renderCardElementAdd(createCardElement(cardData));
})

const handleEditCardSubmit = (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const link = linkInput.value;
  const cardData = {
    name,
    link,
  };
  // createCardElement(cardData);
  renderCardElement(createCardElement(cardData));
  event.target.reset();
  closePopup(popupCard);
}

editCardForm.addEventListener('submit', handleEditCardSubmit);

// валидация форм

const profileFormValidator  = new FormValidator(config, editPopupForm);
const cardFormValidator  = new FormValidator(config, editCardForm);

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();