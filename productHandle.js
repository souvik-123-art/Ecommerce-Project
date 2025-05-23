let mainImg = document.querySelector(".lg-img");
let smallImages = document.querySelectorAll(".sm-img");
smallImages.forEach((img, index) => {
  if (index === 0) {
    img.classList.replace("opacity-100", "opacity-60");
  }

  img.addEventListener("click", () => {
    smallImages.forEach((smallImg) => {
      smallImg.classList.replace("opacity-60", "opacity-100");
    });

    // Set clicked image as active
    img.classList.replace("opacity-100", "opacity-60");

    // Update main image
    mainImg.src = img.src;
  });
});

const updateSingleProductPage = () => {
  // Get product ID and category from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const productCat = urlParams.get("cat");
  // Find the product based on category
  let product;
  let categoryProducts = [];
  if (productCat === "Male") {
    product = maleProducts.find((p) => p.id === parseInt(productId));
    categoryProducts = maleProducts;
    console.log("Found male product:", product);
  } else if (productCat === "Female") {
    product = femaleProducts.find((p) => p.id === parseInt(productId));
    categoryProducts = femaleProducts;
    console.log("Found female product:", product);
  } else if (productCat === "Children") {
    product = kidsProducts.find((p) => p.id === parseInt(productId));
    categoryProducts = kidsProducts;
    console.log("Found kids product:", product);
  }
  if (mainImg && smallImages.length === 4) {
    mainImg.src = product.image;
    smallImages[0].src = product.image1;
    smallImages[1].src = product.image2;
    smallImages[2].src = product.image3;
    smallImages[3].src = product.image4;
  }
  if (product) {
    document.querySelector(".pro-brand").textContent = product.brand;
    document.querySelector(".pro-title").textContent = product.title;
    document.querySelector(".pro-star").textContent = `${product.rating.toFixed(
      1
    )} ★`;
    document.querySelector(
      ".pro-rate"
    ).textContent = `(${product.ratingsCount.toLocaleString("en-IN")} Ratings)`;
    document.querySelector(
      ".pro-act-price"
    ).innerHTML = `<span class="price line-through"> MRP ₹${product.originalPrice.toLocaleString(
      "en-IN"
    )}</span> <span>(${product.discount}% OFF)</span>`;
    const discountedPrice =
      product.originalPrice * (1 - product.discount / 100);
    document.querySelector(".pro-dis-price").textContent = `₹${Math.round(
      discountedPrice
    ).toLocaleString("en-IN")}.00`;
    const createDetailRow = (label, value) => {
      return value
        ? `
    <div class="${label.toLowerCase()} w-full flex gap-8">
      <div class="font-bold w-1/2"><h1>${label}</h1></div>
      <div class="w-1/2"><h1>${value}</h1></div>
    </div>
  `
        : "";
    };

    document.querySelector(".box").innerHTML = `
  ${createDetailRow("Material", product.material)}
  ${createDetailRow("Fit type", product.fit)}
  ${createDetailRow("Sleeve type", product.sleeve)}
  ${createDetailRow("Collar style", product.style)}
  ${createDetailRow("Length", product.length)}
  ${createDetailRow("Neck style", product.neck)}
  ${createDetailRow("Country of Origin", product.origin)}
`;
  }
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

// Function to show featured products from same category
const showFeaturedProducts = (categoryProducts, currentProductId) => {
  const featuredContainer = document.querySelector("#featured-wrapper");
  if (!featuredContainer) {
    console.log("Featured products container not found");
    return;
  }

  // Clear existing products
  featuredContainer.innerHTML = "";

  // Filter out current product and get trending products from same category
  const featuredProducts = categoryProducts
    .filter((p) => p.id !== currentProductId && p.isTrending) // Only get trending products
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  console.log("Featured trending products:", featuredProducts);

  // Use the same product template
  const ProductTemplate = document.querySelector("#productTemplate");
  if (!ProductTemplate) {
    console.log("Product template not found");
    return;
  }

  featuredProducts.forEach((curProd) => {
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

    featuredContainer.appendChild(productClone);
  });
};

setTimeout(() => {
  updateSingleProductPage();
  // Show featured products after updating single product page
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const productCat = urlParams.get("cat");

  let categoryProducts = [];
  if (productCat === "Male") {
    document.querySelector("#featured-products .heading").innerHTML = `        <h1
          class="heading md:text-4xl sm:text-3xl text-2xl font-bold font-['lexend_giga'] mb-8 text-center"
        >
          <span class="text-[#2563EB]">Men's</span> Trending Products
        </h1>`;
    categoryProducts = maleProducts;
  } else if (productCat === "Female") {
    document.querySelector("#featured-products .heading").innerHTML = `        <h1
          class="heading md:text-4xl sm:text-3xl text-2xl font-bold font-['lexend_giga'] mb-8 text-center"
        >
          <span class="text-pink-300">Women's</span> Trending Products 
        </h1>`;
    categoryProducts = femaleProducts;
  } else if (productCat === "Children") {
    document.querySelector("#featured-products .heading").innerHTML = `        <h1
          class="heading md:text-4xl sm:text-3xl text-2xl font-bold font-['lexend_giga'] mb-8 text-center"
        >
          <span class="text-[#FFA500]">Kids'</span> Trending Products 
        </h1>`;
    categoryProducts = kidsProducts;
  }

  showFeaturedProducts(categoryProducts, parseInt(productId));
}, 500);
