import Ui from './ui';

export default class App {
  constructor() {
    this.ui = new Ui();
  }

  init() {
    this.ui.initListeners();
  }
}

const app = new App();
app.init();
