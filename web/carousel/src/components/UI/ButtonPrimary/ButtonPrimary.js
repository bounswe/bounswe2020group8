import React from "react";
import classes from "./ButtonPrimary.module.css";

const ButtonPrimary = ({ icon, title, onClick, style = {} }) => {
  return (
    <button style={style} onClick={onClick} className={classes.ButtonPrimary}>
      {icon || null}
      <div> {title}</div>
    </button>
  );
};

export default ButtonPrimary;
