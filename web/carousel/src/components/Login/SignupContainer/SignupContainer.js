import React, { useContext } from "react";
import classes from "../Login.module.css";
import SignupForm from "../SignupContainer/SignupForm/SignupForm";

const SignupContainer = (props) => {
  return (
    <div className={classes.SignupContainer}>
      <SignupForm
        forgot={props.forgot}
        clicked={props.clicked}
        error={props.error}
      />
    </div>
  );
};

export default SignupContainer;
