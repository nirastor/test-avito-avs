import FormColorpicker from './formColorpicker';
import SelectedColor from './selectedColor';
import BannerConfig from './bannerConfig';
import Banner from './banner';

export default class App {
  constructor() {
    this.bannerEl = document.querySelector('.banner-wrapper');
    this.bannerConfig = new BannerConfig();
    this.banner = new Banner(this.bannerEl, this.bannerConfig);

    this.gradientOpenBtn = document.querySelector('.gradient-open-btn');

    this.mainColorSelector = document.querySelector('.color--main');
    this.mainColor = new SelectedColor(this.mainColorSelector, 'main');

    this.gradientSelector = document.querySelector('.color--gradient');
    this.gradientColor = new SelectedColor(this.gradientSelector, 'gradient');

    this.formColorEl = document.querySelector('.form-color');
    this.formColorpicker = new FormColorpicker(this.formColorEl);

    this.textarea = document.querySelector('.textarea');
    this.linkInputEl = document.querySelector('.input-link');
    this.imageInputEl = document.querySelector('.input-image');

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

    this.textarea.addEventListener('input', (e) => {
      e.preventDefault();
      this.onTextChange();
    });

    this.linkInputEl.addEventListener('input', (e) => {
      e.preventDefault();
      this.onLinkInput();
    });

    this.imageInputEl.addEventListener('input', (e) => {
      e.preventDefault();
      this.onImageInput();
    });

    this.imageInputEl.addEventListener('focus', (e) => {
      e.preventDefault();
      this.onImageInputFocus();
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
    this.banner.redrawColor();
  }

  closeColorpicker() {
    this.state.colorpicker.isOpen = false;
    this.state.colorpicker.openFor = null;
    this.formColorpicker.closeForm();
  }

  onTextChange() {
    this.bannerConfig.text = this.textarea.value;
    this.banner.redrawText();
  }

  onLinkInput() {
    this.bannerConfig.url = this.linkInputEl.value;
    this.banner.redrawLink();
  }

  onImageInput() {
    this.bannerConfig.backgroundImageUrl = this.imageInputEl.value;
    this.banner.redrawImage();
  }

  onImageInputFocus() {
    if (this.imageInputEl.value) {
      this.banner.redrawImage();
    }
  }
}

const app = new App();
app.init();
