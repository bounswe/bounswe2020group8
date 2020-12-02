import React, { useContext } from "react";
import classes from "../Login.module.css";

import SignupForm from "../SignupContainer/SignupForm/SignupForm";
import GoogleAuth from "../../GoogleAuth";

import UserInfo from "../../Context/UserInfo";

const SignupContainer = (props) => {
  const user = useContext(UserInfo);

  return (
    <div className={classes.SignupContainer}>
      <SignupForm
        forgot={props.forgot}
        clicked={props.clicked}
        error={props.error}
      />
      <GoogleAuth isSignup={true} style={{ fontSize: "20px" }} />
    </div>
  );
};

export default SignupContainer;
