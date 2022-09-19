import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import HomepageHeader from "../../components/homepage_header/HomepageHeader";
import style from "./home-page.module.css";
const HomePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className={style.page_container}>
      <h1 id={style.tag}>{t("welcome")}</h1>
      <h2>we invite you to our new website!</h2>
      <h3>a new project by Lior Aharon</h3>
      <p>we hope you enjoy!</p>
    </div>
  );
};

export default HomePage;
