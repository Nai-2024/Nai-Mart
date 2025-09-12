
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/ContactUs.jsx";
import ProductsPage from "./pages/Home.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payment from "./pages/Payment.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import { CartProvider } from "./components/cart/CartProvider.jsx";
import ProductCart from "./components/products/ProductCart.jsx";
import SignUpForm from "./components/forms/SignUpForm.jsx";
import SignInForm from "./components/forms/SignInForm.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./services/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch full user data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};
        const fullUser = { uid: user.uid, email: user.email, ...userData };

        setCurrentUser(fullUser);
        localStorage.setItem("currentUser", JSON.stringify(fullUser));
      } else {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header currentUser={currentUser} />
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<ProductCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route
                path="/signup"
                element={<SignUpForm setCurrentUser={setCurrentUser} />}
              />
              <Route
                path="/login"
                element={<SignInForm setCurrentUser={setCurrentUser} />}
              />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
