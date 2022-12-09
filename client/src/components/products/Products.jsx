import React, { useState } from "react";
import { useDataProvider } from "../../context/DataProvider";
import style from "./products.module.css";
import { FaShoppingCart } from "react-icons/fa";
const Products = ({ name, price, pictureUrl, addToCart, cart }) => {
  const { changeLanguage, user } = useDataProvider();
  if (!name) return;
  return (
    <div className={style.products}>
      <img className={style.product_img} src={pictureUrl} alt="error" />
      <p className={style.product_tag}>{changeLanguage(name)}</p>
      <p className={style.product_tag}>{price}₪</p>

      <button
        className={cart.find((item) => item.productName === name) ? style.added_btn : style.add_btn}
        onClick={() => {
          if (Object.keys(user).length ===0) return alert("only users can purchase ");
          addToCart(name, price);
        }}
      >
        {cart.find((item) => item.productName === name) ? changeLanguage("added") : <FaShoppingCart size={"20px"} />}
      </button>
    </div>
  );
};

export default Products;
