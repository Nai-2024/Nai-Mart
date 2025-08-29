



export function getCart() {
  const cart = localStorage.getItem("cart"); // - cart → the value we got from localStorage.getItem("cart"). If nothing is stored yet, cart will be null.
  return cart ? JSON.parse(cart) : []; //  - cart ? JSON.parse(cart) : [] → means: If cart exists → convert the string to a  JavaScript array using JSON.parse(cart). other wise return an empty array []
}

/*
 - localStorage a built-in feature of your browser (Chrome, Firefox, etc.).
 - store small amounts of data directly in the browser.
 - The data stays saved even if you refresh the page or close the browser.
 - Data is always stored as strings.
 - getItem is a method of localStorage.
 - It is used to read data from the browser.
 - You pass a key (a name) to it, and it returns the value stored under that key.
*/

export function addToCart(product) {
  const cart = getCart(); 
  // Now adding the new product to the existing cart items
  // saves data in the browser under the name key. We use "cart" as the key.
  // JSON.stringify(cart) converts the array into a string because localStorage can only store strings.
  // Now the updated cart is saved in the browser, so even if the page is refreshed, the cart stays there.



  // check if product already exists
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    // increase quantity
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    // add new product with quantity = 1
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

// Remove product from cart
export function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Clear cart
export function clearCart() {
  localStorage.removeItem("cart");
}

// Calculate total and shipment calculations
export function calculateCartTotals(cartItems) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  let shipping = cartItems.reduce((sum, item) => {
    const qty = item.quantity || 1;
    const cat = (item.category || "").toLowerCase();
    const rate = cat.includes("clothing")
      ? 12
      : cat.includes("electronics")
      ? 15
      : cat.includes("jewel")
      ? 20
      : 10;

    return sum + rate * qty;
  }, 0);

  // Apply shipping discount
  shipping = subtotal > 500 ? 0 : subtotal >= 250 ? shipping * 0.5 : shipping;

  const tax = subtotal * 0.13;
  const total = subtotal + tax + shipping;

  return { subtotal, shipping, tax, total };
}
