import React from "react";
import { useDataProvider } from "../../context/DataProvider";
import styles from "./error_tag.module.css"
const ErrorTag = ({ text }) => {
  const { changeLanguage } = useDataProvider();
  return <p id={styles.errorDetails}>{changeLanguage(text)}</p>;
};

export default ErrorTag;
