import React, { Component } from "react";
import classes from "./ResetPassword.module.css";
import { withRouter } from "react-router-dom";
import ButtonSecondary from "../UI/ButtonSecondary/ButtonSecondary";

import axios from "axios";
import qs from "qs";

let apiBaseUrl = "http://18.198.51.178:8080/";

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      sent: false,
      isError: false,
      errorMessage: "",
      password: "",
      passwordConfirm: "",
    };
  }

  passwordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  };
  passwordConfirmChangeHandler = (e) => {
    this.setState({ passwordConfirm: e.target.value });
  };

  passwordCheckHandler = () => {
    const pass1 = this.state.password;
    const pass2 = this.state.passwordConfirm;
    if (pass1 !== pass2) {
      this.setState({ buttonActive: false });
    } else if (pass1 === pass2) {
      this.setState({ buttonActive: true });
    }
  };

  render() {
    console.log(this.props);

    return (
      <div className={classes.ResetPassword}>
        {!this.state.sent ? (
          <div>
            <h1>Reset your password</h1>
            <form className={classes.Form}>
              <br />
              <input
                className={classes.Input}
                placeholder="new password"
                name="email"
                type="password"
                onChange={(event) => this.passwordChangeHandler(event)}
              />
              <br />
              <br />
              <input
                className={classes.Input}
                placeholder="confirm new password"
                name="email"
                type="password"
                onChange={(event) => this.passwordConfirmChangeHandler(event)}
              />
              <br />
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  padding: 10,
                }}
              >
                {this.state.passwordConfirm === this.state.password &&
                this.state.password !== "" &&
                this.state.passwordConfirm !== "" ? (
                  <ButtonSecondary
                    title="Reset Password"
                    onClick={(event) => this.resetPasswordHandler(event)}
                  />
                ) : (
                  <ButtonSecondary
                    title="Reset Password"
                    onClick={(event) => this.resetPasswordPassiveHandler(event)}
                  />
                )}
              </div>
              <p className={classes.ErrorMessage}>
                {" "}
                Please note that, password must contain numbers or characters of
                length between 6 and 20, at least one lowercase letter, one
                uppercase letter, one numeric digit, and must not contain white
                space.
              </p>
            </form>
          </div>
        ) : (
          <div>
            <h3>Your password has been reset!</h3>
            <h5>You can login with your new password!</h5>
          </div>
        )}
      </div>
    );
  }

  resetPasswordPassiveHandler = (e) => {
    e.preventDefault();
  };

  resetPasswordHandler = (e) => {
    e.preventDefault();

    const token = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).token;

    console.log(token);
    let payload = {
      resetPasswordToken: token,
      newPassword: this.state.password,
      newPasswordCheck: this.state.passwordConfirm,
    };

    axios
      .post(apiBaseUrl + "client/resetPassword", null, { params: payload })
      .then((response) => {
        this.setState({ isError: false });
        console.log(response.data);
        this.setState({ sent: true });
      })
      .catch((err, response) => {
        console.log(err);
        this.setState({ isError: true });
      });
    console.log(this.state);
  };

  checkErrorState() {
    if (this.state.isError) {
      this.setState({ errorMessage: "Incorrect password information" });
    } else {
      this.setState({ errorMessage: "nope" });
    }
  }
}

export default withRouter(ResetPassword);
