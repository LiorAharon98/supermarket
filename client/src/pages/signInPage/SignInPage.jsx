import React, { useRef } from "react";
import { useState } from "react";
import HeaderTag from "../../components/header_tag/HeaderTag";
import { useNavigate } from "react-router-dom";
import { useDataProvider } from "../../context/DataProvider";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import ErrorTag from "../../components/error_tag/ErrorTag";
import Input from "../../components/input/Input";
import style from "./sign-in-page.module.css";
import Card from "../../components/card/Card";
const SignInPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    username: "",
    password: "",
  });
  const { specificUser, changeLanguage } = useDataProvider();
  const navigate = useNavigate();
  const [errorDetails, setErrorDetails] = useState(false);
  const handleClick = async (data) => {
    const { username, password } = data;
    if (username === "Admin" && password === "1111") return navigate("/admin");
    const user = await specificUser(username, password);
    if (!user) return setErrorDetails("user not exist");
    navigate("/products", { state: user });
  };
  return (
    <Card>
      <div>
        <HeaderTag text={"sign in"} />
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
          {errorDetails && <ErrorTag text={errorDetails} />}
          <Button to={"/"} onClick={handleSubmit(handleClick)} text={changeLanguage("Sign in")} />
        </div>
      </div>
    </Card>
  );
};

export default SignInPage;
