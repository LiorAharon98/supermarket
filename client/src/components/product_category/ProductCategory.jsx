import React from "react";
import { useDataProvider } from "../../context/DataProvider";
import style from "./product_category.module.css";
const ProductCategory = ({ categoryFilter, displayCategoryFunc, displayCategory }) => {
  const { products, changeLanguage } = useDataProvider();
  const li = products.filter(
    (product, index, self) => index === self.findIndex((t) => t.category === product.category)
  );
  return (
    <div className={displayCategory ? style.container_active : style.container_inactive}>
      {displayCategory && (
        <div className={style.container2}>
          <ul className={style.category_container}>
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
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
