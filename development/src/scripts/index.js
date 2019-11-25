import '../styles/index.scss';
import store from './store/index.js';
import initialState from './store/initial-state.js';

import CartCount from './components/cart-count.js';
import CartItems from './components/cart-items.js';
import CartTotal from './components/cart-total.js';
import ProductList from './components/product-list.js';
import Filter from './components/filter.js';

const cartCountInstance = new CartCount();
const cartItemsInstance = new CartItems();
const cartTotalInstance = new CartTotal();
const productlistInstance = new ProductList();
const filterInstance = new Filter();

cartCountInstance.render();
cartItemsInstance.render();
cartTotalInstance.render();
productlistInstance.render();
filterInstance.render();
