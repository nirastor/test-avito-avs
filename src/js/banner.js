export default class Banner {
  constructor(bannerEl, bannerConfig) {
    this.bannerEl = bannerEl;
    this.bannerTextEl = this.bannerEl.querySelector('.banner-text');
    this.bannerConfig = bannerConfig;
  }

  redraw() {
    if (this.bannerConfig.gradientColor) {
      this.bannerEl.style.backgroundColor = 'none';
      this.bannerEl.style.background = `linear-gradient(
        ${this.bannerConfig.mainColor},
        ${this.bannerConfig.gradientColor}
      )`;
    } else {
      this.bannerEl.style.background = 'none';
      this.bannerEl.style.backgroundColor = this.bannerConfig.mainColor;
    }

    if (this.bannerConfig.backgroundImageUrl) {
      this.bannerEl.style.background.url = this.bannerConfig.backgroundImageUrl;
    }

    this.bannerTextEl.innerText = this.bannerConfig.text;
  }
}
