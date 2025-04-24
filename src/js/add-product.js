import { clearInMemoryCart } from "./cart.js";
import { showToast } from "./toast-popup.js";

export function loadCartCount() {
  const count = localStorage.getItem("cartCount");
  return count ? parseInt(count, 10) : 0;
}

export function saveCartCount(count) {
  localStorage.setItem("cartCount", count);
}

export function updateCartDisplay() {
  const count = loadCartCount();
  const display = document.getElementById("cart-count");
  if (display) {
    display.innerHTML = count;
  }
}

export function clearCart() {
  saveCartCount(0);
  updateCartDisplay();
  
  clearInMemoryCart();
  showToast("Your cart has been cleared.");
}

export function viewCart() {
//   window.location.href = "/cart";
}
