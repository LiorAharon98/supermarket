import LanguageSelect from "../language_select/LanguageSelect";
import { useDataProvider } from "../../context/DataProvider";
import Button from "../button/Button";
import style from "./header.module.css";
const Header = () => {
  const { changeLanguage, user, logOut } = useDataProvider();

  return (
    <div className={style.menu_container}>
      <li className={style.header_container}>
        <LanguageSelect />
      </li>
      <li className={style.header_container}>
        <Button
          to={"/"}
          text={changeLanguage(Object.keys(user).length > 0 ? "logout" : "homepage")}
          onClick={user && logOut}
        />
      </li>
    </div>
  );
};

export default Header;
