let editButton = document.querySelector('.profile__edit-button');
let openPopup = document.querySelector('.popup');
let closePopup = document.querySelector('.popup__close');
let btnSave = document.querySelector('.popup__input-save');
let inputName = document.querySelector('.popup__input_name');
let inputStatus = document.querySelector('.popup__input_status');
let profileName = document.querySelector('.profile__name');
let profileStatus = document.querySelector('.profile__status');
let editPopupForm = document.querySelector('.popup__form');

editButton.addEventListener('click', function() {
    openPopup.classList.add('popup_opened');
    inputName.value = profileName.textContent;
    inputStatus.value = profileStatus.textContent;
});

closePopup.addEventListener('click', function() {
    openPopup.classList.remove('popup_opened');
});

editPopupForm.addEventListener('submit', function(event) {
    event.preventDefault();
    let name = inputName.value;
    let status = inputStatus.value;
    profileName.textContent = name;
    profileStatus.textContent = status;
    openPopup.classList.remove("popup_opened");
});