import Store from '../store/store.js';

/**
 * This allows us to create components that dynamically respond to
 * changes in our state.
 */
export default class Component {
  constructor(props = {}) {
    let self = this;

    this.render = this.render || function(){};

    if (props.store instanceof Store) {
      props.store.events.subscribe('stateChange', () => self.render());
    }

    if(props.hasOwnProperty('element')) {
      this.element = props.element;
    }
  }
}
