import React from "react";
import classes from "../Login.module.css";

import LoginForm from "./LoginForm/LoginForm";
import GoogleAuth from "../../GoogleAuth";

const loginContainer = (props) => {

    return (
        <div className={classes.LoginContainer} >
            <LoginForm forgot={props.forgot} clicked={props.clicked} error={props.error}/>
            {/*google auth*/}
            <GoogleAuth isSignup={false} style={{fontSize:"20px"}}/>
        </div>
    );
}

export default loginContainer;