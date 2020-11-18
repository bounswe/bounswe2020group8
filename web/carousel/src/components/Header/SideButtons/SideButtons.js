import React from "react";
import classes from "./SideButtons.module.css";

const sideButtons = (props) => {

    return (
        <div className={classes.SideButtons} >
            <button className={classes.ButtonSecondary}
                onClick={props.clicked}>
                {props.authenticated ? "PROFILE" : "LOGIN"}
            </button>
            <button className={classes.ButtonPrimary}>LIST</button>
            <button className={classes.ButtonPrimary}>CART</button>
        </div>
    );
}

export default sideButtons;