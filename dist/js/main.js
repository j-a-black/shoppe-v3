"use strict";

import { products } from "./data.js";
import { handleIconClick } from "./mobileMenu.js";

window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  initMobileNav();
  displayProducts(products);

  const addToCartBtn = document.querySelectorAll(".btn__submit");
  for (let i = 0; i < addToCartBtn.length; i++) {
    addToCartBtn[i].addEventListener("click", handleAddToCartBtnClicked);
  }
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Toggle mobile menu when hamburger or arrow icon is clicked
const initMobileNav = () => {
  const navIcon = document.querySelector(".mobile-menu-icon");
  navIcon.addEventListener("click", handleIconClick);
};

// Displays products in Shop Page DOM
const displayProducts = (products) => {
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
        <span class="product-card__description">${item.description}</span>
      <div class="product-card__content">
        <span class="product-card__price">${item.price}</span>
        <button class="btn__submit">ADD TO CART</button>
      </div>
      </div>
    </div>
      `;
    productsContainer.insertAdjacentHTML("beforeend", html);
  });

  displayItemsInCart();
};

// Event listenor for ADD TO CART button
const handleAddToCartBtnClicked = (event) => {
  let button = event.target;
  let item = button.parentElement.parentElement.parentElement;
  let itemId = item.getAttribute("id");
  let imgSrc = item.querySelector(".product-card__image").src;
  let title = item.querySelector(".product-card__title").innerHTML;
  let description = item.querySelector(".product-card__description").innerHTML;
  let price = item.querySelector(".product-card__price").innerHTML;

  let productItem = {
    item,
    itemId,
    imgSrc,
    title,
    description,
    price,
    qty: 1,
  };
  addItemToCart(productItem);

  // console.log(itemId, imgSrc, title, description, price);
};

const handleRemoveFromCartBtnClicked = (event) => {
  let trash = event.target;
  let cartItemId =
    trash.parentElement.parentElement.parentElement.parentElement.getAttribute(
      "id"
    );
  removeItemFromCart(cartItemId);
};

// Item class used to push products to cart array
// let Item = function (itemId, imgSrc, title, description, price, qty = 1) {
//   this.itemId = parseInt(itemId);
//   this.imgSrc = imgSrc;
//   this.title = title;
//   this.description = description;
//   this.price = price;
//   this.qty = qty;
// };

const addItemToCart = (productItem) => {
  let foundItem = cart.some((el) => el.itemId == productItem.itemId);

  if (!foundItem) {
    updateCart(productItem);
  }
};

const removeItemFromCart = (cartItemId) => {
  console.log("clicked");
  for (let i = cart.length - 1; i >= 0; i--) {
    if (cart[i].itemId == cartItemId) {
      cart.splice(i, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      displayItemsInCart();
    }
  }
};

// Update Cart by pushing new instance of Item into cart carry
const updateCart = (productItem) => {
  cart.push(productItem);
  // console.log(cart);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayItemsInCart();
};

// Increase Qty
const handleIncreaseQtyBtnClicked = (event) => {
  let cartItem =
    event.target.parentElement.parentElement.parentElement.parentElement;
  let cartItemId = cartItem.getAttribute("id");
  console.log(cartItemId);
  // let currentQtyValue = cartItem.querySelector(".cart__qty-input").value;
  cart.forEach((item) => {
    if (item.itemId == cartItemId) {
      if (item.qty >= 50) {
        item.qty = 50;
        return;
      }
      ++item.qty;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayItemsInCart();
    }
  });
};

const handleDecreaseQtyBtnClicked = (event) => {
  let cartItem =
    event.target.parentElement.parentElement.parentElement.parentElement;
  let cartItemId = cartItem.getAttribute("id");
  console.log(cartItemId);
  cart.forEach((item) => {
    if (item.itemId == cartItemId) {
      if (item.qty < 2) {
        item.qty = 1;
        return;
      }
      --item.qty;
      localStorage.setItem("cart", JSON.stringify(cart));
      displayItemsInCart();
    }
  });
};

// Displays items in Cart
const displayItemsInCart = () => {
  // note: cart array now pulls from local storage
  if (cart.length > 0) {
    const productsList = document.querySelector(".cart__items-list");
    let html = "";
    cart.forEach((product) => {
      html += `
      <tr id="${product.itemId}" class="cart__item">
        <td>
          <img
            class="cart__item-image"
            src="${product.imgSrc}"
            alt="${product.description}"
            loading="lazy"
          />
        </td>
        <td>
          <div class="cart__qty-wrapper">
            <span data-action="title">${product.title}</span>
            <form class="cart__qty">
              <span class="cart__qty-decrement">-</span>
              <input
                class="cart__qty-input"
                type="number"
                min="1"
                max="50"
                value="${product.qty}"
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
  } else {
    const productsList = document.querySelector(".cart__items-list");
    let html = '<p class="cart__empty-message">Your Cart Is Empty!</p>';

    productsList.innerHTML = "";
    productsList.insertAdjacentHTML("beforeend", html);
  }
  // Adding event delagators for removing items
  const removeFromCartBtn = document.querySelectorAll('[data="delete-icon"]');
  for (let i = 0; i < removeFromCartBtn.length; i++) {
    removeFromCartBtn[i].addEventListener(
      "click",
      handleRemoveFromCartBtnClicked
    );
  }

  // Adding event delagators for changing quantities
  const increaseQtyBtn = document.querySelectorAll(".cart__qty-increment");
  for (let i = 0; i < increaseQtyBtn.length; i++) {
    increaseQtyBtn[i].addEventListener("click", handleIncreaseQtyBtnClicked);
  }

  const decreaseQtyBtn = document.querySelectorAll(".cart__qty-decrement");
  for (let i = 0; i < decreaseQtyBtn.length; i++) {
    decreaseQtyBtn[i].addEventListener("click", handleDecreaseQtyBtnClicked);
  }
};
