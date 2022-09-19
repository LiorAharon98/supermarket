import React, { useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDataProvider } from "../../context/DataProvider";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import style from "./sign-in-page.module.css";
const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    username: "",
    password: "",
  });
  const { t } = useTranslation();
  const { specificUser } = useDataProvider();
  const navigate = useNavigate();
  const [errorDetails, setErrorDetails] = useState("");
  const handleClick = (data) => {
    const {username,password} = data
    if (username === "Admin" && password === "1111") return navigate("/admin");
    if (!specificUser(password, username)) return setErrorDetails("not found");
    specificUser(password, username);
    navigate("/products", { state: specificUser(password, username) });
  };
  return (
    <form className={style.form_container}>
      <div>
        <h1 id={style.tag}>{t("signin")}</h1>
        <div className={style.sign_in_container}>
          <Input
            control={control}
            name="username"
            rules={{ required: "fill please", minLength: { value: 3, message: "should be at least 3 char" } }}
          />
          <Input
            control={control}
            name="password"
            rules={{ required: "fill please", minLength: { value: 3, message: "should be at least 3 char" } }}
          />
          {errorDetails !== "" && <p id={style.errorDetails}>{t(errorDetails.replace(/\s/g, ""))}!</p>}
          <Button onClick={handleSubmit(handleClick)} text={t("signin")} />
        </div>
      </div>
    </form>
  );
};

export default SignInPage;
