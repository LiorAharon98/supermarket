import { useTranslation } from "react-i18next";
import { useDataProvider } from "../../context/DataProvider";

import style from "./sort_product_select.module.css";

const SortProductSelect = ({ displayCategoryFunc, setSort }) => {
  const { t } = useTranslation();
  const { sortProductsByPrice } = useDataProvider();

  return (
    <select
      className={style.container}
      onChange={(e) => {
        setSort((prev) => {
          return !prev;
        });
        sortProductsByPrice(e.target.value);
        displayCategoryFunc(false);
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
