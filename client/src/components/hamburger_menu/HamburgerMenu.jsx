import React from "react";
import styles from "./hamburger_menu.module.css";
const HamburgerMenu = ({ onclick}) => {
  const arr = new Array(3).fill();
  return (
    <div>
      <div id={styles.category_hamburger} onClick={onclick}>
        {arr.map((value, index) => {
          return <div key={index} className={styles.hamburger}></div>;
        })}
      </div>
    </div>
  );
};

export default HamburgerMenu;
