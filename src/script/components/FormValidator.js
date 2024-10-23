export default class FormValidator {
  constructor(config, elementForm) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._elementForm = elementForm;
    this._inputs = Array.from(this._elementForm.querySelectorAll(this._inputSelector));
    this._submitButton = this._elementForm.querySelector(this._submitButtonSelector);
  }

 //функция перезагрузки ошибок валидации при выходе из формы
  resetInputError = (() => {
      this._inputs.forEach((inputElement) => {
        this._hideInputError(inputElement)
      })
      this._toggleButtonState()
  })

  // Функция добавляет класс с ошибкой
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._elementForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    //span с ошибкой
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //функция удаления класса с ошибкой
  _hideInputError = (inputElement) => {
    const errorElement = this._elementForm.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  //функция проверки валидности инпута
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
      this._showInputError(inputElement, inputElement.validationMessage);
  } else {
      this._hideInputError(inputElement);
  }
  };

  //функция проверки инпутов на валидность
  _hasInvalidInput = () => {
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
  })
  }

  // Функция изменения кнопки submit
  _toggleButtonState = () => {
    if(this._hasInvalidInput()) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.setAttribute('disabled', true)
    }
    else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled', true)
    }
  }

  //функция добавления обработчика всем инпутам
  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };

  //функция добавления обработчика всем формам
  enableValidation = () => {
    this._setEventListeners();
  };
}




