import { cart, products } from "./data.js";

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
  displayInCart();
};

// Cart related fuctions

export const initCart = (event) => {
  if (event.target.className !== "btn__submit") return;
  let addToCartBtn = event.target;
  let productDivElement =
    addToCartBtn.parentElement.parentElement.parentElement;
  addToCart(productDivElement);
};

let getProductInfo = (productDivElement) => {
  const productInfo = {
    id: productDivElement.getAttribute("id"),
    image: productDivElement.querySelector(".product-card__image").src,
    title: productDivElement.querySelector(".product-card__title").textContent,
    description: productDivElement.querySelector(".product-card__description")
      .textContent,
    price: productDivElement.querySelector(".product-card__price").textContent,
  };
  return productInfo;
};

const addToCart = (productDivElement) => {
  let foundItem = cart.some(
    (el) => el.id === productDivElement.getAttribute("id")
  );

  if (!foundItem) {
    let item = getProductInfo(productDivElement);
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  displayInCart();
};

const displayInCart = () => {
  if (cart.length > 0) {
    const productsList = document.querySelector(".cart__items-list");

    let html = "";
    cart.forEach((product) => {
      html += `
    <tr id="${product.id}" class="cart__item">
      <td>
        <img
          class="cart__item-image"
          src="${product.image}"
          alt="${product.description}"
          loading="lazy"
        />
      </td>
      <td>
        <div class="cart__qty-wrapper">
          <span>${product.title}</span>
          <form class="cart__qty">
            <span class="cart__qty-decrement">-</span>
            <input
              class="cart__qty-input"
              type="number"
              min="1"
              max="50"
              value="1"
            />
            <span class="cart__qty-increment">+</span>
          </form>
        </div>
      </td>
      <td>
        <div class="cart__price-body">
          <span class="cart__price">${product.price}</span>
          <span class="cart__delete-icon"><i class="fas fa-trash-alt" data="delete-icon"></i></span>
        </div>
      </td>
    </tr>
    `;
    });

    productsList.innerHTML = "";
    productsList.insertAdjacentHTML("beforeend", html);
  }
};

export const handleCartItemClicked = (event) => {
  qtyBtnClicked(event);
  removeBtnClicked(event);
};

const qtyBtnClicked = (event) => {
  if (
    event.target.className !== "cart__qty-decrement" &&
    event.target.className !== "cart__qty-increment"
  )
    return;
  console.log("qty clicked");
};

const removeBtnClicked = (event) => {
  if (event.target.className !== "fas fa-trash-alt") return;
  let cartItem =
    event.target.parentElement.parentElement.parentElement.parentElement;
  let cartItemId = cartItem.getAttribute("id");
  cart = cart.filter((item) => cartItemId !== item.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayInCart();
};
