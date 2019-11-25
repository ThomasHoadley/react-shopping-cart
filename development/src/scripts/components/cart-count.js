import Component from '../lib/component.js';
import store from '../store/index.js';

export default class CartCount extends Component {
  constructor() {
    super({
      store,
      element: document.querySelectorAll('.cart-count')
    });
  }

  render() {
    let self = this;

    let element = self.element;

    element.forEach(function(singleElement){
      singleElement.innerHTML = `${store.state.cartItems.length}`
    });
  }
}
