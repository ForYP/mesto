const editButton = document.querySelector('.profile__edit-button');
const editOpenPopup = document.querySelector('.popup');
const editClosePopup = document.querySelector('.popup__close');
const btnSave = document.querySelector('.popup__input-save');
const inputName = document.querySelector('.popup__input_type_name');
const inputStatus = document.querySelector('.popup__input_type_status');
const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__status');
const editPopupForm = document.querySelector('.popup__form');

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