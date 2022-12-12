import React from "react";
import styles from "./loading_screen.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <h1>Loading data </h1>
        <AiOutlineLoading3Quarters className={styles.icon} />
      </div>
    </div>
  );
};

export default LoadingScreen;
