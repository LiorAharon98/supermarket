import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import HeaderTag from "../../components/header_tag/HeaderTag";
import { useDataProvider } from "../../context/DataProvider";
import Card from "../../components/card/Card";
import style from "./order_details.module.css";
import Modal from "../../components/modal/Modal";
const OrderDetails = () => {
  const { changeLanguage, toggleModal, changeModal, closeModal, setToggleModal } = useDataProvider();
  let total = 0;

  const countTotal = (price) => {
    total += price;
  };
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cart } = state;
  const clickHandler2 = (e) => {
    e.preventDefault();
    changeModal();
  };
  const clickHandler = (e) => {
    setToggleModal(false);
    navigate("/user/payment", { state: { total } });
  };

  return (
    <Card>
      <div className={style.payment_container}>
        {cart.map((product, index) => {
          countTotal(product.price);
          return (
            <div className={style.payment_products} key={index}>
              <img className={style.img} src={product.pictureUrl} alt="error" />
              <p className={style.product}>{changeLanguage(product.productName)}</p>
              <p className={style.product}> {product.price}₪</p>
            </div>
          );
        })}
        <p id={style.total}> {total}₪</p>
        <Button to={"/"} text={changeLanguage("pay")} onClick={clickHandler2} />
      </div>
      <Modal text={"pay"} onClick={clickHandler} toggleModal={toggleModal} closeModal={closeModal} />
    </Card>
  );
};

export default OrderDetails;
