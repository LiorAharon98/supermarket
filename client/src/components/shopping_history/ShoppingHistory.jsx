import React from "react";
import style from "./Shopping_history.module.css";
const ShoppingHistory = ({ product }) => {
  let total = 0;
  return (
    <div>
      {product.shoppingHistory.forEach((pro) => {
        total += pro.price;
      })}
      <h1 id={style.purchaseTag}> purchase history : {total}</h1>
    </div>
  );
};

export default ShoppingHistory;
