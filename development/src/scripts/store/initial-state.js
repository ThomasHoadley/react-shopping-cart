import store from './index.js';
const fetchURL = 'https://j-parre.myshopify.com/products.json';

function loadProducts(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

const initialState = loadProducts(fetchURL, function(error, products){
  if (error !== null) {
    alert('Something went wrong: ' + error);
  } else {
    store.dispatch('getProducts', products);
  }
});
