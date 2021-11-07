const sidebar = document.querySelector(".sidebar");
const mobileOverlay = document.querySelector(".mobile-overlay");
const sidebarIcon = document.querySelector(".sidebar__icon");
const container = document.querySelector(".container");
const mobileLinks = document.querySelectorAll(".sidebar__link");

export const handleIconClick = () => {
  sidebar.classList.add("sidebar-active");
  mobileOverlay.style.display = "block";
  sidebarIcon.addEventListener("click", closeSidebar);
  mobileOverlay.addEventListener("click", closeSidebar);
  container.classList.add("no-scrolling");

  for (let i = 0; i < mobileLinks.length; i++) {
    let link = mobileLinks[i];
    link.addEventListener("click", closeSidebar);
  }
};

const closeSidebar = () => {
  sidebar.classList.remove("sidebar-active");
  container.classList.remove("no-scrolling");
  mobileOverlay.style.display = "none";
};
