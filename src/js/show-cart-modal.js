export function showCartModal(product) {
  const modal = document.getElementById("cart-modal");
  const closeBtn = document.getElementById("close-cart-modal");
  const img = document.getElementById("modal-product-image");
  const nameEl = document.getElementById("modal-product-name");
  const priceEl = document.getElementById("modal-product-price");
  const quantitySel = document.getElementById("modal-product-quantity");

  const sizeContainer = document.getElementById("modal-product-size");
  const sizeErrorEl = document.getElementById("error-message-size");

  const colorContainer = document.querySelector(".color-buttons");
  const colorErrorEl = document.getElementById("error-message-color");

  const confirmBtn = document.getElementById("add-to-cart-modal");

  product.quantity = 1;
  product.size = null;
  product.color = null;
  let sizeSelected = false;
  let colorSelected = false;
  sizeErrorEl.textContent = "";
  colorErrorEl.textContent = "";
  quantitySel.value = "1";

  img.src = product.image;
  nameEl.textContent = product.name;
  priceEl.textContent = `$${product.price.toFixed(2)}`;

  quantitySel.onchange = () => {
    product.quantity = parseInt(quantitySel.value, 10);
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
      sizeErrorEl.textContent = "";
    };
  });

  colorContainer.querySelectorAll(".color-btn").forEach((btn) => {
    btn.classList.remove("selected");
    btn.onclick = () => {
      colorContainer
        .querySelectorAll(".color-btn")
        .forEach((b) => b.classList.remove("selected"));
      btn.classList.add("selected");
      product.color = btn.dataset.color;
      colorSelected = true;
      colorErrorEl.textContent = "";
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

    let valid = true;
    if (!sizeSelected) {
      sizeErrorEl.textContent = "Please select a size.";
      valid = false;
    }
    if (!colorSelected) {
      colorErrorEl.textContent = "Please select a color.";
      valid = false;
    }
    if (!valid) {
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
