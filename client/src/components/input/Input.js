import React from "react";

import { Controller } from "react-hook-form";
import { useDataProvider } from "../../context/DataProvider";
import styles from "./input.module.css";
const Input = ({ name, control, rules, type }) => {
  const { changeLanguage } = useDataProvider();
  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      defaultValue=""
      render={({ field, fieldState: { error } }) => {
        return (
          <div className={styles.container}>
            <label className={styles.label} htmlFor={name}>
              {changeLanguage(name)}
            </label>
            <input
              id={name}
              type={type}
              className={error ? styles.inp_sign_up_error : styles.inp_sign_up}
              name={name}
              {...field}
            ></input>
            {error && <p className={styles.error}>{error.message}</p>}
          </div>
        );
      }}
    />
  );
};

export default Input;
