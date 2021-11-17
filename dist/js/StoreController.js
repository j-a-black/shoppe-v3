"use strict";

import { handleIconClick } from "./MobileMenu.js";
import { displayProducts } from "./StoreView.js";
import { productData } from "./data.js";

window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  const navIcon = document.querySelector(".mobile-menu-icon");
  navIcon.addEventListener("click", handleIconClick);
  displayProducts(productData);
  // Event delegation for dynamically created products on store page
  const productsContainer = document.querySelector(".products-container");
  // productsContainer.addEventListener("click", changeItemQty);
}
