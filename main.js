// let loader = document.querySelector(".loader-sec");

// window.addEventListener("load", () => {
//   setTimeout(() => {
//     loader.classList.add("hidden");
//   }, 2000);
// });
let loader = document.querySelector(".loader-sec");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("opacity-0");
    loader.classList.remove("opacity-100");

    loader.addEventListener("transitionend", () => {
      loader.classList.add("hidden");
    });
  }, 2000);
});
let mobNav = document.querySelector(".mob-nav");
let menuIcon = document.getElementById("m-icon");
let navBg = document.getElementById("navBg");
let mobMenu = document
  .getElementById("mob-menu")
  .addEventListener("click", () => {
    mobNav.classList.toggle("translate-x-[-100%]");
    navBg.classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
    menuIcon.classList.toggle("ri-close-large-fill");
  });
navBg.addEventListener("click", () => {
  mobNav.classList.add("translate-x-[-100%]");
  navBg.classList.add("hidden");
  document.body.classList.remove("overflow-hidden");
  menuIcon.classList.remove("ri-close-large-fill");
  menuIcon.classList.add("ri-menu-3-line");
});

let shopDrop = document.querySelector(".mob-nav .drop-arrow");
let shopHeading = document.querySelector(".mob-nav .shop-head");
let shopCatContainer = document.querySelector(".shop-cat-mob");
shopHeading.addEventListener("click", () => {
  shopDrop.classList.toggle("rotate-90");
  shopHeading.classList.toggle("mb-4");
  shopCatContainer.classList.toggle("hidden");
});

document.querySelector(".shopBtn").addEventListener("mouseenter", () => {
  document
    .querySelector(".shop-cat")
    .classList.replace("opacity-0", "opacity-100");
  document.querySelector(".shop-cat").classList.remove("hidden");
});
document.querySelector(".shopBtn").addEventListener("click", () => {
  document
    .querySelector(".shop-cat")
    .classList.replace("opacity-0", "opacity-100");
  document.querySelector(".shop-cat").classList.remove("hidden");
});
document.querySelector(".close-cat").addEventListener("click", () => {
  document
    .querySelector(".shop-cat")
    .classList.replace("opacity-100", "opacity-0");
  document.querySelector(".shop-cat").classList.add("hidden");
});
document.querySelector(".shop-cat").addEventListener("mouseleave", () => {
  document
    .querySelector(".shop-cat")
    .classList.replace("opacity-100", "opacity-0");
  document.querySelector(".shop-cat").classList.add("hidden");
});
document
  .querySelector(".pc-nav :nth-child(1)")
  .addEventListener("mouseenter", () => {
    document
      .querySelector(".shop-cat")
      .classList.replace("opacity-100", "opacity-0");
    document.querySelector(".shop-cat").classList.add("hidden");
  });
document
  .querySelector(".pc-nav :nth-child(3)")
  .addEventListener("mouseenter", () => {
    document
      .querySelector(".shop-cat")
      .classList.replace("opacity-100", "opacity-0");
    document.querySelector(".shop-cat").classList.add("hidden");
  });
