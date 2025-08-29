import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import ProductsPage from "./pages/Home.jsx";
import Checkout from "./pages/Checkout.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import { CartProvider } from "./components/cart/CartProvider.jsx";
import ProductCart from "./components/cart/ProductCart.jsx";
import UserAuth from "./pages/UserAuth.jsx";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* Main content container */}
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<ProductCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/userauth" element={<UserAuth />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
