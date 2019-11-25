/**
 * Essentially each action passes a payload to a mutation, which then commits
 * the data to the store.
 *
 * Actions commit mutations, the key difference being that
 * mutations can not be asynchronous.
 *
 * The context is the instance of the Store class and
 * the payload is passed in by whatever dispatches the action
 *
 * The frontend will be running actions and should be asynchronous
 *
 *
 */

export default {
  getProducts(context, payload) {
    context.commit('getProducts', payload);
  },
  addProductToCart(context, payload) {
    context.commit('addProductToCart', payload);
  },
  removeProductFromCart(context, payload) {
    context.commit('removeProductFromCart', payload);
  },
  addToCartTotal(context, payload) {
    context.commit('addToCartTotal', payload);
  },
  removeFromCartTotal(context, payload) {
    context.commit('removeFromCartTotal', payload);
  },
  sortTitle(context, payload) {
    context.commit('sortTitle', payload);
  },
  sortPrice(context, payload) {
    context.commit('sortPrice', payload);
  }
};
