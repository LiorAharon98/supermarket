import React, { useState } from "react";
import { useDataProvider } from "../../context/DataProvider";

import { Link, useNavigate } from "react-router-dom";
import style from "./sign-up-page.module.css";
import { useForm } from "react-hook-form";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import ErrorTag from "../../components/error_tag/ErrorTag";
import HeaderTag from "../../components/header_tag/HeaderTag";
import { MdOutlineVisibility } from "react-icons/md";
import { AiOutlineEyeInvisible } from "react-icons/ai";
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
  const regex = "@gmail.com";

  const { addUser, changeLanguage, specificUser } = useDataProvider();
  const [showPassword, setShowPassword] = useState("password");

  const togglePassword = () => {
    showPassword === "password" ? setShowPassword("text") : setShowPassword("password");
  };
  const handleClick = async (data) => {
    const { username, email, password } = data;
  const response = await addUser(username, email, password);
 if(!response)return setToggleError("user already  exist")
  
  
    navigate("/user/sign-in");
  };
  return (
    <Card>
      <div>
        <div className={style.sign_up_container}>
          <HeaderTag text={"sign up"} />
          <Input
            name="username"
            control={control}
            rules={{ required: "fill please", minLength: { value: 3, message: "should be at least 3 char" } }}
          />
          <Input
            name="email"
            control={control}
            rules={{ required: "fill please", validate: (value) => value.includes(regex) || "email not vaild" }}
          />
          <div className={style.password_container}>
            <Input name="password" control={control} rules={{ required: "fill please" }} type={showPassword} />
            {showPassword === "password" ? (
              <MdOutlineVisibility className={style.password_icon} onClick={togglePassword} />
            ) : (
              <AiOutlineEyeInvisible className={style.password_icon} onClick={togglePassword} />
            )}
          </div>
          <Input
            type={showPassword}
            name="confirm password"
            control={control}
            rules={{ required: "fill please", validate: (value) => value === pwd || "password not match" }}
          />

          {toggleError && <ErrorTag text={toggleError} />}
          <Button to={"/"} onClick={handleSubmit(handleClick)} text={changeLanguage("Sign up")} />
          <p style={{ textAlign: "center" }}>
            {changeLanguage("has an account")}?{" "}
            <Link style={{ color: "white" }} to={"/user/sign-in"}>
              {changeLanguage("log in")}
            </Link>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default SignUpPage;
