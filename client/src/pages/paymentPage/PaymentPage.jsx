import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useDataProvider } from "../../context/DataProvider";

import style from "./payment-page.module.css";
const PaymentPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  let total = 0;
  const countTotal = (price) => {
    total += price;
  };
  const { addProductToUser } = useDataProvider();
  const { state } = useLocation();
  const { user, cart } = state;

  return (
    <div className={style.container}>
      <div className={style.payment_container}>
        <h1 id={style.payment_tag}>{t("pay")}</h1>
        {cart.map((product, index) => {
          countTotal(product.price);
          return (
            <div className={style.payment_products} key={index}>
              <p className={style.product}>{t(product.productName.replace(/\s/g, ""))}</p>
              <p className={style.product}> {product.price}₪</p>
            </div>
          );
        })}
        <p id={style.total}> {total}₪</p>
        <Button
          text={t("pay")}
          onClick={() => {
            addProductToUser(user.username, total);
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
