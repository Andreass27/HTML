import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import {initialCards} from '../script/utils/initial-сards.js';
import {validationThungs} from '../script/utils/validationThungs.js';
import Section from '../script/components/Section.js';
import Popup from '../script/components/Popup.js';
import PopupWithImage from '../script/components/PopupWithImage.js'
import PopupWithForm from '../script/components/PopupWithForm.js'
import UserInfo from '../script/components/UserInfo.js'
import { editButton, addButton, nameInput, jobInput,
  editProfileForm, addCardForm } from '../script/utils/constants.js'
  import './index.css'


const userInfoPopup = new UserInfo('.profile__name', '.profile__description'); //экземпляр класса редактирования профиля
const editProfileValidity = new FormValidator(validationThungs, editProfileForm) //экземпляр класса валидации формы редактирования профиля
const addCardFormValidity = new FormValidator(validationThungs, addCardForm) //экземпляр класс валидации формы добавления карточек
const openImagePopup = new PopupWithImage('.popup_type_picture') //экземпляр класса попапа картинок

openImagePopup.setEventListeners();// обработчик открытия карточек

const openEditPopup = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (input) => {
    userInfoPopup.setUserInfo(input.profile_name, input.profile_description)
  }
})
openEditPopup.setEventListeners()

const createCard = (name, link, selector,) => { //функция создания карточки
  const card = new Card(name, link, selector, () => {
    openImagePopup.open(name, link)
  })
  const cardElement = card.renderCard()
  return cardElement
}

const renderСards = new Section({  //рендер карточек на старницу
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item.name, item.link, '#card')
    renderСards.addItem(card);
  }
}, '.elements');

renderСards.renderItems();

const addCard = new PopupWithForm({
  popupSelector: '.popup_type_card-add',
  handleFormSubmit: (item) => {
    const card = createCard(item.addFormName, item.addFormUrl, '#card')
    renderСards.prependItem(card);
  }
})

addCard.setEventListeners()

const closeImagePopup = new Popup('.popup_type_picture') //закрытие попапов с картинкой

closeImagePopup.setEventListeners()
editProfileValidity.enableValidation()//validity
addCardFormValidity.enableValidation()//validity

editButton.addEventListener('click', function() { //слушатель формы редактирования
  const userInfo = userInfoPopup.getUserInfo();//данные инпутов
  nameInput.value = userInfo.profileName;
  jobInput.value = userInfo.profileDescription;
  editProfileValidity.resetInputError()
  openEditPopup.open()
});

addButton.addEventListener('click', function() { //слушатель формы добавления
  addCardFormValidity.resetInputError()
  addCard.open()
})

