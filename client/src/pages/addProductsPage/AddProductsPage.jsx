import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useDataProvider } from "../../context/DataProvider";
import style from "./add-product-page.module.css";
const AddProductsPage = () => {
  const navigate = useNavigate();
  const nameInp = useRef();
  const priceInp = useRef();
  const categoryInp = useRef();
  const imgInp = useRef();
  const { addProducts, changeLanguage } = useDataProvider();

  const inp = [
    { type: "text", placeholder: "name", ref: nameInp },
    { type: "number", placeholder: "price", ref: priceInp },
    { type: "text", placeholder: "category", ref: categoryInp },
  ];

  const checkInp = (name, price) => {
    let incorrectDetails = false;
    if (name.length < 3) incorrectDetails = true;
    if (price < 2) incorrectDetails = true;
    return incorrectDetails;
  };

  const handleClick = (e) => {
    e.preventDefault();

    const name = nameInp.current.value;
    const price = priceInp.current.value;
    const category = categoryInp.current.value;

    const picture = imgInp.current.files[0];
    const product = [name, price, category];

    if (checkInp(name, price)) return alert("incorrect details");
    addProducts(product, picture);
    navigate("/admin");
  };
  return (
    <div>
      <h1 id={style.add_product_tag}>{changeLanguage("add product")}!</h1>
      <div className={style.container}>
        <div className={style.add_product_container}>
          {inp.map((input, index) => {
            return (
              <input
                key={index}
                className={style.inp}
                type={input.type}
                placeholder={input.placeholder}
                ref={input.ref}
              ></input>
            );
          })}
          <input ref={imgInp} type="file" id="inputFile" style={{ display: "none" }} />
          <label className={style.inpFile} htmlFor="inputFile">
            {changeLanguage("upload")}
          </label>
          <div>
            <Button to={"/"} text={"add"} onClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductsPage;