import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { useDataProvider } from "../../context/DataProvider";
import style from "./add-product-page.module.css";
const AddProductsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const nameInp = useRef();
  const priceInp = useRef();
  const categoryInp = useRef();
  const imgInp = useRef();
  const { addProducts } = useDataProvider();

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
    const formData = new FormData();

    const name = nameInp.current.value;
    const price = priceInp.current.value;
    const category = categoryInp.current.value;

    const picture = imgInp.current.files[0];
    formData.append("product", name);
    formData.append("product", price);
    formData.append("product", category);
    formData.append("product", picture);

    if (checkInp(name, price)) return alert("incorrect details");
    addProducts(formData);
    navigate("/admin");
  };
  return (
    <div>
      <form onSubmit={handleClick}>
        <h1 id={style.add_product_tag}>{t("addproduct")}!</h1>
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
            <input type="file" id="inputFile" style={{display: 'none'}}  />
            <label className={style.inpFile}  htmlFor="inputFile">{t('upload'.replace(/\s/g, ""))}</label>
            <div>
              <button id={style.add_btn}>{t("add")}</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductsPage;
