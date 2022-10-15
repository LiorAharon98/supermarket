import React, { useState } from "react";
import { useDataProvider } from "../../context/DataProvider";
import SortProductSelect from "../sort_product_select/SortProductSelect";
import HamburgerMenu from "../hamburger_menu/HamburgerMenu";
import { FiChevronLeft } from "react-icons/fi";
import style from "./product_category.module.css";
const ProductCategory = ({ categoryFilter, setSort, setIndex }) => {
  const { products, changeLanguage } = useDataProvider();
  const [displayCategory, setDisplayCategory] = useState(false);
  const li = products.filter(
    (product, index, self) => index === self.findIndex((t) => t.category === product.category)
  );
  const displayCategoryFunc = () => {
    setSort((prev) => {
      return !prev;
    });
    setDisplayCategory((prev) => {
      return !prev;
    });
  };

  return (
    <div className={displayCategory ? style.container_active : style.container_inactive}>
      {!displayCategory && <HamburgerMenu onclick={displayCategoryFunc} />}
      {displayCategory && (
        <>
          <li onClick={setDisplayCategory.bind(this, false)}>
            {" "}
            <FiChevronLeft size={"30px"} />{" "}
          </li>
          <SortProductSelect displayCategoryFunc={displayCategoryFunc} />
          <li
            className={style.li_category}
            onClick={() => {
              categoryFilter("all");
              displayCategoryFunc();
            }}
          >
            {changeLanguage("all")}
          </li>
          {li.map((liElement, index) => {
            return (
              <li
                key={index}
                className={style.li_category}
                onClick={() => {
                  categoryFilter(liElement.category);
                  displayCategoryFunc();
                }}
              >
                {changeLanguage(liElement.category)}
              </li>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ProductCategory;
