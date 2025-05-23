const saleSwiper = new Swiper(".sale-swiper", {
  loop: true,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return `
        <span class="${className}">
          <span class="progress"></span>
        </span>
      `;
    },
  },
  on: {
    init: function () {
      updateBulletProgress(this);
    },
    slideChange: function () {
      updateBulletProgress(this);
    },
    autoplayTimeLeft: function (swiper, time, progress) {
      const bullets = document.querySelectorAll(".swiper-pagination-bullet");
      const activeBullet = bullets[swiper.realIndex];
      if (activeBullet) {
        const progressEl = activeBullet.querySelector(".progress");
        progressEl.style.width = `${(1 - progress) * 100}%`; // Inverted progress
      }
    },
  },
});

function updateBulletProgress(swiper) {
  const bullets = document.querySelectorAll(".swiper-pagination-bullet");
  bullets.forEach((bullet, index) => {
    const progressEl = bullet.querySelector(".progress");
    progressEl.style.width = index === swiper.realIndex ? "0%" : "0%"; // Start empty
  });
}
