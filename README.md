# Nai Mart

**Nai Mart** is a full-featured e-commerce platform built with React, providing a seamless online shopping experience.  
It includes product browsing, cart management, checkout, user authentication, payment processing, and order confirmation with Firebase and REST API integration.

---

## 📂 Project Structure

```text
src/
 ├─ assets/                        # All static assets (images, icons, logos)
 │ ├─ logo.png                     # Website/app logo
 │ ├─ cart.png                     # Cart icon
 │ └─ ...other images              # Any other product images or icons
 │
 ├─ components/                    # Reusable UI components
 │ ├─ cart/                        # All cart-related components
 │ │ ├─ CartItem.jsx               # Displays a single cart item with quantity controls
 │ │ ├─ CartProvider.jsx           # Context provider to manage cart state across app
 │ │ ├─ CartSummary.jsx            # Shows subtotal, tax, shipping, total, and optional action button
 │ │
 │ ├─ forms/                       # Form components used throughout the app
 │ │ ├─ PaymentForm.jsx            # Form to collect payment information (card, expiry, CVV)
 │ │ ├─ SignUpForm.jsx             # User registration form, validates input and stores in Firebase
 │ │ └─ SignInForm.jsx             # User login form, authenticates using Firebase Auth
 │ │
 │ ├─ products/                    # Product-related UI components
 │ │ ├─ ProductsList.jsx           # Renders a grid/list of ProductCard components
 │ │ ├─ ProductCart.jsx            # Main cart page, renders CartItem + CartSummary
 │ │ └─ ProductCard.jsx            # UI card for displaying a single product (used in list/grid)
 │ │
 │ ├─ Footer.jsx                   # Footer with company info, links, and social icons
 │ ├─ Header.jsx                   # Top navigation bar with logo, links, search, and cart icon
 │ ├─ ShippingSummary.jsx          # Displays user shipping info fetched from Firebase/localStorage
 │ ├─ SidebarFilters.jsx           # Handles category & price filtering UI
 │ └─ NotificationToast.jsx        # Reusable toast notification component for messages
 │
 ├─ pages/                         # Page-level components (mapped to routes)
 │ ├─ About.jsx                     # About Us page with company info and mission
 │ ├─ Checkout.jsx                  # Checkout page (billing, shipping info, order summary)
 │ ├─ ContactUs.jsx                 # Contact page with form to send messages to company
 │ ├─ Home.jsx                       # Main product listing page
 │ ├─ OrderConfirmation.jsx          # Confirmation page after successful payment/order
 │ ├─ Payment.jsx                    # Payment page, renders PaymentForm + CartSummary (without button)
 │ ├─ ProductDetails.jsx             # Page showing product details, images, and add-to-cart button
 │
 ├─ services/
 │ ├─ api.js                        # Functions for API calls (fetch products, categories, etc.)
 │ ├─ cartUtils.js                  # Cart helper functions (add/remove items, calculate totals)
 │ ├─ companyInfo.js                # Static company info, like address, contact, social links
 │ ├─ firebaseConfig.js             # Firebase initialization and configuration (Auth & Firestore)
 │ ├─ gradientBrandText.jsx         # Utility to apply brand color gradient to text
 │ └─ validation.js                 # Validation helper functions for forms (signup, shipping, payment)
 │
 └─ App.jsx                          # Main entry point, sets up routes, providers, and global state

 ---

**Features** 

  **Home Page & Product Listing**
- Fetches products from **FakeStore API** using REST.
- Displays products in a responsive grid.
- Users can view detailed information on product pages.

### Shopping Cart
- Add/remove items with quantity control.
- Cart summary includes pricing, tax, and shipping.
- State managed globally with **React Context**.

### User Accounts & Checkout
- User **sign up & login with Firebase Authentication**.
- Shipping address & order history stored in **Firestore**.
- Checkout shows final summary before payment.

### Payment & Order Confirmation
- Payment form validation (card number, expiry, CVV).
- Generates order confirmation with ID, total amount, and shipping info.

---

## Tech Stack

- **Frontend:** React + JSX + TailwindCSS
- **State Management:** React Context API
- **Database & Auth:** Firebase Authentication + Firestore
- **API Integration:** FakeStore API (REST)
- **Validation:** Custom validation helpers in `validation.js`
- **Deployment:** GitHub + Netlify / Vercel

---

## Learning & Impact

- Hands-on experience with **Firebase Authentication & Firestore**.
- Learned **REST API integration** and **e-commerce workflows**.
- Implemented **responsive UI, form validation, and checkout logic**.
- Improved understanding of **state management & context providers**.

---
```
