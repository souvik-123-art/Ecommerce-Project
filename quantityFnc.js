// Quantity controls
let increaseValue = () => {
  const input = document.querySelector(".quantity p");
  input.textContent = parseInt(input.textContent) + 1;
};

let decreaseValue = () => {
  const input = document.querySelector(".quantity p");
  if (parseInt(input.textContent) > 1) {
    input.textContent = parseInt(input.textContent) - 1;
  }
};
