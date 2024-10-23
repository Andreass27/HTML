const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');  //кнопка редактирования профиля
const addButton = page.querySelector('.profile__add-button'); //кнопка добавление карточек
const nameInput = document.querySelector('#popup__name'); //инпут имя
const jobInput = document.querySelector('#popup__description'); //инпут работа
const editProfileForm = document.forms.editForm; //форма редактирования
const addCardForm = document.forms.addForm; //форма добавления

export {
  page, editButton, addButton, nameInput, jobInput,
  editProfileForm, addCardForm
}
