import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import SignInPage from "./pages/signInPage/SignInPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import ProductsPage from "./pages/productsPage/ProductsPage";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import AdminPage from "./pages/adminPage/AdminPage";
import AddProductsPage from "./pages/addProductsPage/AddProductsPage";
import Header from "./components/header/Header";
import HomepageHeader from "./components/homepage_header/HomepageHeader";
const App = () => {
  return (
    <>
      <BrowserRouter basename="/shopping-cart">
        <HomepageHeader/>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/user/sign-in" element={<SignInPage />}></Route>
          <Route path="/user/sign-up" element={<SignUpPage />}></Route>
          <Route path="/products" element={<ProductsPage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/user/payment" element={<PaymentPage />}></Route>
          <Route path="/add-product" element={<AddProductsPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;