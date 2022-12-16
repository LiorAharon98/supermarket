import LanguageSelect from "../language_select/LanguageSelect";
import { useDataProvider } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";
import style from "./header.module.css";
const Header = () => {
  const navigate = useNavigate();
  const { changeLanguage, user, logOut } = useDataProvider();
  const clickHandler = () => {
    if (Object.keys(user).length > 0) {
      logOut();
    }
    navigate("/");
  };
  return (
    <div className={style.menu_container}>
      <li className={style.header_container}>
        <LanguageSelect />
      </li>
      <li className={style.header_container}>
        <p onClick={clickHandler}>{changeLanguage(Object.keys(user).length > 0 ? "logout" : "homepage")}</p>
      </li>
    </div>
  );
};

export default Header;
