import React from "react";
import { useLocation } from "react-router-dom";
import Button from "../../components/button/Button";
import HeaderTag from "../../components/header_tag/HeaderTag";
import { useDataProvider } from "../../context/DataProvider";
import Card from "../../components/card/Card";
import style from "./payment-page.module.css";
const PaymentPage = () => {
  let total = 0;
  const countTotal = (price) => {
    total += price;
  };
  const { userPaymentFunc, changeLanguage } = useDataProvider();
  const { state } = useLocation();
  const { user, cart } = state;

  return (
    <Card>
      <div className={style.payment_container}>
        <HeaderTag text={"pay"} />
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
            userPaymentFunc(user.username, total);
          }}
        />
      </div>
    </Card>
  );
};

export default PaymentPage;
