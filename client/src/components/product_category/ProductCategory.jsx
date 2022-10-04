import React from "react";
import { useTranslation } from "react-i18next";
import { useDataProvider } from "../../context/DataProvider";
import style from "./product_category.module.css";
const ProductCategory = ({ categoryFilter,displayCategoryFunc }) => {
  const {t} = useTranslation()
  const { products } = useDataProvider();
  const li = products.filter(
    (product, index, self) => index === self.findIndex((t) => t.category === product.category)
  );
  return (
    <div className={style.container}>
      <div className={style.container2}>
        <ul className={style.category_container}>
          <li
            className={style.li_category}
            onClick={() => {
              categoryFilter("all");
              displayCategoryFunc()
            }}
          >
                {t('all')}
          </li>
          {li.map((liElement, index) => {
            return (
              <li key={index}
                className={style.li_category}
                onClick={() => {
                  categoryFilter(liElement.category);
                  displayCategoryFunc()
                }}
              >
                {t(liElement.category)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProductCategory;
