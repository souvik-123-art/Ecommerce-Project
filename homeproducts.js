document.addEventListener("DOMContentLoaded", () => {
  // male tshirts starts---->
  const maleProductContainer = document.querySelector(
    "#male-products #product-wrapper"
  );
  const maleProductTemplate = document.querySelector(
    "#male-products #productTemplate"
  );
  const showProductContainer = (products) => {
    if (!products) {
      return false;
    }
    products.forEach((curProd) => {
      const {
        brand,
        category,
        discount,
        id,
        image,
        title,
        originalPrice,
        rating,
        ratingsCount,
        isNew,
        isBestSeller,
        isTrending,
      } = curProd;
      const productClone = document.importNode(
        maleProductTemplate.content,
        true
      );
      productClone
        .querySelector("#box-val")
        .setAttribute("href", `singlePro.html?cat=${category}&id=${id}`);
      productClone
      //   .querySelector("#checkout-buttons-mob #box-val")
      //   .setAttribute("href", `singlePro.html?cat=${category}&id=${id}`);
      // checkoutHover(
      //   productClone.querySelector(".box"),
      //   productClone.querySelector("#checkout-buttons"),
      //   productClone.querySelector(".checkout-bg")
      // );
      productClone.querySelector("#brandName").textContent = brand;
      proNew(isNew, productClone.querySelector("#new"));
      proTrending(isTrending, productClone.querySelector("#trending"));
      probestseller(isBestSeller, productClone.querySelector("#bestseller"));
      productClone.querySelector("#Pro-img").src = image;
      productClone.querySelector("#proTitle").textContent =
        title.split(" ").slice(0, 3).join(" ") +
        (title.split(" ").length > 5 ? "..." : "");
      ratingStar(rating, productClone.querySelector("#stars"));
      productClone.querySelector(
        "#ratingCount"
      ).textContent = `(${ratingsCount.toLocaleString("en-IN")} ratings)`;
      productClone.querySelector("#discount").textContent = `${discount}% off`;
      productClone.querySelector(
        "#actPrice"
      ).textContent = ` ₹${originalPrice.toLocaleString("en-IN")}`;
      discountedPrice(
        discount,
        originalPrice,
        productClone.querySelector("#disPrice")
      );
      // productClone.querySelector("#productActualPrice").textContent = ` ₹${
      //   price * 4
      // }`;
      maleProductContainer.append(productClone);
    });
  };
  const proNew = (isNew, newtxt) => {
    isNew == false
      ? newtxt.classList.add("hidden")
      : newtxt.classList.remove("hidden");
  };
  const proTrending = (istrend, trendtxt) => {
    istrend == false
      ? trendtxt.classList.add("hidden")
      : trendtxt.classList.remove("hidden");
  };
  const probestseller = (isBest, besttxt) => {
    isBest == false
      ? besttxt.classList.add("hidden")
      : besttxt.classList.remove("hidden");
  };
  const ratingStar = (rating, starsContainer) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    starsContainer.innerHTML = `${'<i class="ri-star-fill"></i>'.repeat(full)}${
      half ? '<i class="ri-star-half-line"></i>' : ""
    }${'<i class="ri-star-line"></i>'.repeat(empty)}`;
  };
  const discountedPrice = (discount, originalPrice, disPriceContainer) => {
    let disAmt = (originalPrice * discount) / 100;
    let disPrice = originalPrice - disAmt;
    disPriceContainer.innerHTML = `₹${Math.round(disPrice).toLocaleString(
      "en-IN"
    )}.00`;
  };
  const checkoutHover = (card, buttons, bg) => {
    buttons.classList.add("transition-all", "duration-300", "ease-in-out");
    bg.classList.add("transition-all", "duration-300", "ease-in-out");
    card.addEventListener("mouseenter", () => {
      buttons.classList.remove("hidden", "opacity-0");
      buttons.classList.replace("bottom-0", "bottom-20");
      bg.classList.replace("bottom-[100%]", "bottom-0");
    });
    card.addEventListener("mouseleave", () => {
      buttons.classList.add("opacity-0");
      buttons.classList.add("hidden");
      buttons.classList.replace("bottom-20", "bottom-0");
      bg.classList.replace("bottom-0", "bottom-[100%]");
    });
  };
  showProductContainer(maleProducts);
  // male tshirts ends
});
document.addEventListener("DOMContentLoaded", () => {
  // female tshirts starts---->
  const femaleProductContainer = document.querySelector(
    "#female-products #product-wrapper"
  );
  const femaleProductTemplate = document.querySelector(
    "#female-products #productTemplate"
  );
  const showProductContainer = (products) => {
    if (!products) {
      return false;
    }
    products.forEach((curProd) => {
      const {
        brand,
        category,
        discount,
        id,
        image,
        title,
        originalPrice,
        rating,
        ratingsCount,
        isNew,
        isBestSeller,
        isTrending,
      } = curProd;
      const productClone = document.importNode(
        femaleProductTemplate.content,
        true
      );
      productClone
        .querySelector("#box-val")
        .setAttribute("href", `singlePro.html?cat=${category}&id=${id}`);
      productClone.querySelector("#brandName").textContent = brand;
      proNew(isNew, productClone.querySelector("#new"));
      proTrending(isTrending, productClone.querySelector("#trending"));
      probestseller(isBestSeller, productClone.querySelector("#bestseller"));
      productClone.querySelector("#Pro-img").src = image;
      productClone.querySelector("#proTitle").textContent =
        title.split(" ").slice(0, 3).join(" ") +
        (title.split(" ").length > 5 ? "..." : "");
      ratingStar(rating, productClone.querySelector("#stars"));
      productClone.querySelector(
        "#ratingCount"
      ).textContent = `(${ratingsCount.toLocaleString("en-IN")} ratings)`;
      productClone.querySelector("#discount").textContent = `${discount}% off`;
      productClone.querySelector(
        "#actPrice"
      ).textContent = ` ₹${originalPrice.toLocaleString("en-IN")}`;
      discountedPrice(
        discount,
        originalPrice,
        productClone.querySelector("#disPrice")
      );
      // productClone.querySelector("#productActualPrice").textContent = ` ₹${
      //   price * 4
      // }`;
      femaleProductContainer.append(productClone);
    });
  };
  const proNew = (isNew, newtxt) => {
    isNew == false
      ? newtxt.classList.add("hidden")
      : newtxt.classList.remove("hidden");
  };
  const proTrending = (istrend, trendtxt) => {
    istrend == false
      ? trendtxt.classList.add("hidden")
      : trendtxt.classList.remove("hidden");
  };
  const probestseller = (isBest, besttxt) => {
    isBest == false
      ? besttxt.classList.add("hidden")
      : besttxt.classList.remove("hidden");
  };
  const ratingStar = (rating, starsContainer) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    starsContainer.innerHTML = `${'<i class="ri-star-fill"></i>'.repeat(full)}${
      half ? '<i class="ri-star-half-line"></i>' : ""
    }${'<i class="ri-star-line"></i>'.repeat(empty)}`;
  };
  const discountedPrice = (discount, originalPrice, disPriceContainer) => {
    let disAmt = (originalPrice * discount) / 100;
    let disPrice = originalPrice - disAmt;
    disPriceContainer.innerHTML = `₹${Math.round(disPrice).toLocaleString(
      "en-IN"
    )}.00`;
  };
  const checkoutHover = (card, buttons, bg) => {
    buttons.classList.add("transition-all", "duration-300", "ease-in-out");
    bg.classList.add("transition-all", "duration-300", "ease-in-out");
    card.addEventListener("mouseenter", () => {
      buttons.classList.remove("hidden", "opacity-0");
      buttons.classList.replace("bottom-0", "bottom-20");
      bg.classList.replace("bottom-[100%]", "bottom-0");
    });
    card.addEventListener("mouseleave", () => {
      buttons.classList.add("opacity-0");
      buttons.classList.add("hidden");
      buttons.classList.replace("bottom-20", "bottom-0");
      bg.classList.replace("bottom-0", "bottom-[100%]");
    });
  };
  showProductContainer(femaleProducts);
  // female tshirts ends
});
document.addEventListener("DOMContentLoaded", () => {
  // kids dress starts---->
  const kidsProductContainer = document.querySelector(
    "#kids-products #product-wrapper"
  );
  const kidsProductTemplate = document.querySelector(
    "#kids-products #productTemplate"
  );
  const showProductContainer = (products) => {
    if (!products) {
      return false;
    }
    products.forEach((curProd) => {
      const {
        brand,
        category,
        discount,
        id,
        image,
        title,
        originalPrice,
        rating,
        ratingsCount,
        isNew,
        isBestSeller,
        isTrending,
      } = curProd;
      const productClone = document.importNode(
        kidsProductTemplate.content,
        true
      );
      productClone
        .querySelector("#box-val")
        .setAttribute("href", `singlePro.html?cat=${category}&id=${id}`);
      // productClone
      //   .querySelector("#checkout-buttons-mob #box-val")
      //   .setAttribute("href", `singlePro.html?cat=${category}&id=${id}`);
      // checkoutHover(
      //   productClone.querySelector(".box"),
      //   productClone.querySelector("#checkout-buttons"),
      //   productClone.querySelector(".checkout-bg")
      // );
      productClone.querySelector("#brandName").textContent = brand;
      proNew(isNew, productClone.querySelector("#new"));
      proTrending(isTrending, productClone.querySelector("#trending"));
      probestseller(isBestSeller, productClone.querySelector("#bestseller"));
      productClone.querySelector("#Pro-img").src = image;
      productClone.querySelector("#proTitle").textContent =
        title.split(" ").slice(0, 3).join(" ") +
        (title.split(" ").length > 5 ? "..." : "");
      ratingStar(rating, productClone.querySelector("#stars"));
      productClone.querySelector(
        "#ratingCount"
      ).textContent = `(${ratingsCount.toLocaleString("en-IN")} ratings)`;
      productClone.querySelector("#discount").textContent = `${discount}% off`;
      productClone.querySelector(
        "#actPrice"
      ).textContent = ` ₹${originalPrice.toLocaleString("en-IN")}`;
      discountedPrice(
        discount,
        originalPrice,
        productClone.querySelector("#disPrice")
      );
      // productClone.querySelector("#productActualPrice").textContent = ` ₹${
      //   price * 4
      // }`;
      kidsProductContainer.append(productClone);
    });
  };
  const proNew = (isNew, newtxt) => {
    isNew == false
      ? newtxt.classList.add("hidden")
      : newtxt.classList.remove("hidden");
  };
  const proTrending = (istrend, trendtxt) => {
    istrend == false
      ? trendtxt.classList.add("hidden")
      : trendtxt.classList.remove("hidden");
  };
  const probestseller = (isBest, besttxt) => {
    isBest == false
      ? besttxt.classList.add("hidden")
      : besttxt.classList.remove("hidden");
  };
  const ratingStar = (rating, starsContainer) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    starsContainer.innerHTML = `${'<i class="ri-star-fill"></i>'.repeat(full)}${
      half ? '<i class="ri-star-half-line"></i>' : ""
    }${'<i class="ri-star-line"></i>'.repeat(empty)}`;
  };
  const discountedPrice = (discount, originalPrice, disPriceContainer) => {
    let disAmt = (originalPrice * discount) / 100;
    let disPrice = originalPrice - disAmt;
    disPriceContainer.innerHTML = `₹${Math.round(disPrice).toLocaleString(
      "en-IN"
    )}.00`;
  };
  const checkoutHover = (card, buttons, bg) => {
    buttons.classList.add("transition-all", "duration-300", "ease-in-out");
    bg.classList.add("transition-all", "duration-300", "ease-in-out");
    card.addEventListener("mouseenter", () => {
      buttons.classList.remove("hidden", "opacity-0");
      buttons.classList.replace("bottom-0", "bottom-20");
      bg.classList.replace("bottom-[100%]", "bottom-0");
    });
    card.addEventListener("mouseleave", () => {
      buttons.classList.add("opacity-0");
      buttons.classList.add("hidden");
      buttons.classList.replace("bottom-20", "bottom-0");
      bg.classList.replace("bottom-0", "bottom-[100%]");
    });
  };
  showProductContainer(kidsProducts);
  // kids dress ends
});
