import React from "react";
import { useState } from "react";
import { useDataProvider } from "../../context/DataProvider";
import Button from "../button/Button";
import style from "./admin_products_manager.module.css";
import UpdatePrice from "../update_price/UpdatePrice";
import Modal from "../modal/Modal";
const AdminProductsManager = ({ name, price, pictureUrl,setCurrentProductName }) => {
  const { deleteProduct, changeLanguage, changeModal, toggleModal, closeModal } = useDataProvider();
  const [updatePriceToggle, setUpdatePriceToggle] = useState(false);

  const updateFunc = (e) => {
    e.preventDefault();
    setUpdatePriceToggle(true);
  };

  const clickHandler = (e)=>{
    e.preventDefault()
    changeModal()
    setCurrentProductName(name)
  }
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
            {!updatePriceToggle ? (
              <Button style={{ width: "100px" }} to={"/"} text={"update"} onClick={updateFunc} />
            ) : (
              <UpdatePrice name={name} setUpdateToggle={setUpdatePriceToggle} />
            )}
            <Button style={{ width: "100px" }} to={"/"} text={"delete"} onClick={clickHandler} />
          </td>
        </tr>
      </thead>
   
        
    </>
  );
};

export default AdminProductsManager;
