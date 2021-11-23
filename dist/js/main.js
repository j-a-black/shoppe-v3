"use strict";

import { products } from "./data.js";
import { handleIconClick } from "./mobileMenu.js";
import { displayProducts } from "./cart.js";

window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  initMobileNav();
  displayProducts(products);
}

// revisit
const initMobileNav = () => {
  const navIcon = document.querySelector(".mobile-menu-icon");
  navIcon.addEventListener("click", handleIconClick);
};
