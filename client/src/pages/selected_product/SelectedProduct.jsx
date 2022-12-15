import React from "react";
import styles from "./selected_product.module.css";
import Card from "../../components/card/Card";
import { useLocation } from "react-router-dom";
import { useDataProvider } from "../../context/DataProvider";
const SelectedProduct = () => {
  const { state } = useLocation();
  const { changeLanguage } = useDataProvider();
  const { name, pictureUrl, price, description } = state;
  return (
    <Card>
      <div className={styles.container}>
        <img className={styles.img} src={pictureUrl} alt='error' />
        <h1>{changeLanguage('name')} : {changeLanguage(name)}</h1>
        <h1>{changeLanguage('description')} :  {description}</h1>
        <h1> {changeLanguage('price')} :{price}</h1>
      </div>
    </Card>
  );
};

export default SelectedProduct;
