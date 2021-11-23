"use strict";

import { products } from "./data.js";
import { handleIconClick } from "./mobileMenu.js";
import { displayProducts, initCart } from "./cart.js";

window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  initMobileNav();
  displayProducts(products);

  // Event delegator
  const productsContainer = document.querySelector(".products-container");
  productsContainer.addEventListener("click", initCart);
}

// revisit
const initMobileNav = () => {
  const navIcon = document.querySelector(".mobile-menu-icon");
  navIcon.addEventListener("click", handleIconClick);
};
