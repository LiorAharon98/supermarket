import React, { useState } from "react";
import { useDataProvider } from "../../context/DataProvider";
import style from "./products.module.css";
const Products = ({ name, price,pictureUrl }) => {
  const [countItems, setCountItems] = useState(0);
  const { addToCart, changeLanguage } = useDataProvider();
  const countItemsFunc = () => {
    setCountItems((prev) => {
      return prev + 1;
    });
  };

  return (
    <div className={style.products}>
      <div>
        <img className={style.product_img} src={pictureUrl} alt="error" />
        <p>{changeLanguage(name)}</p>
        <p>{price}₪</p>

        <button
          className={countItems > 0 ? style.added_btn : style.add_btn}
          onClick={() => {
            countItemsFunc();
            addToCart(name, price);
          }}
        >
          {countItems > 0 ? changeLanguage("added") : changeLanguage("add")}!
        </button>
      </div>
    </div>
  );
};

export default Products;
