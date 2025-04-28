import { handleHeaderScroll } from "./header-scroll.js";
import { initNavToggle } from './togglehamburger.js';

import {
  updateCartDisplay,
  clearCart,
  viewCart,
} from "./add-product.js";

import { setupCartSidebar } from "./show-cartbar.js";
import { setupAddToCartButtons } from "./cart.js";
import { typeEffect } from "./animations/type-effect.js";
import { setupFilterDropdowns } from './filter-dropdown.js';

document.addEventListener("DOMContentLoaded", () => {
  handleHeaderScroll();
  initNavToggle();
  updateCartDisplay();
  setupCartSidebar();
  setupAddToCartButtons();

  if(document.querySelector(".filter")) {
    setupFilterDropdowns();
  }

  if(document.querySelector(".changing-text")) {
    typeEffect();
  }
  
  const viewBtn = document.getElementById("view-cart");
  const clearBtn = document.getElementById("clear-cart");

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
