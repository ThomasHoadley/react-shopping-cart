/**
 * Create our apps Store instance by gluing all the pieces together.
 * Remember actions are called on the frontend to make mutations to the state.
 * Actions should be asynchronous.
 */
import actions from './actions.js';
import mutations from './mutations.js';
import state from './state.js';
import Store from './store.js';

export default new Store({
  actions,
  mutations,
  state
});
