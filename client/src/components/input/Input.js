import React from "react";

import { Controller } from "react-hook-form";
import { useDataProvider } from "../../context/DataProvider";
import styles from "./input.module.css";
const Input = ({ name, control, rules }) => {
  const { changeLanguage } = useDataProvider();
  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState: { error } }) => {
        return (
          <>
            <input
              type={name === "password" ? "password" : "text"}
              className={error ? styles.inp_sign_up_error : styles.inp_sign_up}
              name={name}
              {...field}
              placeholder={changeLanguage(name)}
            ></input>
            {error && <p className={styles.error}>{error.message}</p>}
          </>
        );
      }}
    />
  );
};

{
}
export default Input;
