export default class Ui {
  constructor() {
    this.gradientOpenBtn = document.querySelector('.gradient-open-btn');
    this.gradientSelector = document.querySelector('.color--gradient');
    this.state = {
      gradientSelectorIsOpen: false,
    };
    this.gradientOpenBtnText = {
      actionOpen: 'Добавить градиент',
      actionClose: 'Убрать градиент',
    };
  }

  initListeners() {
    this.gradientOpenBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggleGradientControls();
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
}
