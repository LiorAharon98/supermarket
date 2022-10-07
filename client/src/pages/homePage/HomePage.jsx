import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useDataProvider } from "../../context/DataProvider";
import style from "./home-page.module.css";
const HomePage = () => {
  const navigate = useNavigate();
  const {changeLanguage} = useDataProvider()
  const links = [
    { label: "Sign up", to: "/user/sign-up" },
    { label: "Sign in", to: "/user/sign-in" },
    { label: "Products", to: "products" },
  ];

  return (
    <>
        <h1 id={style.tag}>{changeLanguage("welcome")}</h1>
      <div className={style.div_container}>
          {links.map((link, index) => {
            return <Button key={index} to={link.to} text={link.label} />;
          })}
      </div>
          </>
  );
};

export default HomePage;
