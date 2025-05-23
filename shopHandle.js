let filterDrop = document.querySelector(".filters .drop-arrow");
let filterText = document.querySelector(".filters .filter-text");
let checkboxContainer = document.querySelector(".chkboxes");
let checkboxBtn = document.querySelector(".filters .btn")
checkboxBtn.addEventListener("click", () => {
  filterDrop.classList.toggle("rotate-90");
  filterText.classList.toggle("mb-6");
  checkboxContainer.classList.toggle("hidden");
});

document.addEventListener("DOMContentLoaded", () => {
  const ProductWrapper = document.querySelector(
    "#shop-products #product-wrapper"
  );
  const ProductTemplate = document.querySelector(
    "#shop-products #productTemplate"
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
      const productClone = document.importNode(ProductTemplate.content, true);
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
      ProductWrapper.append(productClone);
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
  const urlParams = new URLSearchParams(window.location.search);
  const product = urlParams.get("product");
  const productCat = urlParams.get("cat");
  let categoryProducts = [];
  if (product === "T-shirts" && productCat === "Male") {
    categoryProducts = maleProducts;
  }
  if (product === "watch" && productCat === "Male") {
    categoryProducts = maleWatchProducts;
  } else if (product === "T-shirts" && productCat === "Female") {
    categoryProducts = femaleProducts;
  } else if (product === "Watch" && productCat === "Female") {
    categoryProducts = femaleWatchProducts;
  } else if (product === "Dress" && productCat === "Children") {
    categoryProducts = kidsProducts;
  } else if (product === "Mobile" && productCat === "Apple") {
    categoryProducts = iphone;
  } else if (product === "Mobile" && productCat === "Android") {
    categoryProducts = Android;
  }
  showProductContainer(categoryProducts);

  // Add filter functionality
  const filterCheckboxes = document.querySelectorAll(
    '.chkboxes input[type="checkbox"]'
  );
  const productWrapper = document.getElementById("product-wrapper");

  filterCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      const checkedFilters = Array.from(filterCheckboxes)
        .filter((cb) => cb.checked)
        .map((cb) => cb.name.toLowerCase());

      const products = productWrapper.querySelectorAll(".box");

      products.forEach((product) => {
        const productConditions = [];
        const newBadge = product.querySelector("#new");
        const bestsellerBadge = product.querySelector("#bestseller");
        const trendingBadge = product.querySelector("#trending");

        if (!newBadge.classList.contains("hidden"))
          productConditions.push("new");
        if (!bestsellerBadge.classList.contains("hidden"))
          productConditions.push("bestselling");
        if (!trendingBadge.classList.contains("hidden"))
          productConditions.push("trending");

        if (checkedFilters.length === 0) {
          // If no filters are checked, show all products
          product.style.display = "flex";
        } else {
          // Show product if it matches any of the checked filters
          const shouldShow = checkedFilters.some((filter) =>
            productConditions.includes(filter)
          );
          product.style.display = shouldShow ? "flex" : "none";
        }
      });
    });
  });
});
