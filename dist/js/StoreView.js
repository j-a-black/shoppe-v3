// Product item increase/decrease quantity

// const itemQty = document.querySelector(".item-qty-js");
// let itemQtyValue = itemQty.value;
// const increase = () => {
//   itemQtyValue++;
//   console.log(itemQtyValue);
//   itemQty.value = itemQtyValue;
//   console.log(itemQty);
// };

// export const decrease = () => {
//   if (itemQtyValue < 2) return;
//   itemQtyValue--;
//   console.log(itemQtyValue);
//   itemQty.value = itemQtyValue;
//   console.log(itemQty);
// };

// Displaying products on the store page

export const displayProducts = (productData) => {
  let productsContainer = document.querySelector(".products-container");

  productData.forEach((item) => {
    let html = "";

    html = `
    <div id="${item.id}" class="product-card">
      <img
        class="product-card__image"
        src="${item.img}"
        alt="${item.title}"
        loading="lazy"
      />
      <div class="product-card__body">
        <h2 class="product-card__title">${item.title}</h2>
        <span class="product-card__description"
          >${item.description}</span
        >
        <div class="product-card__content">
          <span class="product-card__price">${item.price}</span>
          <button class="btn__submit">ADD TO CART</button>
        </div>
      </div>
    </div>
    `;

    productsContainer.insertAdjacentHTML("beforeend", html);
  });
};
