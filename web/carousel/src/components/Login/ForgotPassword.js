import React, { Component } from "react";
import classes from "./ForgotPassword.module.css";
import { withRouter } from "react-router-dom";
import ButtonSecondary from "../UI/ButtonSecondary/ButtonSecondary";
import UserInfo from "../Context/UserInfo";

import axios from "axios";

let apiBaseUrl = "http://18.198.51.178:8080/";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      redirect: false,
      sent: false,
      isError: false,
      errorMessage: "",
      userType: "Customer",
    };
  }

  static contextType = UserInfo;

  emailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  render() {
    console.log(this.state.userType);
    return (
      <div className={classes.ForgotPassword}>
        {!this.state.sent ? (
          <div>
            <h1>Reset Password</h1>
            <div
              onChange={(event) =>
                this.setState({ userType: event.target.value })
              }
            >
              <input
                type="radio"
                value="Customer"
                defaultChecked
                name="userType"
              />{" "}
              Customer
              <input type="radio" value="Vendor" name="userType" /> Vendor
            </div>
            <h5>
              Enter your e-mail address so we can send you a link to reset your
              password
            </h5>
            <form className={classes.Form}>
              <br />
              <input
                className={classes.Input}
                placeholder="name@e-mail.com"
                name="email"
                type="text"
                value={this.state.email}
                onChange={this.emailChangeHandler}
              />
              <br />
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  padding: 10,
                }}
              >
                <ButtonSecondary
                  title="Send Link"
                  onClick={(event) => this.sendLinkHandler(event)}
                />
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h3>An e-mail is sent to {this.state.email}!</h3>
            <h5>You can reset your password from the link in the mail!</h5>
          </div>
        )}
      </div>
    );
  }

  sendLinkHandler = (e) => {
    e.preventDefault();

    let userTypeToPayload = "CLIENT";
    // var self = this;c
    if (this.state.userType === "Customer") {
      userTypeToPayload = "CLIENT";
    } else {
      userTypeToPayload = "VENDOR";
    }

    let payload = {
      email: this.state.email,
      type: userTypeToPayload,
    };

    axios
      .post(apiBaseUrl + "client/forgotPassword", null, { params: payload })
      .then((response) => {
        this.setState({ isError: false });
        console.log(response.data);
        console.log("oldu");
        this.setState({ sent: true });
        // this.context.login(self.state.email, response.data.tokenCode);
        // this.props.history.push("/");
      })
      .catch((err, response) => {
        console.log(err);
        console.log("olmadı");
        this.setState({ isError: true });
      });
    console.log(this.state);
  };

  checkErrorState() {
    if (this.state.isError) {
      this.setState({ errorMessage: "False e-mail information" });
    } else {
      this.setState({ errorMessage: "nope" });
    }
  }
}
export default withRouter(ForgotPassword);
