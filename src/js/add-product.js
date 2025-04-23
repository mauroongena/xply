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
  if (count > 9) {
    display.innerHTML = "9+";
  }
}

export function clearCart() {
  saveCartCount(0);
  updateCartDisplay();
  
  localStorage.removeItem("cartItems");
  alert("Cart cleared!");
}

export function viewCart() {
//   window.location.href = "/cart";
}
