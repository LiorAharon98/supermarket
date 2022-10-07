import React from "react";
import { useRef } from "react";
import { useDataProvider } from "../../context/DataProvider";
import Button from "../button/Button";
import styles from "./update_price.module.css";
const UpdatePrice = ({ name, setUpdateToggle }) => {
  const { updateProductPrice } = useDataProvider();
  const updateInp = useRef();
  const handleClick = (e) => {
    e.preventDefault();
    const price = updateInp.current.value;
    if (!price) return alert("cannot be empty");
    if (price < 0) return alert("num error");
    updateProductPrice(price, name);
    setUpdateToggle(false);
  };
  return (
    <div className={styles.container}>
      <input type="number" id={styles.inp} ref={updateInp} placeholder="enter number"></input>
      <Button to={"/"} text={"update"} onClick={handleClick} />
    </div>
  );
};

export default UpdatePrice;
