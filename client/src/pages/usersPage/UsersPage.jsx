import React from "react";
const UsersPage = ({ username, email, shoppingHistory }) => {
  return (
    <>
        <tr>
          <td>{username}</td>
          <td>{email}</td>

          {/* {shoppingHistory.map( (item,index)=> item)} */}

        </tr>
     
    </>
  );
};

export default UsersPage;
