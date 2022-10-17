import { useDataProvider } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";
import styles from "./products_page_style.module.css";
import Products from "../../components/products/Products";
import ProductCategory from "../../components/product_category/ProductCategory";
import { useState } from "react";
import Button from "../../components/button/Button";
import HeaderTag from "../../components/header_tag/HeaderTag";
import Card from "../../components/card/Card";
const ProductsPage = () => {
  const { products, changeLanguage, user } = useDataProvider();

  const navigate = useNavigate();
  const [sort, setSort] = useState(false);
  const [cart, setCart] = useState([]);
  const [toggleProducts, setToggleProducts] = useState("all");

  const categoryFilter = (category) => {
    if (category === "all") return setToggleProducts("all");
    setToggleProducts(category);
  };

  const addToCart = (productName, price) => {
    setCart((prev) => {
      return [...prev, { productName: productName, price: price }];
    });
  };

  const productsFilter = (filter) => {
    return filter === "all"
      ? products.map((product) => product)
      : products.filter((product) => product.category === toggleProducts).map((product) => product);
  };
  return (
    <>
      <HeaderTag text={`hello ${user ? user.username : ""}`} />
      <ProductCategory setSort={setSort} categoryFilter={categoryFilter} />
      <Card style={{ flexWrap: "wrap", alignItems: "flex-start" }}>
        {productsFilter(toggleProducts).map((product, index) => {
          return <Products key={index} {...product} addToCart={addToCart} />;
        })}

        <Products />
      </Card>
      <div>
        {cart.length > 0 && (
          <Button
            to={"/"}
            text={changeLanguage("payment")}
            onClick={(e) => {
              e.preventDefault();
              navigate("/user/payment", { state: { cart, user: user } });
            }}
          />
        )}
      </div>
    </>
  );
};

export default ProductsPage;
