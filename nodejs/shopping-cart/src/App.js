import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminPage from "./components/adminPage/AdminPage";
import ProductsPage from "./components/productsPage/ProductsPage";
import SignInPage from "./components/signInPage/SignInPage";
import HomePage from "./components/pages/homePage/HomePage";
import SignUpPage from "./components/signUpPage/SignUpPage";
import PaymentPage from "./components/paymentPage/PaymentPage";
import AddProductsPage from "./components/addProductsPage/AddProductsPage";

import Header from "./components/header/Header";
const App = () => {
  return (
    <div>
      <BrowserRouter basename="/shopping-cart">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/products" element={<ProductsPage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/user/sign-in" element={<SignInPage />}></Route>
          <Route path="/user/sign-up" element={<SignUpPage />}></Route>
          <Route path="/payment" element={<PaymentPage />}></Route>
          <Route path="/add-product" element={<AddProductsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
