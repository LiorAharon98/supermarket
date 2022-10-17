import React, { useState } from "react";
import { useDataProvider } from "../../context/DataProvider";

import { useNavigate } from "react-router-dom";
import style from "./sign-up-page.module.css";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import ErrorTag from "../../components/error_tag/ErrorTag";
import HeaderTag from "../../components/header_tag/HeaderTag";
import Card from "../../components/card/Card";
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
  const { addUser, changeLanguage, specificUser } = useDataProvider();

  const handleClick = async (data) => {
    const { username, email, password } = data;
    const user = await specificUser(username, password);

    if (user) return setToggleError("user already  exist");
    addUser(username, email, password);
    navigate("/user/sign-in");
  };
  return (
    <Card >
      <div>
        <HeaderTag text={"sign up"} />
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

          {toggleError && <ErrorTag text={toggleError} />}
          <Button to={"/"} onClick={handleSubmit(handleClick)} text={changeLanguage("Sign up")} />
        </div>
      </div>
    </Card>
  );
};

export default SignUpPage;
