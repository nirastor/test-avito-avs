export default class Banner {
  constructor(bannerWrapper, bannerConfig) {
    this.bannerWrapper = bannerWrapper;
    this.bannerEl = this.bannerWrapper.querySelector('.banner');
    this.bannerTextEl = this.bannerWrapper.querySelector('.banner-text');
    this.bannerLinkEl = this.bannerWrapper.querySelector('.banner-link');
    this.bannerConfig = bannerConfig;
  }

  createHTML() {
    const tbc = this.bannerConfig;

    const wrapperOpen = '<div class="banner-wrapper">';
    const wrapperClose = '</div>';
    let bannerOpen = '<div class="banner">';
    const bannerClose = '</div>';

    let linkOpen = '';
    let linkClose = '';
    if (tbc.url) {
      linkOpen = `<a href="${tbc.url}" target="_blank" class="banner-link">`;
      linkClose = '</a>';
    }

    const styleOpener = '<div class="banner" style="background: ';

    if (tbc.backgroundImageUrl) {
      const sImg = `url("${tbc.backgroundImageUrl}")`;
      const sImgClose = ' center center / cover no-repeat;">';
      bannerOpen = styleOpener + sImg + sImgClose;
    } else if (tbc.gradientColor) {
      const sGrad = `linear-gradient(${tbc.mainColor}, ${tbc.gradientColor});">`;
      bannerOpen = styleOpener + sGrad;
    } else {
      bannerOpen = `<div class="banner" style="background-color: ${tbc.mainColor};">`;
    }

    const textWithBr = this.bannerConfig.text.replaceAll('\n', '<br>');
    const bannerTextFull = `<div class="banner-text">${textWithBr}</div>`;

    return wrapperOpen
      + linkOpen
        + bannerOpen
          + bannerTextFull
        + bannerClose
      + linkClose
    + wrapperClose;
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
      this.bannerEl.style.backgroundRepeat = 'no-repeat';
      this.bannerEl.style.backgroundPosition = 'center';
      this.bannerEl.style.backgroundSize = 'cover';
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
