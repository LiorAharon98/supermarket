import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDataProvider } from "../../context/DataProvider";
import style from "./products.module.css";
const Products = ({ name, price, picture }) => {
  const { t } = useTranslation();
  const [countItems, setCountItems] = useState(0);
  const { addToCart } = useDataProvider();
  const countItemsFunc = () => {
    setCountItems((prev) => {
      return prev + 1;
    });
  };

  return (
    <div className={style.products}>
      <div>
        <img className={style.product_img} src={`http://localhost:5000/public/images/${picture}`} alt="error" />
        <p>{t(name.replace(/\s/g, ""))}</p>
        <p>{price}₪</p>

        <button
          className={countItems > 0 ? style.added_btn : style.add_btn}
          onClick={() => {
            countItemsFunc();
            addToCart(name, price);
          }}
        >
          {countItems > 0 ? t("added") : t("add")}!
        </button>
      </div>
    </div>
  );
};

export default Products;
