import Ui from './ui';

export default class App {
  constructor() {
    this.ui = new Ui();
  }

  init() {
    this.ui.init();
  }
}

const app = new App();
app.init();
