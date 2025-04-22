import { handleHeaderScroll } from "./header-scroll.js";
import {
  loadCartCount,
  saveCartCount,
  updateCartDisplay,
  clearCart,
  viewCart,
} from "./add-product.js";

import { setupCartSidebar } from "./show-cartbar.js";
import { setupAddToCartButtons } from "./cart.js";
import { typeEffect } from "./animations/type-effect.js";

document.addEventListener("DOMContentLoaded", () => {
  handleHeaderScroll();
  updateCartDisplay();

  setupCartSidebar();
  setupAddToCartButtons();
  typeEffect();

  const addToCartButtons = document.querySelectorAll(".add-to-cart");

  const viewBtn = document.getElementById("view-cart");
  const clearBtn = document.getElementById("clear-cart");

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      let count = loadCartCount();
      count += 1;
      saveCartCount(count);
      updateCartDisplay();
    });
  });

  if (viewBtn) {
    viewBtn.addEventListener("click", (e) => {
      e.preventDefault();
      viewCart();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", (e) => {
      e.preventDefault();
      clearCart();
    });
  }
});
