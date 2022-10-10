import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import SignInPage from "./pages/signInPage/SignInPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import ProductsPage from "./pages/productsPage/ProductsPage";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import AdminPage from "./pages/adminPage/AdminPage";
import AddProductsPage from "./pages/addProductsPage/AddProductsPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import HeaderTag from "./components/header_tag/HeaderTag";
import { useDataProvider } from "./context/DataProvider";
const App = () => {
  const { spinner } = useDataProvider();
  return (
    <>
      <BrowserRouter basename="/shopping-cart">
        <Header />
        {spinner && <HeaderTag text={"Loading Data..."} />}

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/user/sign-in" element={<SignInPage />}></Route>
          <Route path="/user/sign-up" element={<SignUpPage />}></Route>
          <Route path="/products" element={<ProductsPage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/user/payment" element={<PaymentPage />}></Route>
          <Route path="/add-product" element={<AddProductsPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;