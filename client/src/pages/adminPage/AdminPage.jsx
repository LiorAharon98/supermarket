import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import style from "./admin-page.module.css";
import { useDataProvider } from "../../context/DataProvider";
import AdminProductsManager from "../../components/admin_products_manager/AdminProductsManager";
import UsersPage from "../usersPage/UsersPage";
import Modal from "../../components/modal/Modal";
import HamburgerMenu from "../../components/hamburger_menu/HamburgerMenu";
import { useEffect } from "react";
import Card from "../../components/card/Card";
import AddProductsPage from "../addProductsPage/AddProductsPage";
const AdminPage = () => {
  const { products, changeLanguage, baseUrl, changeModal, toggleModal, closeModal, deleteProduct } = useDataProvider();
  const [users, setUsers] = useState();
  const [toggleAdminOptions, setToggleAdminOption] = useState(0);
  const [displayOption, setDisplayOption] = useState(false);
  const [currentProductName, setCurrentProductName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = () => {
      axios.get(`${baseUrl}/admin`).then((response) => setUsers(response.data));
    };
    fetchUsers();
  }, []);
  const displayCategoryFunc = () => {
    setDisplayOption((prev) => {
      return !prev;
    });
  };
  const navigateFunc = () => {
    return navigate("/");
  };
  const adminOption = (num) => {
    setDisplayOption(false);
    setToggleAdminOption(num);
  };
  const deleteFunc = () => {
    deleteProduct(currentProductName);
    closeModal();
  };

  const li = [
    { label: "products", onclick: adminOption.bind(this, 0) },
    { label: "users", onclick: adminOption.bind(this, 1) },
    { label: "add product", onclick: adminOption.bind(this, 2) },
    { label: "logout", onclick: navigateFunc.bind(this, "logout") },
  ];
  return (
    <>
      <Modal onClick={deleteFunc} toggleModal={toggleModal} closeModal={closeModal} text="delete" />
      <HamburgerMenu onclick={displayCategoryFunc} />
      <div className={displayOption ? style.menu_container : style.menu_inactive}>
        {displayOption &&
          li.map((li, index) => {
            return (
              <li className={style.li_menu} key={index} onClick={li.onclick}>
                {changeLanguage(li.label)}
              </li>
            );
          })}
      </div>

      {toggleAdminOptions === 0 && (
        <>
          <Card style={{ marginTop: "40px" }}>
            <table className={style.table_products_container}>
              {products.map((product, index) => {
                return <AdminProductsManager setCurrentProductName={setCurrentProductName} key={index} {...product} />;
              })}
            </table>
          </Card>
        </>
      )}
      {toggleAdminOptions === 1 && (
        <Card>
          <table className={style.table_users_container}>
            <thead className={style.thead}>
              <tr>
                <td>{changeLanguage("username")}</td>
                <td>{changeLanguage("email")}</td>
              </tr>
              {users.map((user, index) => {
                return <UsersPage key={index} {...user} />;
              })}
            </thead>
          </table>
        </Card>
      )}
      {toggleAdminOptions === 2 && <AddProductsPage func={adminOption} />}
    </>
  );
};

export default AdminPage;
