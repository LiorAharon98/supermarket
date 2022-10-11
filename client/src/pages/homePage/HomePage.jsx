import React from "react";
import { useState } from "react";
import Button from "../../components/button/Button";
import HeaderTag from "../../components/header_tag/HeaderTag";
import HomepageSidebar from "../../components/homepage_sidebar/HomepageSidebar";
import style from "./home-page.module.css";
const HomePage = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setToggle(true);
  };
  return (
    <>
      <HeaderTag  text={"welcome"} />
      <div className={style.div_container}>
        {!toggle && <Button onClick={handleClick} to={"/"} text={"start"} />}
        <HomepageSidebar toggle={toggle} />
      </div>
    </>
  );
};

export default HomePage;
