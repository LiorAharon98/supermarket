import React from "react";
import styles from "./button.module.css";
import { Link } from "react-router-dom";
import { useDataProvider } from "../../context/DataProvider";
const Button = ({ text, onClick, to }) => {
  const { changeLanguage } = useDataProvider();
  return (
    <div className={styles.button_container}>
      <Link id={styles.button} to={to} onClick={onClick}>
        {changeLanguage(text)}
      </Link>
    </div>
  );
};

export default Button;
