import React from "react";
import style from "./user_page.module.css";
import ShoppingHistory from "../../components/shopping_history/ShoppingHistory";
const UsersPage = ({ username, email, shoppingHistory }) => {
  return (
    <>
        <tr>
          <td>{username}</td>
          <td>{email}</td>
        </tr>
     
    </>
  );
};

export default UsersPage;
