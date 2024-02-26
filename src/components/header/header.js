import style from './header.module.scss';

export class Header {
  constructor(header) {
    this.header = header;
    this.render();
    this.customEventListener();
  }

  render() {
    const headerHTML = `
      <div class="${style.container}">
        <div class="${style.header_wrapper}">
          <a href="./index.html" class="${style.header_logo}">BookShop</a>
          <nav class="${style.nav}">
            <ul class="${style.nav_list}">
              <li>
                <a href="#books" class="${style.nav_link}">Books</a>
              </li>
              <li>
                <a href="#audioBooks" class="${style.nav_link}">AudioBooks</a>
              </li>
              <li>
                <a href="#stationery" class="${style.nav_link}">Stationery & Gifts</a>
              </li>
              <li>
                <a href="#blog" class="${style.nav_link}">Blog</a>
              </li>
            </ul>
          </nav>
          <div class="${style.user_actions}">
            <button type="button" disabled>
              <img src="./iconUser.svg" alt="user icon" />
            </button>
            <button type="button" disabled>
              <img src="./iconSearch.svg" alt="search icon" />
            </button>
            <button type="button" disabled>
              <img src="./iconShop.svg" alt="cart icon" /><span class="${style.counter}"></span>
            </button>
          </div>
          <button class="${style.burger_menu}" type="button">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      `;
    this.header.innerHTML = headerHTML;
    this.addListeners();
    this.updateCounter();
    this.initBurgerMenu();
  }

  addListeners() {
    const links = this.header.querySelectorAll(`.${style.nav_link}`);

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        links.forEach((link) => link.classList.remove(style.active));
        e.currentTarget.classList.add(style.active);
      });
    });
  }

  customEventListener() {
    document.addEventListener('updateCartCounter', () => this.updateCounter());
  }

  updateCounter() {
    const counter = this.header.querySelector(`.${style.counter}`);
    const cartItems = JSON.parse(localStorage.getItem('inCart')) || [];
    const itemsCounter = cartItems.length;

    if (itemsCounter > 0) {
      counter.innerHTML = `${itemsCounter}`;
      counter.classList.remove(style.hidden);
    } else {
      counter.innerHTML = '';
      counter.classList.add(style.hidden);
    }
  }

  initBurgerMenu() {
    const burgerMenu = document.querySelector(`.${style.burger_menu}`);
    const nav = document.querySelector(`.${style.nav}`);

    burgerMenu.addEventListener('click', () => {
      nav.classList.toggle(style.nav_active);
      burgerMenu.classList.toggle(style.burger_active);
    });
  }
}
