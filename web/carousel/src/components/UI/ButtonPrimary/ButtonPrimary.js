import React from "react";
import classes from "./ButtonPrimary.module.css";

const ButtonPrimary = ({ icon, title, style={}, onClick}) => {
  return (
    <button className={classes.ButtonPrimary} style={style} onClick={onClick}>
      {icon || null}
      <div> {title}</div>
    </button>
  );
};

export default ButtonPrimary;
