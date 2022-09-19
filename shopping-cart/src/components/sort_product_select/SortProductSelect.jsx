import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDataProvider } from "../../context/DataProvider";

import style from "./sort_product_select.module.css";

const SortProductSelect = () => {
  const { t } = useTranslation();
  const { sortProductsByPrice } = useDataProvider();
  const [selectDetails, setSelectDetails] = useState("");

  useEffect(() => {
    sortProductsByPrice(selectDetails);
  }, [selectDetails]);
  return (
    <select
      className={style.container}
      onChange={(e) => {
        setSelectDetails(e.target.value);
      }}
    >
      <option className={style.option_container} value="">
        {t("sort_price")}
      </option>
      <option className={style.option_container} value="low">
        {t("low_to_high")}
      </option>
      <option className={style.option_container} value="high">
        {t("high_to_low")}
      </option>
    </select>
  );
};

export default SortProductSelect;
