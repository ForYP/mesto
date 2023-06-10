import "../pages/index.css";
import {initialCards, config} from '../components/content.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const editButton = document.querySelector('.profile__edit-button');
const editPopupForm = document.querySelector('.popup__form_save_submit');
const editCardForm = document.querySelector('.popup__form_type_submit');
const addButton = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputStatus = document.querySelector('.popup__input_type_status');


const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileStatus: '.profile__status',
});


const popupImage = new PopupWithImage('.popup_type_card-photo');
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (cardData) => {
    getCard.addItem(createCardElement(cardData));
    cardFormValidator.disableButton();
    }
  }
);

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (input) => {
   userInfo.setUserInfo(input);
   profileFormValidator.disableButton();
  }
});

function editProfile() {
  popupProfile.open();
  const user = userInfo.getUserInfo();
  inputName.value = user['name'];
  inputStatus.value = user['status'];
  profileFormValidator.enableValidation();
}

function addCard() {
  popupAddCard.open();
  cardFormValidator.enableValidation();
}

editButton.addEventListener('click', editProfile, config);
addButton.addEventListener('click', addCard, config);

popupAddCard.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();

const createCardElement = (cardData) => {
  const newCard = new Card(cardData, '#card-template', handleCardClick);
  return newCard.generateCard();
}
const getCard = new Section({
  data: initialCards,
  renderer: (cardData) => {
    getCard.addItem(createCardElement(cardData));
  },
  selector: '.elements',
}) 

getCard.renderItems();
const profileFormValidator  = new FormValidator(config, editPopupForm);
const cardFormValidator  = new FormValidator(config, editCardForm);