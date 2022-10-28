// ==============================================

// functions:
import { listenForEvent } from '/functions/custom-events.js';
import { fireEvent } from '/functions/custom-events.js';

(() => {
  listenForEvent('local-storage-cart-modified', (event) => alert('LS Cart Modified!'));

  // Set local storage:
  const new_cart = 'new-cart!'
  window.localStorage.setItem('cart', JSON.stringify(new_cart));
  const cart_local_storage = JSON.parse(window.localStorage.getItem('cart'));
  console.log('cart (LS): ', cart_local_storage);

  // Trigger local storage event:
  fireEvent('local-storage-cart-modified');

})();

// ==============================================
