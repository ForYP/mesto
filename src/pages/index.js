import "../pages/index.css";
import {initialCards, config} from '../utils/content.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  editButton,
  formProfile,
  formCard,
  addButton,
  inputName,
  inputStatus,
  buttonOpenPopupAvatar,
  inputLink
} from '../utils/constant.js';

const userInfo = new UserInfo({
  profileName: '.profile__name',
  profileStatus: '.profile__status',
  avatar: 'profile__avatar',
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
//-----------
const popupAvatarEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: (input) => {
    userInfo.setUserAvatar(input.link);
    profileFormValidator.disableButton();
  }
});

function editAvatar() {
  // inputLink.value = '';
  popupAvatarEdit.open();
}

function editProfile() {
  popupProfile.open();
  const user = userInfo.getUserInfo();
  inputName.value = user['name'];
  inputStatus.value = user['status'];
}

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

const createCardElement = (cardData) => {
  const newCard = new Card(cardData, '#card-template', handleCardClick);
  return newCard.generateCard();
}
const containerWithCards = new Section({
  data: initialCards,
  renderer: (cardData) => {
    containerWithCards.addItem(createCardElement(cardData));
  },
  selector: '.elements',
}) 

containerWithCards.renderItems();
const profileFormValidator  = new FormValidator(config, formProfile);
const cardFormValidator  = new FormValidator(config, formCard);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
