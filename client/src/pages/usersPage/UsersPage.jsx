import React from "react";
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
