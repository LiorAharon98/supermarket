import React from "react";
import { useDataProvider } from "../../context/DataProvider";
import Button from "../button/Button";
import styles from "./modal.module.css";
const Modal = ({ onClick, toggleModal, closeModal, text }) => {
  const clickHandler = (e) => {
    e.preventDefault();
    onClick();
  };
  const {changeLanguage} = useDataProvider()
  return (
    <div onClick={closeModal} className={toggleModal ? styles.container : styles.container_inactive}>
      {toggleModal && (
        <div className={styles.loading}>
          <div className={styles.test}>
            <p onClick={closeModal}>{changeLanguage('close')}</p>
            <p>{changeLanguage('you are going to')} {changeLanguage(text)} {changeLanguage('are you sure')}?</p>
            <Button to={"/"} onClick={clickHandler} text={text}></Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
