import { useDataProvider } from "../../context/DataProvider";

import { useLocation, useNavigate } from "react-router-dom";
import styles from "./products_page_style.module.css";
import Products from "../../components/products/Products";
import ProductCategory from "../../components/product_category/ProductCategory";
import HamburgerMenu from "../../components/hamburger_menu/HamburgerMenu";
import { useState } from "react";
import Button from "../../components/button/Button";
import { useTranslation } from "react-i18next";
const ProductsPage = () => {
  const { t } = useTranslation();
  const { products, addToCart, cart } = useDataProvider();

  const navigate = useNavigate();
  const { state } = useLocation();
  const [toggleProducts, setToggleProducts] = useState("all");
  const [displayCategory, setDisplayCategory] = useState(false);
  const categoryFilter = (category) => {
    if (category === "all") return setToggleProducts("all");
    setToggleProducts(category);
  };

  const displayCategoryFunc = () => {
    setDisplayCategory((prev) => {
      return !prev;
    });
  };

  return (
    <>
      <HamburgerMenu onclick={displayCategoryFunc} />

      <h1 id={styles.user_name_products}>
        {t("hello")} {state?.username}
      </h1>
      {displayCategory && <ProductCategory categoryFilter={categoryFilter} displayCategoryFunc={displayCategoryFunc} />}
      <div className={styles.products_container}>
        {toggleProducts === "all"
          ? products.map((product, index) => {
              return <Products key={index} {...product} addToCart={addToCart} />;
            })
          : products
              .filter((product) => {
                return product.category === toggleProducts;
              })
              .map((product, index) => {
                return <Products key={index} {...product} addToCart={addToCart} />;
              })}
      </div>
      <div className={styles.payment_btn_container}>
        {cart.length > 0 && (
          <Button
            text={t("payment")}
            onClick={() => {
              navigate("/user/payment", { state: { cart, user: state } });
            }}
          />
        )}
      </div>
    </>
  );
};

export default ProductsPage;
