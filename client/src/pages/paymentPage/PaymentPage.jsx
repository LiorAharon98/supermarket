import React, { useState } from "react";
import Card from "../../components/card/Card";
import styles from "./payment_page.module.css";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import Modal from "../../components/modal/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import { useDataProvider } from "../../context/DataProvider";
const PaymentPage = () => {
  const [toggleModal, setToggleModal] = useState(false);
  const [togglePurchase, setTogglePurchase] = useState(false);
  const months = new Array(12).fill(1);
  const years = [2024, 2025, 2026, 2027, 2028, 2029, 2030];
  const navigate = useNavigate();
  const { changeLanguage, userPaymentFunc, user } = useDataProvider();
  const { state } = useLocation();
  const { total, cart } = state;
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    cardHolder: "",
    cardNumber: "",
    "expiration date": "",
    cvv: "",
  });

  const clickHandler = (e) => {
    e.preventDefault();
    setToggleModal(true);
  };
  const inputData = async (data) => {
    userPaymentFunc(user.username, total, user.email, cart);
    setTogglePurchase(true);
    setTimeout(() => {
      navigate("/");
    }, 4000);
  };
  const closeModal = (e) => {
    e.preventDefault();
    setToggleModal(false);
  };

  return (
    <>
      {togglePurchase && (
        <div className={styles.purchase_page}>
          <div className={styles.purchase_container}>
            <h1>thank you an invoice sent to your mail</h1>
            <h2>you will navigate to home page</h2>
          </div>
        </div>
      )}
      <Card>
        <Modal text={"pay"} closeModal={closeModal} toggleModal={toggleModal} onClick={handleSubmit(inputData)} />

        <div className={styles.container}>
          <h1 className={styles.payment_tag}>{changeLanguage("payment")}</h1>
          <Input
            control={control}
            name={"card holder"}
            rules={{ required: "fill please", minLength: { value: 3, message: "should be at least 3 char" } }}
          />
          <Input
            control={control}
            name={"card number"}
            rules={{ required: "fill please", minLength: { value: 16, message: "should be at least 16 char" } }}
          />
          <div className={styles.select_container}>
            {changeLanguage("month")}
            <select className={styles.select}>
              {months.map((month, index) => {
                return (
                  <option className={styles.option} key={index}>
                    {index + 1}
                  </option>
                );
              })}
            </select>
            {changeLanguage("year")}
            <select className={styles.select}>
              {years.map((year) => (
                <option className={styles.option} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <Input
            control={control}
            name={"cvv"}
            rules={{ required: "fill please", minLength: { value: 3, message: "should be at least 3 char" } }}
          />
          <Button to={"/"} text={"pay"} onClick={clickHandler} />
        </div>
      </Card>
    </>
  );
};

export default PaymentPage;
