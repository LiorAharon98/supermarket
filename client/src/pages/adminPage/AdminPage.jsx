import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./admin-page.module.css";
import { useDataProvider } from "../../context/DataProvider";
import AdminProductsManager from "../../components/admin_products_manager/AdminProductsManager";
import UsersPage from "../usersPage/UsersPage";
import HamburgerMenu from "../../components/hamburger_menu/HamburgerMenu";
import { useTranslation } from "react-i18next";
const AdminPage = () => {
  const { users, products } = useDataProvider();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [toggleAdminOptions, setToggleAdminOption] = useState(0);
  const [displayOption, setDisplayOption] = useState(false);

  const displayCategoryFunc = () => {
    setDisplayOption((prev) => {
      return !prev;
    });
  };

  const navigateFunc = (value) => {
    if (value === "addProduct") navigate("/add-product");
    else navigate("/");
  };
  const adminOption = (num) => {
    setDisplayOption(false);
    setToggleAdminOption(num);
  };

  const li = [
    { label: "products", onclick: adminOption.bind(this, 0) },
    { label: "users", onclick: adminOption.bind(this, 1) },
    { label: "add product", onclick: navigateFunc.bind(this, "addProduct") },
    { label: "logout", onclick: navigateFunc.bind(this, "logout") },
  ];
  return (
    <>
      <div className={style.admin_container}>
        <HamburgerMenu onclick={displayCategoryFunc} />
        <div>
          {displayOption && (
            <div className={style.menu_container}>
              <ul>
                {li.map((li, index) => {
                  return (
                    <li className={style.menu} key={index} onClick={li.onclick}>
                      {t(li.label.replace(/\s/g, ""))}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {toggleAdminOptions === 0 && (
          <div className={style.products_container}>
            <table className={style.table_products_container}>
              {products.map((product, index) => {
                return <AdminProductsManager key={index} {...product} />;
              })}
            </table>
          </div>
        )}
        {toggleAdminOptions === 1 && (
          <div className={style.users_container}>
            <table className={style.table_users_container}>
              <thead className={style.thead}>
                <tr>
                  <td>username</td>
                  <td>email</td>
                </tr>
                {users.map((user, index) => {
                  return <UsersPage key={index} {...user} />;
                })}
              </thead>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPage;
