import React from "react";
import { useDataProvider } from "../../context/DataProvider";
import styles from "./footer.module.css";
const Footer = () => {
  const { changeLanguage } = useDataProvider();
  return (
    <div className={styles.container}>
      <div id={styles.about}>
        <h1>{changeLanguage('about')}</h1>
      </div>
      <div id={styles.support}>
        <h1>{changeLanguage('support')}</h1>
      </div>
      <div id={styles.other}>
        <h1>{changeLanguage('other')}</h1>
      </div>
    </div>
  );
};

export default Footer;
