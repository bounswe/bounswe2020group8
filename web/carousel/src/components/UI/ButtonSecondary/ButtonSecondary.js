import React from "react";
import classes from "./ButtonSecondary.module.css";

const buttonSecondary = (props) => {
    return (
        <button className={classes.ButtonSecondary} {...props}>{props.children}</button>
    );
}

export default buttonSecondary;