import { HashRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import HomePage from "./pages/homePage/HomePage";
import SignInPage from "./pages/signInPage/SignInPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import ProductsPage from "./pages/productsPage/ProductsPage";
import OrderDetails from "./pages/order_details/OrderDetails";
import PaymentPage from "./pages/paymentPage/PaymentPage";
import AdminPage from "./pages/adminPage/AdminPage";
import AddProductsPage from "./pages/addProductsPage/AddProductsPage";

import { useDataProvider } from "./context/DataProvider";
import LoadingScreen from "./components/loading_screen/LoadingScreen";
import SelectedProduct from "./pages/selected_product/SelectedProduct";
import NotFound from "./pages/404/NotFound";
const App = () => {
  const { spinner } = useDataProvider();
  return (
    <>
      {spinner && <LoadingScreen />}

      <HashRouter>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/user/sign-in" element={<SignInPage />}></Route>
          <Route path="/user/sign-up" element={<SignUpPage />}></Route>
          <Route path="/products" element={<ProductsPage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/user/payment" element={<PaymentPage />}></Route>
          <Route path="/add-product" element={<AddProductsPage />}></Route>
          <Route path="/user/order-details" element={<OrderDetails />}></Route>
          <Route path="/product" element={<SelectedProduct />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
