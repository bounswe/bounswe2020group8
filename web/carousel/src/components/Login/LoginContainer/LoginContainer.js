import React from "react";
import classes from "../Login.module.css";

import LoginForm from "./LoginForm/LoginForm";

const loginContainer = (props) => {

    return (
        <div className={classes.LoginContainer}>
            <LoginForm forgot={props.forgot} clicked={props.clicked} error={props.error}/>
            {/*google auth*/}
        </div>
    );
}

export default loginContainer;