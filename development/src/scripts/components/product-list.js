import Component from '../lib/component.js';
import store from '../store/index.js';

export default class productList extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.product-list')
    });
    this.handleAddToCart.bind(this)();
    this.filterProductsArray.bind(this);
    this.createProductListString.bind(this);
  }

  handleAddToCart() {
    // Add event listener to the dynamically added buttons
    document.querySelector('body').addEventListener('click', function (event) {
      if (event.target.classList.contains('add-to-cart')) {
        let target = event.target;
        let addedProductID = event.target.getAttribute('data-product-id');
        let products = store.state.products[0]['products'];
        products.map(product => {
          if(product.id == addedProductID) {
            store.dispatch('addProductToCart', product);
            store.dispatch('addToCartTotal', parseFloat(product.variants[0].price));
          }
        });
      }
    });
  }


  /**
   * Sort the array of products as per the filters
   * @param  {array} products Pass in the states products array
   * @return {array} The sorted products state
   */
  filterProductsArray(products) {
    // Filter the products array here
    let titleFilter = store.state.filters.title;
    let priceFilter = store.state.filters.price;

    // Title Filter
    if (titleFilter == 'a-z') {
      products.sort(function(a,b){
        if(a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        };
        return 0;
      });
    } else if (titleFilter == 'z-a') {
      products.sort(function(a,b){
        if(a.title.toLowerCase() > b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return 1;
        };
        return 0;
      });
    };

    // Price filter
    if (priceFilter == 'low-high') {
      products.sort(function(a,b){
        if(a.variants[0].price < b.variants[0].price) {
          return -1;
        }
        if (a.variants[0].price > b.variants[0].price) {
          return 1;
        };
        return 0;
      });
    } else if (priceFilter == 'high-low') {
      products.sort(function(a,b){
        if(a.variants[0].price > b.variants[0].price) {
          return -1;
        }
        if (a.variants[0].price < b.variants[0].price) {
          return 1;
        };
        return 0;
      });
    } else{
      return;
    }
  };


  /**
   * Returns a string off all the products to be rendered
   * @param  {object} products Pass in the states products object
   * @return {string} Returns a string of all the objects to be rendered.
   */
  createProductListString(products) {
    let productArray = [];

    products.map(item => {
        let { body_html, created_at, id, options, product_type, published_at, tags, title, updated_at, vendor  } = item;
        let image = item.images[0].src;
        let price = item.variants[0].price;
        let size = item.variants[0].title;

        let productString = `
          <div class="product">
          <div class="image-container">
            <img src="${image}" alt="${title} from Eclectees Co"/>
          </div>
          <div class="product-details match-height">
            <div class="title">
              <p>${title}</p>
            </div>
            <div class="price">
              <p>£${price}</p>
            </div>
          </div>
          <div class="product-buttons">
            <button class="button button-red add-to-cart" data-product-id="${id}">Add to cart</button>
            <button class="button button-grey">Quick view</button>
          </div>
        </div>
      `;

      productArray.push(productString);
    });

    productArray = productArray.join('');
    return productArray
  };


  /**
   * Renders the product list
   */
  render() {
    let self = this;

    if (store.state.products.length === 0 ) {

      return;

    } else {

      // Get the products from the state
      let products = store.state.products[0]['products'];

      // Filter the products
      this.filterProductsArray(products);

      // Create string from the products object
      let productString = this.createProductListString(products);

      // Render it to the DOM
      self.element.innerHTML = productString;
    }
  }
}
