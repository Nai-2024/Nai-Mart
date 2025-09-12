// React imports
import { useContext, useEffect } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { CartContext } from "../components/cart/CartProvider"; 
import { getCart, calculateCartTotals } from "../services/cartUtils"; 
import CartSummary from "../components/cart/CartSummery"; 
import PaymentForm from "../components/forms/PaymentForm"; 

export default function Payment() {
  // Access cart state and functions from CartContext
  const { cartItems, setCartItems, clearCart } = useContext(CartContext);

  // Navigation hook to redirect user after payment
  const navigate = useNavigate();

  // Load cart items from local storage when component mounts
  useEffect(() => {
    const items = getCart(); // Get saved cart items
    setCartItems(items); // Update context state with items
  }, []); // Empty dependency array → runs only once when component mounts

  // Calculate totals based on current cart items
  const { subtotal, shipping, tax, total } = calculateCartTotals(cartItems);

  // Function to handle payment form submission
  const handlePaymentSubmit = (paymentData) => {
    // Prepare order data
    const orderData = {
      items: cartItems, // Items in the cart
      totals: calculateCartTotals(cartItems), // Subtotal, tax, shipping, total
      payment: paymentData, // Payment information from form
      date: new Date().toISOString(), // Order date in ISO format
    };

    // Save last order to local storage (could be used for order confirmation page)
    localStorage.setItem("lastOrder", JSON.stringify(orderData));

    // Clear cart after successful payment
    clearCart();

    // Navigate to order confirmation page
    navigate("/order-confirmation");
  };

  // JSX render
  return (
    <div className="w-full flex justify-center px-4">
      {/* Main container for payment page */}
      <div className="w-full max-w-[1400px] flex flex-col md:flex-row gap-2 py-4">
        
        {/* Payment Form Section */}
        <div className="w-full md:w-2/3 p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold pb-4">Payment Details:</h2>
          {/* PaymentForm component, submits paymentData to handlePaymentSubmit */}
          <PaymentForm onSubmit={handlePaymentSubmit} />
        </div>

        {/* Cart Summary Section */}
        <div className="w-full md:w-1/3 flex flex-col gap-4">
          {/* CartSummary component showing subtotal, tax, shipping, total */}
          <CartSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
            showCheckoutButton={false} // Hide checkout button because we are already on payment page
            className="bg-gray-100 rounded shadow"
          />
        </div>

      </div>
    </div>
  );
}
