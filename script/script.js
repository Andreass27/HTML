const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');  //кнопка редактирования профиля
const addButton = page.querySelector('.profile__add-button'); //кнопка добавление карточек
const elements = document.querySelector('.elements');
const popupProfile = document.querySelector('.popup_type_profile');
const popupAddCard = document.querySelector('.popup_type_card-add');
const popupPick = document.querySelector('.popup_type_picture');
const profileName = page.querySelector('.profile__name'); //имя профиля
const profileJob = page.querySelector('.profile__description'); //работа профиля
const nameInput = document.querySelector('#popup__name'); //инпут имя
const jobInput = document.querySelector('#popup__description'); //инпут работа
const popupImage = document.querySelector('.popup__image'); //попап картинки
const editProfileForm = document.forms.editForm; //форма редактирования
const addCardForm = document.forms.addForm; //форма добавления
const inputLocation = document.querySelector('#popup__location'); //инпут имя карты
const inputLink = document.querySelector('#popup__link'); //импут ссылки на картинку
const imageName = document.querySelector('.popup__imgName');
const bigSizeImage = document.querySelector('.popup__image');
const cardTemplate = document.querySelector('#card').content; //забрал контент из темплейт
const addCardCloseButton = addCardForm.previousElementSibling; //кнопка закрытия добавления карточек
const editProfileCloseButton = editProfileForm.previousElementSibling; // кнопка закрытия редактирования профиля
const bigSizeImageClose = bigSizeImage.nextElementSibling; //кнопка закрытия большой картинки
const popups = Array.from(document.querySelectorAll('.popup'));//массив всех попапов



function openPopup(popup) {
  window.addEventListener('keydown', keyHandler)
  popup.classList.add('popup_opened');
}


function closePopup (popup) {
  window.removeEventListener('keydown', keyHandler)
  popup.classList.remove('popup_opened');
}


function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true); //клонировал html элементы
  const cardImage = cardElement.querySelector('.element__img');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  cardImage.addEventListener('click', function() { // зумирование картинки
    popupImage.setAttribute('src', link);
    openPopup(popupPick)
    imageName.textContent = name;
    bigSizeImage.setAttribute('alt', name);
  })

  cardElement.querySelector('.element__name').textContent = name;

  cardElement.querySelector('.element__delete').addEventListener('click', function () { //удаление карточек
    cardElement.remove()
  })

  cardElement.querySelector('.element__like').addEventListener('click', function (evt) { //like
    evt.target.classList.toggle('element__like_active');
  })

  return cardElement
}


function submitEditProfileForm (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupProfile);
}


  initialCards.forEach(function(item) {
    const card = createCard(item.name, item.link);
    elements.prepend(card);
  })


function addCard(evt) {
  evt.preventDefault();
  const card = createCard(inputLocation.value, inputLink.value);
  elements.prepend(card);
  closePopup(popupAddCard);
}


  popups.forEach(function(i) {
    i.addEventListener('mousedown', function(e) {
      if(e.target.classList.contains('popup_opened')) {
        closePopup(i)
      }
      })
  })


  function keyHandler(e) {
    if (e.key === "Escape") {
      const popupOpened = document.querySelector('.popup_opened');
      closePopup(popupOpened)
    }
  };


addCardCloseButton.addEventListener('click', () => {
  addCardForm.reset()
  closePopup(popupAddCard)
});

editProfileCloseButton.addEventListener('click', () => {
  editProfileForm.reset()
  closePopup(popupProfile)
});

bigSizeImageClose.addEventListener('click', () => {
  closePopup(popupPick)
});

editProfileForm.addEventListener('submit', submitEditProfileForm);
addCardForm.addEventListener('submit', addCard);

editButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  resetInputError(editProfileForm,validationThungs)
  openPopup(popupProfile)
});

addButton.addEventListener('click', function() {
  addCardForm.reset()
  resetInputError(addCardForm,validationThungs)
  openPopup(popupAddCard)
})
