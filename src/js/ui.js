import FormColorpicker from './formColorpicker';
import SelectedColor from './selectedColor';
import BannerConfig from './bannerConfig';
import Banner from './banner';

export default class Ui {
  constructor() {
    this.bannerEl = document.querySelector('.banner');
    this.bannerConfig = new BannerConfig();
    this.banner = new Banner(this.bannerEl, this.bannerConfig);

    this.gradientOpenBtn = document.querySelector('.gradient-open-btn');

    this.mainColorSelector = document.querySelector('.color--main');
    this.mainColor = new SelectedColor(this.mainColorSelector, 'main');

    this.gradientSelector = document.querySelector('.color--gradient');
    this.gradientColor = new SelectedColor(this.gradientSelector, 'gradient');

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

  init() {
    this.initListeners();
    this.banner.redraw();
  }

  initListeners() {
    this.formColorpicker.initListeners(
      this.closeColorpicker.bind(this),
      this.submitColorpicker.bind(this),
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
    this.bannerConfig.gradientColor = this.gradientColor.getColor();
    this.banner.redraw();
  }

  closeGradientSelector() {
    this.gradientSelector.classList.add('display-none');
    this.gradientOpenBtn.innerText = this.gradientOpenBtnText.actionOpen;
    this.bannerConfig.gradientColor = null;
    this.banner.redraw();
  }

  openColorpicker(state) {
    this.state.colorpicker.isOpen = true;
    this.state.colorpicker.openFor = state;
    this.formColorpicker.openForm(state.getColor());
  }

  submitColorpicker(color) {
    const c = this.state.colorpicker.openFor;
    c.setColor(color);
    if (c.name === 'main') {
      this.bannerConfig.mainColor = color;
    } else {
      this.bannerConfig.gradientColor = color;
    }
    this.banner.redraw();
  }

  closeColorpicker() {
    this.state.colorpicker.isOpen = false;
    this.state.colorpicker.openFor = null;
    this.formColorpicker.closeForm();
  }
}
