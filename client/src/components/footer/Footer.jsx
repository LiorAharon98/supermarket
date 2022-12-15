import React from "react";
import { useDataProvider } from "../../context/DataProvider";
import styles from "./footer.module.css";
const Footer = () => {
  const { changeLanguage } = useDataProvider();
  return (
    <>
      <div className={styles.container}>
        <div style={{ color: "white" }} className={styles.footer_container}>
          <h2>Code Opacity</h2>
          <p className={styles.footer_tag}>for support please contact the developer lior aharon </p>
          <p className={styles.footer_tag}>
            Lorem ipsum dolor sit amet consectetur reiciendis, voluptates ullam ipsum doloribus labore beatae mollitia
            ab, repellendus sint optio cupiditate?
          </p>
        </div>
      </div>
      <div className={styles.copyright}>copyright by lior aharon 2022</div>
    </>
  );
};

export default Footer;
