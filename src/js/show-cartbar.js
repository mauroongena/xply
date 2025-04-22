import { renderCartItems } from './cart.js';

export function openCartSidebar() { 
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');

  renderCartItems();
  cartSidebar.classList.add('active');
  cartOverlay.classList.add('active');
  document.documentElement.classList.add('no-scroll');
  document.body.classList.add('no-scroll');
}

export function setupCartSidebar() {
  const viewCartBtn = document.getElementById('view-cart');
  const closeCartBtn = document.getElementById('close-cart');
  const cartOverlay = document.getElementById('cart-overlay');

  viewCartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openCartSidebar();
  });

  function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('active');
    cartOverlay.classList.remove('active');
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
  }

  closeCartBtn.addEventListener('click', closeCart);
  cartOverlay.addEventListener('click', closeCart);
}
