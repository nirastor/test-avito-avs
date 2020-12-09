import colorjoe from 'colorjoe';

export default class FormColorpicker {
  constructor(formEl) {
    this.formEl = formEl;
    this.confirmButton = this.formEl.querySelector('.button-color-confirm');
    this.cancelButton = this.formEl.querySelector('.button-color-cancel');
    this.colorJoeContainer = this.formEl.querySelector('.form-color-colorpicker');

    this.joe = colorjoe.rgb(this.colorJoeContainer, '#4350a8', [
      'currentColor',
      ['fields', {
        space: 'RGB', limit: 255, fix: 0,
      }],
      'hex',
    ]);
  }

  initListeners(fnCloseForm, fnSetColor) {
    this.formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      fnSetColor(this.joe.get().hex());
      fnCloseForm();
    });

    this.cancelButton.addEventListener('click', (e) => {
      e.preventDefault();
      fnCloseForm();
    });
  }

  openForm(color) {
    this.formEl.classList.remove('display-none');
    this.joe.set(color);
  }

  closeForm() {
    this.formEl.classList.add('display-none');
  }
}
