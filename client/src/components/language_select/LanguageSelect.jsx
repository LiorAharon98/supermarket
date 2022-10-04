import React from "react";
import style from "./language_select.module.css";
import { useTranslation } from "react-i18next";
const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const handleEvent = (e) => {
    i18n.changeLanguage(e);
  };

  return (
  
      <select  className={style.container}
        onChange={(e) => {
          handleEvent(e.target.value);
        }}
      >
        <option className={style.option_container} value="en" defaultChecked={true}>
          english
        </option>
        <option className={style.option_container}  value="he">hebrew</option>
      </select>
 
  );
};

export default LanguageSelect;
