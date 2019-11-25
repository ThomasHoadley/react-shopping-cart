import Component from '../lib/component.js';
import store from '../store/index.js';

export default class CartItems extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.cart-items')
    });
  }

  render() {

    if (store.state.cartItems.length === 0) {
      this.element.innerHTML = `<p class="empty-cart">You have nothing in your cart &#128546;</p>`;
      return;
    }

    this.element.innerHTML = `
      ${store.state.cartItems.map(item => {
        return `
          <li>
          <button class="remove-product">×</button></div>
          <div class="cart-product-info">
            <span class="title">${item.title}</span>
            <span class="price" data-price="${item.variants[0].title}">£${item.variants[0].price}</span>
          </div>
          <div class="cart-product-footer">
            <span class="size">${item.variants[0].title}</span>
          </li>`}).join('')}`;

    this.element.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('click', () => {
        store.dispatch('removeFromCartTotal', {index});
        store.dispatch('removeProductFromCart', {index});
      });
    });
  }
}
