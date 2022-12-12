import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import { useDataProvider } from "../../context/DataProvider";
import HeaderTag from "../../components/header_tag/HeaderTag";
import style from "./add-product-page.module.css";
import Card from "../../components/card/Card";
import { BsCardImage } from "react-icons/bs";
const AddProductsPage = ({ func }) => {
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

  const checkInp = (name, price, img) => {
    let incorrectDetails = false;
    if (name.length < 3) incorrectDetails = true;
    if (price < 2) incorrectDetails = true;
    if (!img) incorrectDetails = true;
    return incorrectDetails;
  };

  const handleClick = (e) => {
    e.preventDefault();

    const name = nameInp.current.value;
    const price = priceInp.current.value;
    const category = categoryInp.current.value;

    const picture = imgInp.current.files[0];
    const product = { name, price: Number(price), category };

    if (checkInp(name, price, picture)) return alert("incorrect details");
    addProducts(product, picture);
    func(0);
  };
  return (
    <Card>
      <div>
        <div className={style.add_product_container}>
          <HeaderTag text={"add product"} />
          {inp.map((input, index) => {
            return (
              <div key={index} className={style.inp_label_container}>
                <label htmlFor={input.placeholder}>{changeLanguage(`product ${input.placeholder}`)}</label>
                <input
                  id={input.placeholder}
                  key={index}
                  className={style.inp}
                  type={input.type}
                  ref={input.ref}
                ></input>
              </div>
            );
          })}
          <input ref={imgInp} type="file" id="inputFile" style={{ display: "none" }} />
          <div className={style.label_container}>
            <label className={style.label_inp_file} htmlFor="inputFile">
              <BsCardImage className={style.image_icon} />
            </label>
          </div>
          <div>
            <Button to={"/"} text={"add product"} onClick={handleClick} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AddProductsPage;
