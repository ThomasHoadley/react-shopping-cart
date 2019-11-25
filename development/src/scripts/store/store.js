import PubSub from '../lib/pubsub.js';

/**
 * Our central object. It contains our applications state.
 * The commit method, calls our mutations
 * The dispatch method that calls our actions.
 *
 * There is also a Proxy System that manages and broadcasts changes with the
 * PubSub module.
 *
 *  We should invoke async actions which commit mutations when the async
 *  code has completed.
 *
 * The two important methods are dispatch and commit. Dispatch calls our actions
 * and commit calls our mutations.
 */
export default class Store {
  constructor(params) {
    let self = this;

    self.actions = {};
    self.mutations = {};
    self.state = {};
    self.status = 'resting';
    self.events = new PubSub();

    if (params.hasOwnProperty('actions')) {
      self.actions = params.actions;
    }
    if (params.hasOwnProperty('mutations')) {
      self.mutations = params.mutations;
    }

    // The proxy essentially keeps track of all the changes and checks they are safe.
    // More here - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy
    self.state = new Proxy((params.state || {}), {

      // validates data passed into the store object
      set: function(state, key, value) {

        state[key] = value;

        console.log(`stateChange: ${key}: ${value}`);

        self.events.publish('stateChange', self.state);

        // Tell off develoepr for setting the state manually.
        if (self.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`);
        }

        self.status = 'resting';

        return true;
      }
    });
  }

  dispatch(actionKey, payload) {
    let self = this;

    if (typeof self.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`);
      return false;
    }

    console.groupCollapsed(`ACTION: ${actionKey}`);

    self.status = 'action';

    self.actions[actionKey](self, payload);

    console.groupEnd();

    return true;
  }

  commit(mutationKey, payload) {
    let self = this;

    if (typeof self.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`);
      return false;
    }

    self.status = 'mutation';

    let newState = self.mutations[mutationKey](self.state, payload);

    self.state = Object.assign(self.state, newState);

    return true;
  }
}
