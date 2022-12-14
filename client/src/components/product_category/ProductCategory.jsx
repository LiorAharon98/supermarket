import React, { useState } from "react";
import { useDataProvider } from "../../context/DataProvider";
import SortProductSelect from "../sort_product_select/SortProductSelect";
import HamburgerMenu from "../hamburger_menu/HamburgerMenu";
import { FiChevronLeft } from "react-icons/fi";
import style from "./product_category.module.css";
const ProductCategory = ({ categoryFilter, setSort }) => {
  const { products, changeLanguage } = useDataProvider();
  const [displayCategory, setDisplayCategory] = useState(false);
  const li = products.filter(
    (product, index, self) => index === self.findIndex((t) => t.category === product.category)
  );
  const displayCategoryFunc = (value) => {
    setDisplayCategory(value);
  };

  return (
    <>
      <div className={displayCategory ? style.container_active : style.container_inactive}>
        {!displayCategory && <HamburgerMenu onclick={displayCategoryFunc.bind(this, true)} />}
        {displayCategory && (
          <>
            <li onClick={displayCategoryFunc.bind(this, false)}>
              {" "}
              <FiChevronLeft size={"30px"} />{" "}
            </li>
            <SortProductSelect setSort={setSort} displayCategoryFunc={displayCategoryFunc} />
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
    </>
  );
};

export default ProductCategory;
