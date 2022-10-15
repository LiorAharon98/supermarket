import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDataProvider } from "../../context/DataProvider";

import style from "./sort_product_select.module.css";

const SortProductSelect = ({displayCategoryFunc}) => {
  const { t } = useTranslation();
  const { sortProductsByPrice } = useDataProvider();
  const [selectDetails, setSelectDetails] = useState("");

useEffect(()=>{
  sortProductsByPrice(selectDetails)
  displayCategoryFunc()
},[selectDetails])
return (
  <select
  className={style.container}
  onChange={(e) => {
    
        setSelectDetails(e.target.value);
      }}
    >
      <option className={style.option_container} value="">
        {t("sort price")}
      </option>
      <option className={style.option_container} value="low">
        {t("low to high")}
      </option>
      <option className={style.option_container} value="high">
        {t("high to low")}
      </option>
    </select>
  );
};

export default SortProductSelect;
