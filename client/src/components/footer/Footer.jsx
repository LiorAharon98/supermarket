import React from "react";
import { useDataProvider } from "../../context/DataProvider";
import styles from "./footer.module.css";
const Footer = () => {
  const { changeLanguage } = useDataProvider();
  return (
    <>
      <div className={styles.container}>
        <div style={{ color: "white" }} className={styles.footer_container}>
          <div className={styles.container_text}>
            <p>{changeLanguage("about")}</p>
            <p>{changeLanguage("support")}</p>
            <p>{changeLanguage("chat")}</p>
          </div>
          <div className={styles.container_text}>
            <p>{changeLanguage("products")}</p>
            <p>{changeLanguage("contact")}</p>
            <p>{changeLanguage("gift card")}</p>
          </div>
          <div className={styles.container_text}>
            <p>{changeLanguage("online shopping")}</p>
            <p>{changeLanguage("services")}</p>
            <p>{changeLanguage("customers")}</p>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>copyright by lior aharon 2022</div>
    </>
  );
};

export default Footer;
