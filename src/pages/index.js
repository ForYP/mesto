import "../pages/index.css";
import {initialCards, config} from '../utils/content.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithAccept from "../components/PopupWithAccept.js";
import Api from "../components/Api.js";
import {
  editButton,
  formProfile,
  formCard,
  formAvatar,
  addButton,
  inputName,
  inputStatus,
  buttonOpenPopupAvatar,
} from '../utils/constant.js';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: 'ece2eaf9-fc43-4a5f-8c0b-4bbb2e69e0e7',
    'Content-Type': 'application/json'
  }
})


const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileStatus: '.profile__status',
  avatarLink: '.profile__avatar',
});

const popupImage = new PopupWithImage('.popup_type_card-photo');
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const popupAddCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  handleFormSubmit: (cardData) => {
    containerWithCards.addItem(createCardElement(cardData));
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

const popupAvatarEdit = new PopupWithForm({ 
  popupSelector: '.popup_type_edit-avatar', 
  handleFormSubmit: (input) => { 
    userInfo.setUserAvatar(input);
    avatarFormValidator.disableButton(); 
  }, 
});

const popupDeleteCard = new PopupWithAccept({ 
  popupSelector: '.popup_type_remove-card',
});

function deleteCard(card) {
  popupDeleteCard.open(() => {
    card.deleteCardElement();
  })
}

function editAvatar() {
  popupAvatarEdit.open();
}

function editProfile() {
  popupProfile.open();
  const user = userInfo.getUserInfo();
  inputName.value = user['name'];
  inputStatus.value = user['status'];
}
api.getUserInfo().then(res => (res))

function addCard() {
  popupAddCard.open();
}

buttonOpenPopupAvatar.addEventListener('click', editAvatar);
editButton.addEventListener('click', editProfile, config);
addButton.addEventListener('click', addCard, config);

popupAvatarEdit.setEventListeners();
popupAddCard.setEventListeners();
popupProfile.setEventListeners();
popupImage.setEventListeners();
popupDeleteCard.setEventListeners();

const createCardElement = (cardData) => {
  const newCard = new Card(cardData, '#card-template', handleCardClick, deleteCard);
  return newCard.generateCard();
}
const containerWithCards = new Section({
  // data: api.getInitialCards(),
  renderer: (cardData) => {
    containerWithCards.addItem(createCardElement(cardData));
  },
  selector: '.elements',
}) 
api.getInitialCards().then(res => containerWithCards.renderItems(res))

// containerWithCards.renderItems();
const profileFormValidator  = new FormValidator(config, formProfile);
const cardFormValidator  = new FormValidator(config, formCard);
const avatarFormValidator = new FormValidator(config, formAvatar);

avatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
