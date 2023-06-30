import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputList = Array.from(this._popupForm.querySelectorAll('.popup__input'));
        this._submitButton = this._popupForm.querySelector('.popup__input-save')
    }

    _getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });

        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close(); 
        })
    }

    changeButtonText (text) {
        this._submitButton.textContent = text;
      }

    close() {
        super.close();
        this._popupForm.reset();
    }
}