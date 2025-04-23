import {
  loadCartCount,
  saveCartCount,
  updateCartDisplay,
} from "./add-product.js";
import { showCartModal } from "./show-cart-modal.js";

const cart = [];
let pendingProduct = null;

export function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

export function addToCart(product) {
  const existing = cart.find(
    (p) => p.id === product.id && p.size === product.size
  );

  if (existing) {
    existing.quantity += product.quantity;
  } else {
    cart.push({ ...product });
  }

  updateCartCount();
  renderCartItems();
}

export function removeFromCart(productId, size) {
  const idx = cart.findIndex(
    (p) => p.id === productId && p.size === size
  );
  if (idx === -1) return;

  const prod = cart[idx];
  prod.quantity -= 1;

  let count = loadCartCount();
  count = Math.max(0, count - 1);
  saveCartCount(count);
  updateCartDisplay();

  if (prod.quantity <= 0) {
    cart.splice(idx, 1);
  }

  updateCartCount();
  renderCartItems();
}

export function renderCartItems() {
  const container = document.getElementById("cart-items");
  if (!container) return;
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cart.forEach((product) => {
    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.innerHTML = `
      <div class="cart-item-info">
        <img
          src="${product.image}"
          alt="${product.name}"
          class="cart-item-image"
        />
        <div class="cart-item-details">
          <span class="cart-item-name">
            ${product.name} (<span class="bold">${product.size}</span>)
          </span>
          <span class="cart-item-price">
            $${product.price.toFixed(2)}
          </span>
          <span class="cart-item-quantity">
            Quantity: ${product.quantity}
          </span>
        </div>
      <div class="cart-item-remove">
        <button
          class="remove-item"
          data-product-id="${product.id}"
          data-product-size="${product.size}"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      </div>

    `;
    container.appendChild(item);

    item
      .querySelector(".remove-item")
      .addEventListener("click", (e) => {
        const id = e.currentTarget.dataset.productId;
        const sz = e.currentTarget.dataset.productSize;
        removeFromCart(id, sz);
      });
  });

  const shippingFee = 20;
  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const totalWithShipping = total + shippingFee;

  const totalEl = document.createElement("div");
  totalEl.classList.add("cart-total");
  totalEl.innerHTML = `
    <div class="cart-item-price-container">
      <div class="cart-item-price"><p>Shipping fee</p>$20.00</div>
      <div class="cart-item-price"><p>Subtotal</p>$${total.toFixed(2)}</div>
      <div class="cart-item-price"><p>Total</p>$${totalWithShipping.toFixed(2)}</div>
    </div>
  `;
  container.appendChild(totalEl);
}

export function setupAddToCartButtons() {
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      pendingProduct = {
        id: btn.dataset.productId,
        name: btn.dataset.productName,
        price: parseFloat(btn.dataset.productPrice),
        image: btn.dataset.productImg,
        quantity: 1,
        size: null,
      };
      showCartModal(pendingProduct);
    });
  });

  const modal = document.getElementById("cart-modal");
  if (modal) {
    modal.addEventListener("modalConfirmed", (e) => {
      const product = e.detail.product;
      addToCart(product);

      let count = loadCartCount();
      count += product.quantity;
      saveCartCount(count);
      updateCartDisplay();
    });
  }
}
