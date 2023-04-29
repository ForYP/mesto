enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__input-save',
  inactiveButtonClass: 'popup__input-disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error-message'
})

// включает валидацию всех форм
function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(form => {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        toggleButtonValidity(config, form);
      })
      setEventListeners(config, form);
  })
}

// добавляет обработчики всем полям формы
function setEventListeners (config, form) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  inputList.forEach(input => {
    input.addEventListener('input', function () {
      checkInputValidity(config, form, input);
      toggleButtonValidity(config, form);
    });
  });
}

// удаляет класс валидности у инпута
function setInputValidState (config, input, errorElement) {
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
}

// добавляет класс валидности инпуту 
function setInputInvalidState (config, input, errorElement) {
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
}

// проверка валидности инпутов
function checkInputValidity (config, form, input) {
  const errorElement = form.querySelector(`#error-${input.id}`);
  if (input.checkValidity()) {
    setInputValidState(config, input, errorElement);
  } else {
    setInputInvalidState(config, input, errorElement);
  }
}

// меняет отображение кнопки submit
function toggleButtonValidity (config, form) {
  const submitButton = form.querySelector(config.submitButtonSelector);
  if (form.checkValidity()) {
    enableButton(config, submitButton);
  } else {
    disableButton(config, submitButton);
  }
}

// передает состояние неактивной кнопки
function disableButton (config, button) {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', '');
}

// передает состояние активной кнопки
function enableButton (config, button) {
  button.removeAttribute('disabled', '');
  button.classList.remove(config.inactiveButtonClass);
}