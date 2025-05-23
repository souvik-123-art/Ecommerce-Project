const proSwiper = new Swiper(".proSwiper", {
  loop: true,

  autoplay: {
    delay: 2000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false, 
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    450: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    640: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    1280: {
      slidesPerView: 5,
      spaceBetween: 20,
    },
  },
});

