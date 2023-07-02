import "../pages/index.css";
import { config } from '../utils/content.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithAccept from "../components/PopupWithAccept.js";
import api from "../components/Api.js";
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
    return api.updateCards(cardData.name, cardData.link
    )
      .then(res => {
        containerWithCards.addItem(createCardElement(res))
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
  }
}
);

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (input) => {
    profileFormValidator.disableButton();
    return api.updateUserInfo({
      name: input.name,
      about: input.status,
    })
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          status: res.about
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const popupAvatarEdit = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  handleFormSubmit: (input) => {
    return api.updateAvatar(input.link)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar)
      })
      .catch((err) => {
        console.log(err);
      });
  },
});

const popupDeleteCard = new PopupWithAccept({
  popupSelector: '.popup_type_remove-card',
});

function deleteCard(card, cardId) {
  popupDeleteCard.open(() => {
    return api.deleteCardApi(cardId).then(() => {
      card.deleteCardElement();
    })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  })
}

function editAvatar() {
  popupAvatarEdit.open();
  avatarFormValidator.disableButton();
}

function editProfile() {
  popupProfile.open();
  const user = userInfo.getUserInfo();
  inputName.value = user.name;
  inputStatus.value = user.status;
}

function addCard() {
  popupAddCard.open();
  cardFormValidator.disableButton();
}

const handleLikeClick = (card) => {
  if (card.isLiked()) {
    dislikeCard(card);
  } else {
    likeCard(card);
  }
}

function likeCard(card) {
  return api.putCardLike(card._cardId).then((updateCard) => {
    card.updateLikes(updateCard.likes)
  })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

function dislikeCard(card) {
  return api.deleteCardLike(card._cardId).then((updateCard) => {
    card.updateLikes(updateCard.likes)
  })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
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
  const newCard = new Card(cardData, '#card-template', handleCardClick, deleteCard, userInfo, handleLikeClick);
  return newCard.generateCard();
}
const containerWithCards = new Section({
  renderer: (cardData) => {
    containerWithCards.addItemTop(createCardElement(cardData));
  },
  selector: '.elements',
})

const profileFormValidator = new FormValidator(config, formProfile);
const cardFormValidator = new FormValidator(config, formCard);
const avatarFormValidator = new FormValidator(config, formAvatar);

avatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
// >API<
Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([cardData, userData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      status: userData.about,
      avatar: userData.avatar,
      myId: userData._id
    }),
      containerWithCards.renderItems(cardData)
  })
  .catch((err) => {
    console.log(err);
  });