import axios from 'axios';
import style from './booksBlock.module.scss';

export class BooksBlock {
  constructor(booksBlock) {
    this.booksBlock = booksBlock;
    this.booksCategories = [
      'Architecture',
      'Art & Fashion|Art',
      'Biography',
      'Business',
      'Crafts & Hobbies|Hobbies',
      'Drama',
      'Fiction',
      'Food & Drink|Food',
      'Health & Wellbeing|Health',
      'History & Politics|History',
      'Humor',
      'Poetry',
      'Psychology',
      'Science',
      'Technology',
      'Travel & Maps|Travel',
    ];
    this.activeCategory = this.booksCategories[0];
    this.books = [];
    this.booksResult = 6;
    this.booksIndex = 1;
    this.render();
    this.fetchBooks();
  }

  async fetchBooks() {
    const categoryParts = this.activeCategory.split('|');
    const queryCategory = categoryParts.length > 1 ? categoryParts[1] : categoryParts[0];

    const params = {
      q: `subject:${queryCategory}`,
      maxResults: this.booksResult,
      startIndex: (this.booksIndex - 1) * this.booksResult,
      printType: 'books',
      langRestrict: 'en',
      filter: 'paid-ebooks',
      key: 'AIzaSyCwDaNmIr8xOl8sjY20aS0h0SMy7u_EiG0',
    };

    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', { params });

      this.books = response.data.items;
      this.renderBooks();

      this.booksBlock.querySelector(`.${style.books_btn}`).classList.remove(style.hidden);
    } catch (error) {
      console.error('Error fetching: ', error);
    }
  }

  render() {
    const booksCategoriesListHTML = this.booksCategories
      .map((category) => {
        const [displayName] = category.split('|');
        const categoryClass = category === this.activeCategory ? style.active : '';
        return `<li class="${categoryClass}" data-category="${category}">${displayName}</li>`;
      })
      .join('');

    const booksBlockHTML = `
      <div class="${style.container}">
        <div class="${style.booksblock_wrapper}">
          <ul class="${style.books_categories}">
            ${booksCategoriesListHTML}
          </ul>
          <div class="${style.books_wrapper}">
            <div class="${style.books_list}"></div>
            <button type="button" class="${style.books_btn} ${style.hidden}">Load More</button>
          </div>
        </div>
      </div>
    `;

    this.booksBlock.innerHTML = booksBlockHTML;

    this.booksBlock.querySelectorAll(`.${style.books_categories} li`).forEach((element) => {
      element.addEventListener('click', () => {
        this.activeCategory = element.getAttribute('data-category');
        this.booksIndex = 1;
        this.books = [];
        this.clearBooks();
        this.fetchBooks();
        this.updateCategory();
      });
    });

    this.booksBlock.querySelector(`.${style.books_btn}`).addEventListener('click', () => {
      this.booksIndex++;
      this.fetchBooks();
    });

    this.changeButtons();
  }

  renderBooks() {
    let cartItems = JSON.parse(localStorage.getItem('inCart')) || [];
    const booksHTML = this.books
      .map((book) => {
        const isInCart = cartItems.includes(book.id);
        const cover = book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : './public/booksPlaceholder.png';
        const author = book.volumeInfo.authors
          ? book.volumeInfo.authors.join(', ')
          : 'Unknown Author';
        const title = book.volumeInfo.title;
        const rating = book.volumeInfo.averageRating
          ? this.generateStars(book.volumeInfo.averageRating)
          : '';
        const reviews = book.volumeInfo.ratingsCount
          ? `${book.volumeInfo.ratingsCount} review${book.volumeInfo.ratingsCount > 1 ? 's' : ''}`
          : '';
        const description = book.volumeInfo.description
          ? book.volumeInfo.description.substring(0, 90) + '...'
          : 'No description available';
        const price = book.saleInfo.retailPrice
          ? this.formatPrice(
              book.saleInfo.retailPrice.currencyCode,
              book.saleInfo.retailPrice.amount
            )
          : '';

        return `
        <div class="${style.book_card}">
          <img src="${cover}" alt="${title}" class="${style.book_cover}">
          <div class="${style.book_info}">
            <p class=${style.book_author}>${author}</p>
            <h3 class=${style.book_title}>${title}</h3>
            ${
              rating
                ? `<div class="${style.book_rating}">
                  ${rating}<span class="${style.book_reviews}"> ${reviews}</span>
                </div>`
                : ''
            }
            <p class="${style.book_description}">${description}</p>
            ${price ? `<div class="${style.book_price}">${price}</div>` : ''}
            <button type="button" class="${style.book_btn} ${
          isInCart ? style.book_btn_cart : ''
        }" data-bookid="${book.id}">
              ${isInCart ? 'In the cart' : 'Buy now'}
            </button>
          </div>
        </div>
      `;
      })
      .join('');

    this.booksBlock
      .querySelector(`.${style.books_list}`)
      .insertAdjacentHTML('beforeend', booksHTML);
  }

  changeButtons() {
    this.booksBlock.querySelector(`.${style.books_wrapper}`).addEventListener('click', (e) => {
      if (e.target.classList.contains(style.book_btn)) {
        const bookId = e.target.dataset.bookid;
        let cartItems = JSON.parse(localStorage.getItem('inCart')) || [];
        const inCart = cartItems.includes(bookId);

        if (inCart) {
          cartItems = cartItems.filter((id) => id !== bookId);
          e.target.textContent = 'Buy now';
          e.target.classList.remove(style.book_btn_cart);
        } else {
          cartItems.push(bookId);
          e.target.textContent = 'In the cart';
          e.target.classList.add(style.book_btn_cart);
        }

        localStorage.setItem('inCart', JSON.stringify(cartItems));

        document.dispatchEvent(new CustomEvent('updateCartCounter'));
      }
    });
  }

  generateStars(rating, maxStars = 5) {
    let starsHtml = '';
    for (let i = 1; i <= maxStars; i++) {
      starsHtml +=
        i <= Math.floor(rating)
          ? `<span class="${style.full_star}">★</span>`
          : `<span class="${style.empty_star}">☆</span>`;
    }
    return starsHtml;
  }

  formatPrice(currencyCode, amount) {
    let currencySymbols = {
      USD: '$',
      RUB: '₽',
      EUR: '€',
    };

    let currencySymbol = currencySymbols[currencyCode] || currencyCode;

    return `${currencySymbol} ${amount}`;
  }

  clearBooks() {
    this.booksBlock.querySelector(`.${style.books_list}`).innerHTML = '';
  }

  updateCategory() {
    this.booksBlock.querySelectorAll(`.${style.books_categories} li`).forEach((element) => {
      if (element.getAttribute('data-category') === this.activeCategory) {
        element.classList.add(style.active);
      } else {
        element.classList.remove(style.active);
      }
    });

    this.booksBlock.querySelector(`.${style.books_btn}`).classList.add(style.hidden);
  }
}
