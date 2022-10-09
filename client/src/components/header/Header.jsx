import LanguageSelect from "../language_select/LanguageSelect";
import { useDataProvider } from "../../context/DataProvider";
import Button from "../button/Button";
import style from "./header.module.css";
const Header = () => {
  const { changeLanguage, specificUser } = useDataProvider();

  return (
    <div className={style.menu_container}>
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
