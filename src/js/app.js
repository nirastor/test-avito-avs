/* eslint-disable no-console */
import FormColorpicker from './formColorpicker';
import SelectedColor from './selectedColor';
import BannerConfig from './bannerConfig';
import Banner from './banner';

export default class App {
  constructor() {
    this.bannerEl = document.querySelector('.banner-wrapper');
    this.bannerConfig = new BannerConfig();
    this.banner = new Banner(this.bannerEl, this.bannerConfig);

    this.formControls = document.querySelector('.form-controls');

    this.gradientOpenBtn = this.formControls.querySelector('.gradient-open-btn');

    this.mainColorSelector = this.formControls.querySelector('.color--main');
    this.mainColor = new SelectedColor(this.mainColorSelector, 'main');

    this.gradientSelector = this.formControls.querySelector('.color--gradient');
    this.gradientColor = new SelectedColor(this.gradientSelector, 'gradient');

    this.textarea = this.formControls.querySelector('.textarea');
    this.linkInputEl = this.formControls.querySelector('.input-link');
    this.imageInputEl = this.formControls.querySelector('.input-image');

    this.buttonPng = this.formControls.querySelector('.js-btn-png');
    this.buttonHtml = this.formControls.querySelector('.js-btn-html');
    this.buttonJson = this.formControls.querySelector('.js-btn-json');

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
    this.saveButtonsText = {
      copied: 'Скопированно',
      pngBtn: 'Загрузить PNG',
      htmlBtn: 'Копировать HTML',
      jsonBtn: 'Копировать настройки',
    };
  }

  init() {
    this.initListeners();
    this.banner.redraw();
  }

  initListeners() {
    this.formControls.addEventListener('submit', (e) => {
      e.preventDefault();
    });

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

    this.buttonPng.addEventListener('click', (e) => {
      e.preventDefault();
      this.exportPng();
    });

    this.buttonHtml.addEventListener('click', (e) => {
      e.preventDefault();
      this.exportHtml();
    });

    this.buttonJson.addEventListener('click', (e) => {
      e.preventDefault();
      this.exportJson();
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

  exportPng() {
    console.log('export png');
    console.log(this.state.colorpicker.isOpen);
  }

  showSuccessCopy(btn) {
    const bText = this.saveButtonsText;
    if (btn.innerText !== bText.copied) {
      // eslint-disable-next-line no-param-reassign
      btn.innerText = bText.copied;
      btn.classList.add('active');
      setTimeout(() => {
        // eslint-disable-next-line no-param-reassign
        btn.innerText = bText[btn.dataset.textId];
        btn.classList.remove('active');
        btn.blur();
      }, 1500);
    }
  }

  exportJson() {
    console.log('export json');
    const text = JSON.stringify(this.bannerConfig);
    navigator.clipboard.writeText(text)
      .then(() => {
        this.showSuccessCopy(this.buttonJson);
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  }

  exportHtml() {
    console.log('export html');
    const text = this.banner.createHTML();
    navigator.clipboard.writeText(text)
      .then(() => {
        this.showSuccessCopy(this.buttonHtml);
      })
      .catch((err) => {
        console.log('Something went wrong', err);
      });
  }
}

const app = new App();
app.init();
