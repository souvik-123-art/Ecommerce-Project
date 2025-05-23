let cart = document.querySelector("#product-cart");

// Function to update cart count
function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const totalItems = parseInt(cartItems.length);
  const cartCount = document.querySelector(".bg-orange-400");
  if (cartCount) {
    if (totalItems === 0) {
      cartCount.classList.add("hidden");
    } else {
      cartCount.classList.remove("hidden");
      cartCount.textContent = totalItems;
    }
  }
}

let addToCart = (img, name, price, size, quantity) => {
  // Check if size is selected
  if (size.value === "Select Size") {
    alert("Please select a size before adding to cart");
    return;
  }

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Check if product with same name and size already exists
  const existingItemIndex = cartItems.findIndex(
    (item) => item.name === name.textContent && item.size === size.value
  );

  if (existingItemIndex !== -1) {
    // Update quantity of existing item
    const existingItem = cartItems[existingItemIndex];
    const newQuantity =
      parseInt(existingItem.quantity) + parseInt(quantity.textContent);
    existingItem.quantity = newQuantity.toString();

    // Update subtotal
    const priceValue = parseFloat(
      price.textContent.replace("₹", "").replace(",", "")
    );
    existingItem.subtotal = `₹${(priceValue * newQuantity).toLocaleString(
      "en-IN",
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )}`;

    // Show notification
    const notification = document.querySelector(".cart-noti");
    notification.classList.add("right-10");
    setTimeout(() => {
      notification.classList.remove("right-10");
    }, 2000);
  } else {
    // Create new cart item object
    let cartItem = {
      image: img?.src,
      name: name?.textContent,
      price: price?.textContent,
      size: size?.value,
      quantity: quantity?.textContent,
      subtotal: `₹${(
        parseFloat(price?.textContent.replace("₹", "").replace(",", "")) *
        Number(quantity?.textContent)
      ).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    };

    // Add new item to cart
    cartItems.push(cartItem);

    // Show notification
    const notification = document.querySelector(".cart-noti");
    notification.classList.add("right-10");
    setTimeout(() => {
      notification.classList.remove("right-10");
    }, 2000);
  }

  // Save back to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Update cart count
  updateCartCount();

  if (cart) {
    displayCartItems();
  }
};

function calculateTotal() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let subtotal = 0;

  // Calculate subtotal only if there are items in cart
  if (cartItems.length > 0) {
    cartItems.forEach((item) => {
      let price = parseFloat(item.price.replace("₹", "").replace(",", ""));
      let quantity = parseInt(item.quantity);
      subtotal += price * quantity;
    });
  }

  // Add tax (50$ as specified)
  const tax = 50;
  const total = subtotal + tax;

  return {
    subtotal: subtotal.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    tax: tax.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    total: total.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  };
}

function updateCartItemQuantity(index, action) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (index >= 0 && index < cartItems.length) {
    const item = cartItems[index];
    const currentQuantity = parseInt(item.quantity);

    if (action === "increase") {
      item.quantity = (currentQuantity + 1).toString();
    } else if (action === "decrease" && currentQuantity > 1) {
      item.quantity = (currentQuantity - 1).toString();
    }

    // Update subtotal with consistent formatting
    const price = parseFloat(item.price.replace("₹", "").replace(",", ""));
    item.subtotal = `₹${(price * parseInt(item.quantity)).toLocaleString(
      "en-IN",
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    )}`;

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    displayCartItems();
  }
}

function displayCartItems() {
  if (!cart) return;

  // Clear existing cart items
  cart.innerHTML = "";

  // Get cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Display cart items or empty message
  if (cartItems.length === 0) {
    cart.innerHTML =
      '<p class="text-center w-full py-4">Your cart is empty</p>';
    // Remove total section when cart is empty
    const totalPriceSection = document.querySelector("#total-price");
    if (totalPriceSection) {
      totalPriceSection.innerHTML = "";
    }
  } else {
    // Display each cart item
    cartItems.forEach((item, index) => {
      let cartBox = document.createElement("div");
      cartBox.classList.add(
        "product-box",
        "bg-white",
        "rounded-lg",
        "shadow",
        "p-4",
        "flex"
      );
      cartBox.innerHTML = `
                  <div class="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src="${item.image}"
              alt="Product"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="ml-4 flex-1">
            <div class="flex justify-between gap-4">
              <h2 class="font-medium text-gray-900">${
                item.name.split(" ").slice(0, 8).join(" ") +
                (item.name.split(" ").length > 8 ? "..." : "")
              }</h2>
              <button class="remove-cart-btn text-gray-400">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-1">Size: ${item.size}</p>
            <div class="flex items-center justify-between mt-2">
              <div
                class="cart-quantity border rounded border-gray-300 px-2 py-1 text-lg inline-flex gap-4"
                data-index="${index}"
              >
                <button class="cursor-pointer" onclick="updateCartItemQuantity(${index}, 'decrease')">
                  -
                </button>
                <p>${item.quantity}</p>
                <button class="cursor-pointer" onclick="updateCartItemQuantity(${index}, 'increase')">
                  +
                </button>
              </div>
              <p class="font-bold">${item.subtotal}</p>
            </div>
          </div>`;
      cart.appendChild(cartBox);
    });

    document.querySelectorAll(".remove-cart-btn").forEach((button, index) => {
      button.addEventListener("click", function () {
        removeFromCart(index);
      });
    });

    const totals = calculateTotal();
    const totalsSection = document.createElement("div");
    totalsSection.classList.add(
      "total-sec",
      "mx-4",
      "my-6",
      "bg-white",
      "shadow-lg",
      "border-t",
      "p-4"
    );
    totalsSection.innerHTML = `
        <h2 class="font-bold text-lg mb-3">Order Summary</h2>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal</span>
            <span>₹${totals.subtotal}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Shipping</span>
            <span>Free</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-600">Tax</span>
            <span>₹${totals.tax}</span>
          </div>
          <div class="border-t my-2"></div>
          <div class="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹${totals.total}</span>
          </div>
        </div>
  `;
    const totalPriceSection = document.querySelector("#total-price");
    if (totalPriceSection) {
      totalPriceSection.innerHTML = "";
      totalPriceSection.appendChild(totalsSection);
    }
  }
}

function removeFromCart(index) {
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (index >= 0 && index < cartItems.length) {
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    displayCartItems();
    // Update cart count after removing item
    updateCartCount();
  }
}

document.querySelector("#addToCart")?.addEventListener("click", () => {
  const section = document.querySelector("#pro-buy");
  if (!section) return;

  const productImg = section.querySelector(".lg-img");
  const productName = section.querySelector(".pro-title");
  const productPrice = section.querySelector(".pro-dis-price");
  const productSize = section.querySelector(".pro-size");
  const productQuantity = section.querySelector(".quantityVal");

  if (
    productImg &&
    productName &&
    productPrice &&
    productSize &&
    productQuantity
  ) {
    addToCart(
      productImg,
      productName,
      productPrice,
      productSize,
      productQuantity
    );
  } else {
    console.error("Missing required product elements");
  }
});

// Update cart count when page loads
if (document.querySelector(".bg-orange-400")) {
  updateCartCount();
}

if (cart) {
  displayCartItems();
}
