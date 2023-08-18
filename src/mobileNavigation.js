const menuBtn = document.querySelector(".header__menu-bars");
const mobileMenu = document.querySelector(".mobile-navigation");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("mobile-navigation__none");
  if (menuBtn.getAttribute("src") == "./assets/images/icon-menu.svg") {
    menuBtn.src = "./assets/images/icon-menu-close.svg";
  } else {
    menuBtn.src = "./assets/images/icon-menu.svg";
  }
});
