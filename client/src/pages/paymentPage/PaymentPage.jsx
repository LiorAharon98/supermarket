import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/button/Button";
import { useDataProvider } from "../../context/DataProvider";

import style from "./payment-page.module.css";
const PaymentPage = () => {
  let total = 0;
  const countTotal = (price) => {
    total += price;
  };
  const { addProductToUser, changeLanguage } = useDataProvider();
  const { state } = useLocation();
  const { user, cart } = state;

  return (
    <div className={style.container}>
      <div className={style.payment_container}>
        <h1 id={style.payment_tag}>{changeLanguage("pay")}</h1>
        {cart.map((product, index) => {
          countTotal(product.price);
          return (
            <div className={style.payment_products} key={index}>
              <p className={style.product}>{changeLanguage(product.productName)}</p>
              <p className={style.product}> {product.price}₪</p>
            </div>
          );
        })}
        <p id={style.total}> {total}₪</p>
        <Button
          to={"/"}
          text={changeLanguage("pay")}
          onClick={() => {
            addProductToUser(user.username, total);
          }}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
