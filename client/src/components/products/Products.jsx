import React, { useState } from "react";
import { useDataProvider } from "../../context/DataProvider";
import style from "./products.module.css";
 import {FaShoppingCart} from "react-icons/fa"
const Products = ({ name, price, pictureUrl, addToCart }) => {
  const { changeLanguage,user } = useDataProvider();
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
            if (!user) return alert("only users can purchase ")
            countItemsFunc(name);
            addToCart(name, price);
          }}
        >
          {countItems.find((item) => item.name) ? changeLanguage("added") : <FaShoppingCart size={'20px'} /> }!
        </button>
      </div>
    </div>
  );
};

export default Products;
