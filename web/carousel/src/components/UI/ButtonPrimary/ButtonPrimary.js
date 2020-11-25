import React from "react";
import classes from "./ButtonPrimary.module.css";

const ButtonPrimary = ({ icon, title }) => {
  return (
    <button className={classes.ButtonPrimary}>
      {icon || null}
      <div> {title}</div>
    </button>
  );
};

export default ButtonPrimary;
