import style from './welcomeBlock.module.scss';

export class WelcomeBlock {
  constructor(welcomeBlock) {
    this.welcomeBlock = welcomeBlock;
    this.render();
  }

  render() {
    const welcomeBlockHTML = `
    <div class="${style.container}">
        <div class="${style.slider}">
            <div class="${style.slider_image}">
                <img src="./welcomeBannerSecond.png" alt="cozy book selection banner">
            </div>
        </div>
        <div class="${style.switch}">
            <div class="${style.switch_dote}"></div>
        </div>
    </div>
      `;
    this.welcomeBlock.innerHTML = welcomeBlockHTML;
  }
}
