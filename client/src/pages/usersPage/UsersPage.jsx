import React from "react";
import styles from "./user_page.module.css";
const UsersPage = ({ username, email, shoppingHistory }) => {
  return (
    <>
      <tr className={styles.container}>
        <td>{username}</td>
        <td>{email}</td>

        <td>
          {shoppingHistory.map((item, index) => (
            <td>{item}₪ ,</td>
          ))}
        </td>
      </tr>
    </>
  );
};

export default UsersPage;
