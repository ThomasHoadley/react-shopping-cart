import Component from '../lib/component.js';
import store from '../store/index.js';

export default class Filter extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.filters')
    });
  }

  render() {
    let self = this;

    self.element.innerHTML = `
      <div class="filters">
        <p>Sort by </p>
        <div class="filter">
          <select name="title-sort">
            <option value="default-title-sort" ${store.state.filters.title == 'default-title-sort' ? 'selected' : ''} disabled>Title</option>
            <option value="a-z" ${store.state.filters.title == 'a-z' ? 'selected' : ''}>A-Z</option>
            <option value="z-a" ${store.state.filters.title == 'z-a' ? 'selected' : ''}>Z-A</option>
          </select>
        </div>
        <div class="filter">
          <select name="price-sort" >
            <option value="default-price-sort" ${store.state.filters.price == 'default-price-sort' ? 'selected' : ''} disabled>Price</option>
            <option value="low-high" ${store.state.filters.price == 'low-high' ? 'selected' : ''}>Low - High</option>
            <option value="high-low" ${store.state.filters.price == 'high-low' ? 'selected' : ''}>High - Low</option>
          </select>
        </div>
      </div>
    `;

    // Here we just want to be updating the state...
    self.element.querySelectorAll('select').forEach((select) => {

      select.addEventListener('change', (e) => {
        let filter = e.target.name;
        let filterValue = e.target.value;

        if (e.target.name == 'title-sort') {
          store.dispatch('sortTitle', filterValue);

        } else if(e.target.name == 'price-sort') {
          store.dispatch('sortPrice', filterValue);

        }
      });
    });
  }
}
