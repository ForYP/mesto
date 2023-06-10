export default class FormValidator {
  constructor (config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  // включает валидацию всех форм
  enableValidation () {
    this._setEventListeners();
  }
  
  // проверка валидности инпутов
  _checkInputValidity (input) {
    const error = this._form.querySelector(`#error-${input.id}`);
    if (input.checkValidity()) {
      this._setInputValidState(input, error);
    } else {
      this._setInputInvalidState(input, error);
    }
  }
  
  // удаляет класс валидности у инпута
  _setInputValidState (input, error) {
    input.classList.remove(this._inputErrorClass);
    error.textContent = '';
  }

  // добавляет класс валидности инпуту
  _setInputInvalidState (input, error) {
    input.classList.add(this._inputErrorClass);
    error.textContent = input.validationMessage;
  }

  // меняет отображение кнопки submit
  _toggleButtonValidity () {
    if (this._form.checkValidity()) {
      this._enableButton()
    } else {
      this.disableButton()
    }
  }

  // передает состояние неактивной кнопки
  disableButton () {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', '');
  }

  // передает состояние активной кнопки
  _enableButton () {
    this._submitButton.removeAttribute('disabled', '');
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  // добавляет обработчики всем полям формы
  _setEventListeners () {
    const inputItem = Array.from(this._form.querySelectorAll(this._inputSelector));
    inputItem.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        this._toggleButtonValidity();
      });
    });
  }
}