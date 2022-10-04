import React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDataProvider } from "../../context/DataProvider";
import style from "./admin_products_manager.module.css";
import UpdatePrice from "../update_price/UpdatePrice";
const AdminProductsManager = ({ name, price, picture }) => {
  const {deleteProduct} = useDataProvider()
  const [updatePriceToggle,setUpdatePriceToggle] = useState(false)
  const {t} = useTranslation()
  return (
    <>
      <thead className={style.thead_container}>
        <tr className={style.tr_container}>
          <td>
            <img className={style.img} src={`http://localhost:5000/public/images/${picture}`} alt="" />
          </td>
          <td>{t(name.replace(/\s/g, ""))}</td>
          <td className={style.price}>{price}</td>
          <td className={style.button_container}>
            <button className={style.button} onClick={()=>{
              deleteProduct(name)}} >{t('delete')}</button>
               {!updatePriceToggle ? 
            <button onClick={()=>{setUpdatePriceToggle(true)}} className={style.button}> {t('update')} </button>
            : <UpdatePrice name = {name} setUpdateToggle = {setUpdatePriceToggle}/>
               }
          </td>
        </tr>
      </thead>
    </>
  );
};

export default AdminProductsManager;
