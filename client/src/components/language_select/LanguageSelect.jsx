import React from "react";
import style from "./language_select.module.css";
import { useTranslation } from "react-i18next";
import { useDataProvider } from "../../context/DataProvider";
const LanguageSelect = () => {
  const { i18n } = useTranslation();
  const { changeLanguage } = useDataProvider();
  const handleEvent = (e) => {
    i18n.changeLanguage(e);
  };

  return (
    <select
      className={style.container}
      onChange={(e) => {
        handleEvent(e.target.value);
      }}
    >
      <option className={style.option_container} value="en" defaultChecked={true}>
        {changeLanguage("english")}
      </option>
      <option className={style.option_container} value="he">
        {changeLanguage("hebrew")}
      </option>
    </select>
  );
};

export default LanguageSelect;
