import LanguageSelect from "../language_select/LanguageSelect";
import SortProductSelect from "../../components/sort_product_select/SortProductSelect";
import { useDataProvider } from "../../context/DataProvider";
import Button from "../button/Button";
import style from "./header.module.css";
const Header = () => {
  const { changeLanguage } = useDataProvider();

  return (
    <div className={style.menu_container}>
      <li>
        <SortProductSelect />
      </li>
      <li>
        <LanguageSelect />
      </li>
      <li>
        <Button to={"/"} text={changeLanguage("logout")} />
      </li>
    </div>
  );
};

export default Header;
