import React from "react";
import Button from "../../components/button/Button";
import HeaderTag from "../../components/header_tag/HeaderTag";
import style from "./home-page.module.css";
const HomePage = () => {
  const links = [
    { label: "sign up", to: "/user/sign-up" },
    { label: "sign in", to: "/user/sign-in" },
    { label: "products", to: "products" },
  ];

  return (
    <>
      <HeaderTag classname={'homepage'} text={"welcome"} />
      <div className={style.div_container}>
        {links.map((link, index) => {
          return <Button key={index} to={link.to} text={link.label} />;
        })}
      </div>
    </>
  );
};

export default HomePage;
