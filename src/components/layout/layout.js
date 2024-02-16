import { getElements } from '../utils/utils';
import { WelcomeBlock } from '../welcomeBlock/welcomeBlock';
import { BooksBlock } from '../booksBlock/booksBlock';
import { Header } from '../header/header';
import style from './layout.module.scss';

const Elements = {
  HEADER: 'header',
  WELCOMEBLOCK: 'welcomeBlock',
  BOOKSBLOCK: 'booksBlock',
};

export class Layout {
  constructor(root) {
    this.root = root;
    this.blocks = {};
    this.template = `
      <header class="${style.header}" data-element="${Elements.HEADER}"></header>
      <main>
        <section class="${style.welcome_block}" data-element="${Elements.WELCOMEBLOCK}"></section>
        <section class="${style.books_block}" data-element="${Elements.BOOKSBLOCK}"></section>
      </main>
    `;
  }

  render() {
    this.root.innerHTML = this.template;
    getElements(this.root, this.blocks);
    new Header(this.blocks[Elements.HEADER]);
    new WelcomeBlock(this.blocks[Elements.WELCOMEBLOCK]);
    new BooksBlock(this.blocks[Elements.BOOKSBLOCK]);
  }
}
