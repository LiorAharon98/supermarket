import React from "react";
import { useState } from "react";
import Button from "../../components/button/Button";
import HeaderTag from "../../components/header_tag/HeaderTag";
import HomepageButtons from "../../components/homepage_buttons/HomepageButtons";
import style from "./home-page.module.css";
const HomePage = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setToggle(true);
    
  };
  return (
    <>
      <HeaderTag  text={"welcome to my supermarket"} />
      <div className={style.div_container}>
        {!toggle && <Button onClick={handleClick} to={"/"} text={"start"} />}
        <HomepageButtons toggle={toggle} />
      </div>
    </>
  );
};

export default HomePage;
