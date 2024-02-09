import { Layout } from './components/layout/layout';

class App {
  constructor() {
    this.root = document.getElementById('app');
    this.layout = new Layout(this.root);
    this.render();
  }

  render() {
    this.layout.render();
  }
}

new App();
