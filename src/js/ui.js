import FormColorpicker from './FormColorpicker';
import SelectedColor from './selectedColor';

export default class Ui {
  constructor() {
    this.gradientOpenBtn = document.querySelector('.gradient-open-btn');

    this.mainColorSelector = document.querySelector('.color--main');
    this.mainColor = new SelectedColor(this.mainColorSelector);

    this.gradientSelector = document.querySelector('.color--gradient');
    this.gradientColor = new SelectedColor(this.gradientSelector);

    this.formColorEl = document.querySelector('.form-color');
    this.formColorpicker = new FormColorpicker(this.formColorEl);
    this.state = {
      gradientSelectorIsOpen: false,
      colorpicker: {
        isOpen: false,
        openFor: null,
      },
    };
    this.gradientOpenBtnText = {
      actionOpen: 'Добавить градиент',
      actionClose: 'Убрать градиент',
    };
    this.colorPickerState = {
      main: this.mainColor,
      gradient: this.gradientColor,
    };
  }

  initListeners() {
    this.formColorpicker.initListeners(
      this.closeColorpicker.bind(this),
      this.setColor.bind(this),
    );

    this.gradientOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleGradientControls();
    });

    this.mainColorSelector.addEventListener('click', (e) => {
      e.preventDefault();
      this.openColorpicker(this.colorPickerState.main);
    });

    this.gradientSelector.addEventListener('click', (e) => {
      e.preventDefault();
      this.openColorpicker(this.colorPickerState.gradient);
    });
  }

  toggleGradientControls() {
    if (this.state.gradientSelectorIsOpen) {
      this.closeGradientSelector();
    } else {
      this.openGradientSelector();
    }
    this.state.gradientSelectorIsOpen = !this.state.gradientSelectorIsOpen;
  }

  openGradientSelector() {
    this.gradientSelector.classList.remove('display-none');
    this.gradientOpenBtn.innerText = this.gradientOpenBtnText.actionClose;
  }

  closeGradientSelector() {
    this.gradientSelector.classList.add('display-none');
    this.gradientOpenBtn.innerText = this.gradientOpenBtnText.actionOpen;
  }

  openColorpicker(state) {
    this.state.colorpicker.isOpen = true;
    this.state.colorpicker.openFor = state;
    this.formColorpicker.openForm(state.getColor());
  }

  setColor(color) {
    this.state.colorpicker.openFor.setColor(color);
  }

  closeColorpicker() {
    this.state.colorpicker.isOpen = false;
    this.state.colorpicker.openFor = null;
    this.formColorpicker.closeForm();
  }
}
