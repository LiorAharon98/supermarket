import { useDataProvider } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";
import styles from "./products_page_style.module.css";
import Products from "../../components/products/Products";
import ProductCategory from "../../components/product_category/ProductCategory";
import { useState } from "react";
import HeaderTag from "../../components/header_tag/HeaderTag";
import Card from "../../components/card/Card";
import { FiShoppingCart } from "react-icons/fi";
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

  const addToCart = (productName, price, pictureUrl) => {
    setCart((prev) => {
      return [...prev, { productName, price, pictureUrl, index: cart.length }];
    });
  };
  const removeFromCart = (name) => {
    const cart2 = [...cart];
    const index = cart2
      .map((item) => {
        return item.productName;
      })
      .indexOf(name);
    if (index !== -1) {
      cart2.splice(index, 1);
    }
    setCart(cart2);
  };
  const productsFilter = (filter) => {
    return filter === "all"
      ? products.map((product) => product)
      : products.filter((product) => product.category === toggleProducts).map((product) => product);
  };
  return (
    <>
      <HeaderTag text={` ${changeLanguage("hello")} ${Object.keys(user).length > 0 ? user.username : ""}`} />

      <ProductCategory setSort={setSort} categoryFilter={categoryFilter} />
      <Card name={'productsPage'}>
        {productsFilter(toggleProducts).map((product, index) => {
          return (
            <Products 
           
              key={index}
              {...product}
              addToCart={addToCart}
              cart={cart}
              removeFromCart={removeFromCart}
            />
          );
        })}

        <Products />
      </Card>
      {cart.length > 0 && (
        <div
          onClick={() => {
            navigate("/user/order-details", { state: { cart} });
          }}
          className={styles.shopping_cart_container}
        >
          <FiShoppingCart className={styles.shopping_cart} />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
