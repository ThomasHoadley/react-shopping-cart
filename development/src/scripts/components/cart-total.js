import Component from '../lib/component.js';
import store from '../store/index.js';

export default class CartTotal extends Component {
  constructor() {
    super({
      store,
      element: document.querySelectorAll('.cart-total')
    });
  }

  render() {
    let self = this;
    let element = self.element;
    let taxElement = document.querySelector('.price-tax');

    element.forEach(function(singleElement){
      singleElement.innerHTML = `£${parseFloat(store.state.cartTotal).toFixed(2)}`;
    });

    taxElement.innerHTML = `£${parseFloat(store.state.cartTotal / 100 * 20).toFixed(2)}`;

  }
}
