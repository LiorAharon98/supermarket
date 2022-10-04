import React, { useRef, useState } from "react";
import { useDataProvider } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";
import style from "./sign-up-page.module.css";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
const SignUpPage = () => {
  const [toggleError, setToggleError] = useState("");
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const pwd = watch("password");
  const { addUser, isUserExist } = useDataProvider();

  const { t } = useTranslation();

  const handleClick = (data) => {
    console.log(data);
    if (isUserExist(data.username)) return setToggleError("error");
    addUser(data.username, data.email, data.password);
    navigate("/user/sign-in");
  };
  return (
    <form className={style.form_container}>
      <div>
        <h1 id={style.sign_up_tag}>{t("signup")}</h1>
        <div className={style.sign_up_container}>
          <Input
            name="username"
            control={control}
            rules={{ required: "fill please", minLength: { value: 3, message: "should be at least 3 char" } }}
          />
          <Input name="email" control={control} rules={{ required: "fill please" }} />
          <Input name="password" control={control} rules={{ required: "fill please" }} />
          <Input
            name="confirm password"
            control={control}
            rules={{ required: "fill please", validate: (value) => value === pwd || "password not match" }}
          />

          {toggleError && <h2>user already exist</h2>}
          <Button onClick={handleSubmit(handleClick)} text={t("signup")} />
        </div>
      </div>
    </form>
  );
};

export default SignUpPage;
