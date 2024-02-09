import style from './header.module.scss';

export class Header {
  constructor(header) {
    this.header = header;
    this.render();
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
            <button>
              <img src="./iconUser.svg" alt="user icon" />
            </button>
            <button>
              <img src="./iconSearch.svg" alt="search icon" />
            </button>
            <button>
              <img src="./iconShop.svg" alt="shop icon" />
            </button>
          </div>
        </div>
      </div>
      `;
    this.header.innerHTML = headerHTML;
    this.addListeners();
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
}
