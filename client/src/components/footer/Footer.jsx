import React from "react";
import { useDataProvider } from "../../context/DataProvider";
import styles from "./footer.module.css";
const Footer = () => {
  const { changeLanguage } = useDataProvider();
  return (
    <div className={styles.container}>
      <div id={styles.footer_container}>
        <h1>{changeLanguage("about")}</h1>
        <h4>we happy to announce that we have a new website for shopping!</h4>
      </div>
      <div id={styles.footer_container}>
        <h1>{changeLanguage("support")}</h1>
        <h4>this website is still under maintenance but if have any bug please contact with our developer</h4>
        <h4>Lior aharon</h4>
      </div>
      <div id={styles.footer_container}>
        <h1>{changeLanguage("other")}</h1>
        <h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, molestiae reiciendis provident veniam maxime odio optio ad magnam. Soluta officiis necessitatibus corrupti magnam exercitationem explicabo, assumenda impedit quam labore eaque.
        </h4>
      </div>
    </div>
  );
};

export default Footer;
