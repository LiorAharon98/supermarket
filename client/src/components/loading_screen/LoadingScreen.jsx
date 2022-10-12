import React from "react";
import styles from "./loading_screen.module.css";
const LoadingScreen = () => {
  return (
    <div className={styles.container}>
      <div className={styles.text_container}>
        <h1>Loading data...</h1>
      </div>
    </div>
  );
};

export default LoadingScreen;
