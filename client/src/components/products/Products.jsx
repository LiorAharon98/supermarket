import React, { useState } from "react";
import { useEffect } from "react";
import { useDataProvider } from "../../context/DataProvider";
import style from "./products.module.css";
const Products = ({ name, price, pictureUrl, addToCart }) => {
  const { changeLanguage } = useDataProvider();
  const [countItems, setCountItems] = useState([]);
  const countItemsFunc = (name) => {
    setCountItems((prev) => [...prev, { name }]);
  };

  if (!name) return;
  return (
    <div className={style.products}>
      <div>
        <img className={style.product_img} src={pictureUrl} alt="error" />
        <p>{changeLanguage(name)}</p>
        <p>{price}₪</p>

        <button
          className={countItems.find((item) => item.name) ? style.added_btn : style.add_btn}
          onClick={() => {
            countItemsFunc(name);
            addToCart(name, price);
          }}
        >
          {countItems.find((item) => item.name) ? changeLanguage("added") : changeLanguage("add")}!
        </button>
      </div>
    </div>
  );
};

export default Products;
