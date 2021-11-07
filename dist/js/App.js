"use strict";

import { handleIconClick } from "./MobileMenu.js";

window.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  const navIcon = document.querySelector(".mobile-menu-icon");
  navIcon.addEventListener("click", handleIconClick);
}
