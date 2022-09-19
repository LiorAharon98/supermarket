import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import style from "./homepage_header.module.css";
const HomepageHeader = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const li = [
    { label: "sign up", to: "/user/sign-up" },
    { label: "sign in ", to: "/user/sign-in" },
    { label: "products", to: "products" },
  ];
  return (
    <div className={style.div_container}>
      {li.map((li) => {
        return <li onClick={navigate.bind(this, li.to)}>{li.label}</li>;
      })}
    </div>
  );
};

export default HomepageHeader;
