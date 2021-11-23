"use strict";

import { handleIconClick } from "./MobileMenu.js";
import { productData } from "./data.js";

window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  controlMobileNav();
  const displayProducts = () => {
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
            <button class="btn__submit" onclick="addToCart(${item.id})">ADD TO CART</button>
          </div>
        </div>
      </div>
      `;

      productsContainer.insertAdjacentHTML("beforeend", html);
    });
  };
  displayProducts();
}

const controlMobileNav = () => {
  const navIcon = document.querySelector(".mobile-menu-icon");
  navIcon.addEventListener("click", handleIconClick);
};
