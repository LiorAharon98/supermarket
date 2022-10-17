import React from "react";
import { useState } from "react";
import { useDataProvider } from "../../context/DataProvider";
import Button from "../button/Button";
import style from "./admin_products_manager.module.css";
import UpdatePrice from "../update_price/UpdatePrice";
const AdminProductsManager = ({ name, price, pictureUrl }) => {
  const { deleteProduct, changeLanguage } = useDataProvider();
  const [updatePriceToggle, setUpdatePriceToggle] = useState(false);
  const deleteFunc = (e) => {
    e.preventDefault();
    deleteProduct(name);
  };
  const updateFunc = (e) => {
    e.preventDefault();
    setUpdatePriceToggle(true);
  };
  return (
    <>
      <thead className={style.thead_container}>
        <tr className={style.tr_container}>
          <td className={style.td}>
            <img className={style.img} src={pictureUrl} alt="" />
          </td>
          <td className={style.td}>{changeLanguage(name)}</td>
          <td className={style.td}>
            {" "}
            <p className={style.p}>{price}</p>{" "}
          </td>
          <td className={style.button_container}>
            <Button style={{ width: "100px" }} to={"/"} text={"delete"} onClick={deleteFunc} />

            {!updatePriceToggle ? (
              <Button style={{ width: "100px" }} to={"/"} text={"update"} onClick={updateFunc} />
            ) : (
              <UpdatePrice name={name} setUpdateToggle={setUpdatePriceToggle} />
            )}
          </td>
        </tr>
      </thead>
    </>
  );
};

export default AdminProductsManager;
