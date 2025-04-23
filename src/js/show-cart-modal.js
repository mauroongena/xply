// show-cart-modal.js
export function showCartModal(product) {
  const modal = document.getElementById("cart-modal");
  const closeBtn = document.getElementById("close-cart-modal");
  const img = document.getElementById("modal-product-image");
  const nameEl = document.getElementById("modal-product-name");
  const priceEl = document.getElementById("modal-product-price");
  const quantitySelect = document.getElementById("modal-product-quantity");
  const sizeContainer = document.getElementById("modal-product-size");
  const errorMessage = document.getElementById("error-message");
  const confirmBtn = document.getElementById("add-to-cart-modal");

  product.quantity = 1;
  product.size = null;
  let sizeSelected = false;
  errorMessage.textContent = "";
  quantitySelect.value = "1";

  img.src = product.image;
  nameEl.textContent = product.name;
  priceEl.textContent = `$${product.price.toFixed(2)}`;

  quantitySelect.onchange = () => {
    product.quantity = parseInt(quantitySelect.value, 10);
  };

  sizeContainer.querySelectorAll("button").forEach((btn) => {
    btn.classList.remove("selected");
    btn.onclick = () => {
      sizeContainer
        .querySelectorAll("button")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      product.size = btn.textContent.trim();
      sizeSelected = true;
      errorMessage.textContent = "";
    };
  });

  modal.classList.remove("hidden");
  document.body.classList.add("no-scroll");

  closeBtn.onclick = () => {
    modal.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  };

  confirmBtn.onclick = (e) => {
    e.preventDefault();
    if (!sizeSelected) {
      errorMessage.textContent = "Please select a size.";
      return;
    }
    modal.dispatchEvent(
      new CustomEvent("modalConfirmed", {
        detail: { product },
      })
    );
    modal.classList.add("hidden");
    document.body.classList.remove("no-scroll");
  };
}
