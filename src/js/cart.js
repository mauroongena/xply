import { openCartSidebar } from './show-cartbar.js';

const cart = [];

export function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = cart.length;
}

export function addToCart(product) {
  const existing = cart.find((p) => p.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push(product);
  }

  updateCartCount();
  renderCartItems();
}

export function renderCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) return;
  
    cartItemsContainer.innerHTML = "";
  
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }
  
    cart.forEach((product) => {
      const item = document.createElement("div");
      item.classList.add("cart-item");
  
      item.innerHTML = `
        <div class="cart-item-info">
          <img src="${product.image}" alt="${product.name}" class="cart-item-image" />
          <div class="cart-item-details">
            <span class="cart-item-name">${product.name}</span>
            <span class="cart-item-price">$${product.price.toFixed(2)}</span>
            <span class="cart-item-quantity">Quantity: ${product.quantity}</span>
          </div>
        </div>
      `;
  
      cartItemsContainer.appendChild(item);
    });

    const shippingFee = 20;
    const total = cart.reduce((sum, product) =>  sum + product.price * product.quantity, 0);
    const totalWithShipping = total + shippingFee;
  
    const totalElement = document.createElement("div");
    totalElement.classList.add("cart-total");
    totalElement.innerHTML = `
      <div class="cart-item-price-container">
        <div class="cart-item-price"><p>Shipping fee</p>$20.00</div>
        <div class="cart-item-price"><p>Subtotal</p>$${total.toFixed(2)}</div>
        <div class="cart-item-price"><p>Total</p>$${totalWithShipping.toFixed(2)}</div>
      </div>
    `;
  
    cartItemsContainer.appendChild(totalElement);
  }
  
export function setupAddToCartButtons() {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const btn = e.currentTarget.closest('.add-to-cart');

      const productId = btn.getAttribute("data-product-id");
      const name = btn.getAttribute("data-product-name");
      const price = btn.getAttribute("data-product-price");
      const image = btn.getAttribute("data-product-img");

      const product = {
        id: productId,
        name: name,
        price: parseFloat(price),
        image: image,
        quantity: 1,
      };

      addToCart(product);
      openCartSidebar();
    });
  });
}
