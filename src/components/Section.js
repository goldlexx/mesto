export default class Section {

  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  rendered() {
    this._items.forEach(element => {
      this.addItem(element);
    });
  }

  addItem(element) {
    this._container.prepend(this._renderer(element));
  }
}

