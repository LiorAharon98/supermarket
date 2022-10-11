import React from "react";
import styles from "./homepage_sidebar.module.css";
import Button from "../button/Button";
const HomepageSidebar = ({ toggle }) => {
  const links = [
    { label: "sign up", to: "/user/sign-up" },
    { label: "sign in", to: "/user/sign-in" },
    { label: "products", to: "products" },
  ];
  return (
    <>
      <div className={toggle ? styles.container : styles.container_inactive}>
        {toggle &&
          links.map((link, index) => {
            return <Button key={index} to={link.to} text={link.label} />;
          })}
      </div>
    </>
  );
};

export default HomepageSidebar;
