import style from './welcomeBlock.module.scss';

export class WelcomeBlock {
  constructor(welcomeBlock, options = { autoplay: true, autoplayInterval: 7000 }) {
    this.welcomeBlock = welcomeBlock;
    this.options = options;
    this.imagesData = [
      { src: './welcomeBannerFirst.png', alt: 'black friday sale banner' },
      { src: './welcomeBannerSecond.png', alt: 'top 10 books banner' },
      { src: './welcomeBannerThird.png', alt: 'cozy book selection banner' },
    ];
    this.currentIndex = 0;
    this.render();
    this.initImages();
    this.initDots();
    this.updateSlider();
    if (this.options.autoplay) {
      this.startAutoplay();
    }
  }

  render() {
    const welcomeBlockHTML = `
      <div class="${style.container}">
          <div class="${style.slider_images}"></div>
          <div class="${style.banner_info}">
            <div class="${style.banner_info_purple}">
              <p>Change old book on new</p>
              <img src="./arrowBanner.svg" alt="arrow right" />
            </div>
            <div class="${style.banner_info_pink}">
              <p>Top 100 books 2022</p>
              <img src="./arrowBanner.svg" alt="arrow right" />
            </div>
          </div>
          <div class="${style.slider_dots}"></div>
      </div>
    `;
    this.welcomeBlock.innerHTML = welcomeBlockHTML;
    this.imagesWrapper = this.welcomeBlock.querySelector(`.${style.slider_images}`);
    this.dotsWrapper = this.welcomeBlock.querySelector(`.${style.slider_dots}`);
  }

  initImages() {
    this.imagesData.forEach((image, index) => {
      const imageElement = document.createElement('img');
      imageElement.src = image.src;
      imageElement.alt = image.alt;
      imageElement.className = `${index === this.currentIndex ? 'active' : ''}`;
      imageElement.style.display = 'none';
      this.imagesWrapper.appendChild(imageElement);
    });
    this.slides = this.welcomeBlock.querySelectorAll(`.${style.slider_images} img`);
  }

  initDots() {
    this.imagesData.forEach((_, index) => {
      const dotElement = document.createElement('div');
      dotElement.className = `${index === 0 ? style.active : ''}`;
      dotElement.dataset.index = index;

      dotElement.addEventListener('click', () => this.moveToSlide(index));
      this.dotsWrapper.appendChild(dotElement);
    });
  }

  startAutoplay() {
    setInterval(() => {
      this.moveToNextSlide();
    }, this.options.autoplayInterval);
  }

  moveToNextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.imagesData.length;
    this.updateSlider();
  }

  moveToSlide(index) {
    this.currentIndex = index;
    this.updateSlider();
  }

  updateSlider() {
    Array.from(this.slides).forEach((slide, index) => {
      slide.style.display = index === this.currentIndex ? 'block' : 'none';
    });
    Array.from(this.dotsWrapper.children).forEach((dot, index) => {
      dot.className = index === this.currentIndex ? style.active : '';
    });
  }
}
