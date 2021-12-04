const cartSidebar = document.querySelector(".cart");
const sidebarIcon = document.querySelector(
  '[data-action="cart-sidebar-arrow"]'
);
const mobileOverlay = document.querySelector(".mobile-overlay");

export const handleShoppingCartIconClicked = () => {
  cartSidebar.classList.add("cart-sidebar-active");
  mobileOverlay.style.display = "block";
  sidebarIcon.addEventListener("click", closeSidebar);
  mobileOverlay.addEventListener("click", closeSidebar);
};

const closeSidebar = () => {
  cartSidebar.classList.remove("cart-sidebar-active");
  mobileOverlay.style.display = "none";
};
