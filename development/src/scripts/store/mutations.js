/**
 * Mutations should always be minimal. They should only ever do one thing.
 * All state mutations must be synchronous
 */
export default {
  getProducts(state, payload) {
    state.products.push(payload);

    return state;
  },
  addProductToCart(state, payload) {
    state.cartItems.push(payload);

    return state;
  },
  removeProductFromCart(state, payload) {
    state.cartItems.splice(payload.index, 1);

    return state;
  },
  addToCartTotal(state, payload) {
    state.cartTotal += payload;

    return state;
  },
  removeFromCartTotal(state, payload){
    state.cartTotal -= parseFloat(state.cartItems[payload.index].variants[0].price);

    return state;
  },
  sortTitle(state, payload){
    state.filters.title = payload;

    return state;
  },
  sortPrice(state, payload){
    state.filters.price = payload;

    return state;
  }
};
