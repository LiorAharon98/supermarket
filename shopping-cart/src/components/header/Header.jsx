import LanguageSelect from "../language_select/LanguageSelect";
import { useState } from "react";
import SortProductSelect from "../../components/sort_product_select/SortProductSelect";
import { useDataProvider } from "../../context/DataProvider";
import Button from "../button/Button";
import style from "./header.module.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import HamburgerMenu from "../hamburger_menu/HamburgerMenu";
const Header = () => {
  const [displayOption, setDisplayOption] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const handleClick = () => {
    setDisplayOption(false)
    navigate("/");
  };
  const optionVisible = () => {
    setDisplayOption((prev) => {
      return !prev;
    });
  };
  return (
    <div className={style.container}>
      <HamburgerMenu onclick={optionVisible} />
      {displayOption && (
        <div className={style.menu_container}>
          <ul>
            <li>
              <LanguageSelect />
            </li>
            <li>
              <SortProductSelect />
            </li>
            <li>
              <Button onClick={handleClick} text={t("logout")} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
