export default class SelectedColor {
  constructor(colorContainer, name) {
    this.elContainerelContainer = colorContainer;
    this.elColorColor = this.elContainerelContainer.querySelector('.color-pic');
    this.elColorText = this.elContainerelContainer.querySelector('.color-text');
    this.name = name;
  }

  setColor(color) {
    this.elColorColor.style.backgroundColor = color;
    this.elColorText.innerText = color;
  }

  getColor() {
    return this.elColorText.innerText;
  }
}
