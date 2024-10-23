export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  clear() {  //очищаем контейнер от карточки, которую уже зарендерили
    this._container.innerHTML = '';
  }

  addItem(element) { // добивили элемент в дом
    this._container.append(element);
  }

  prependItem(element) {
    this._container.prepend(element)
  }

  renderItems() {
    this.clear();
    this._renderedItems.forEach(item => {
    this._renderer(item);
    });
  }
}
