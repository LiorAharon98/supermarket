import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import style from "./home-page.module.css";
const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const li = [
    { label: "Sign up", to: "/user/sign-up" },
    { label: "Sign in ", to: "/user/sign-in" },
    { label: "Products", to: "products" },
  ];

  return (
    <div className={style.page_container}>
      <div className={style.div_container}>
        <h1 id={style.tag}>{t("welcome")}</h1>
        <div className={style.buttons_container}>
          {li.map((li, index) => {
            return (
              <li className={style.li} key={index} onClick={navigate.bind(this, li.to)}>
                {t(li.label.replace(/\s/g, ""))}
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
