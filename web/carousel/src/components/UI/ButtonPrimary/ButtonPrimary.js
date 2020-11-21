import React from "react";
import classes from "./ButtonPrimary.module.css";

const buttonPrimary = (props) => {
    return (
        <button className={classes.ButtonPrimary} {...props}>{props.children}</button>
    );
}

export default buttonPrimary;