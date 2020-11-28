import React from "react";
import classes from "./ButtonSecondary.module.css";

const ButtonSecondary = ({ icon, title, style={}, onClick }) => {
  return (
    <button className={classes.ButtonSecondary} onClick={onClick}>
      {icon || null}
      <div>{title}</div>
    </button>
  );
};

export default ButtonSecondary;
