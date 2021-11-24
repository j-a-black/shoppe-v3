import { cart } from "./data.js";

export const displayProducts = (products) => {
  const productsContainer = document.querySelector(".products-container");

  products.forEach((item) => {
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

// Cart related fuctions

export const initCart = (event) => {
  if (event.target.className !== "btn__submit") return;
  let addToCartBtn = event.target;
  let productDivElement =
    addToCartBtn.parentElement.parentElement.parentElement;
  getProductInfo(productDivElement);
};

const getProductInfo = (productDivElement) => {
  const productInfo = {
    id: productDivElement.getAttribute("id"),
    image: productDivElement.querySelector(".product-card__image").src,
    title: productDivElement.querySelector(".product-card__title").textContent,
    description: productDivElement.querySelector(".product-card__description")
      .textContent,
    price: productDivElement.querySelector(".product-card__price").textContent,
  };
  addToCart(productInfo);
};

const addToCart = (productInfo) => {
  let foundItem = cart.some((el) => el.id === productInfo.id);

  if (!foundItem) cart.push(productInfo);
  console.log(cart);
};
