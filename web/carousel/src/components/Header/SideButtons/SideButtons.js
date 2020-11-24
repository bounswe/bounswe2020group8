import React from "react";
import classes from "./SideButtons.module.css";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import LogoutButton from "../../LogoutButton";

const sideButtons = (props) => {
  return (
    <div className={classes.SideButtons}>
      <LogoutButton></LogoutButton>
      <ButtonSecondary onClick={props.clicked}>
        {props.authenticated ? "PROFILE" : "LOGIN"}
      </ButtonSecondary>
      <ButtonPrimary>LIST</ButtonPrimary>
      <ButtonPrimary>CART</ButtonPrimary>
    </div>
  );
};

export default sideButtons;
