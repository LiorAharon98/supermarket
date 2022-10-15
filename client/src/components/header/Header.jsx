import React, { useState } from "react";
import LanguageSelect from "../language_select/LanguageSelect";
import { useDataProvider } from "../../context/DataProvider";
import Button from "../button/Button";
import style from "./header.module.css";
import { useEffect } from "react";
const Header = () => {
  const { changeLanguage,  } = useDataProvider();


  return (
    <div className={style.menu_container}>
      <li>
        <LanguageSelect />
      </li>
      <li><Button to={"/"} text={changeLanguage("logout")} /></li>
    </div>
  );
};

export default Header;
