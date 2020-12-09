export default class Banner {
  constructor(bannerWrapper, bannerConfig) {
    this.bannerWrapper = bannerWrapper;
    this.bannerEl = this.bannerWrapper.querySelector('.banner');
    this.bannerTextEl = this.bannerWrapper.querySelector('.banner-text');
    this.bannerLinkEl = this.bannerWrapper.querySelector('.banner-link');
    this.bannerConfig = bannerConfig;
  }

  redraw() {
    this.redrawColor();
    this.redrawImage();
    this.redrawText();
    this.redrawLink();
  }

  redrawColor() {
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
  }

  redrawImage() {
    if (this.bannerConfig.backgroundImageUrl) {
      this.bannerEl.style.backgroundImage = `url("${this.bannerConfig.backgroundImageUrl}")`;
      // this.bannerEl.style.backgroundColor = 'transparent';
    }
  }

  redrawText() {
    this.bannerTextEl.innerText = this.bannerConfig.text;
  }

  redrawLink() {
    if (this.bannerConfig.url) {
      this.bannerLinkEl.href = this.bannerConfig.url;
      this.bannerLinkEl.style.cursor = 'pointer';
    } else {
      this.bannerLinkEl.style.cursor = 'auto';
    }
  }
}
