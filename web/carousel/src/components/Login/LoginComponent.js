import React, { Component } from "react";
import axios from "axios";
import UserInfo from "../Context/UserInfo";
import { withRouter } from "react-router-dom";
import classes from "./Login.module.css";
import { signIn, signOut } from "../../redux/auth/actions";
import { connect } from "react-redux";

import LoginSignButtons from "./LoginSignButtons/LoginSignButtons";
import LoginContainer from "./LoginContainer/LoginContainer";
import SignupContainer from "./SignupContainer/SignupContainer";

const apiBaseUrl = "http://18.198.51.178:8080/";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: "Customer",
      redirect: false,
      isError: false,
      errorMessage: "",
      buttonColors: {
        button1: "#ffffff",
        button2: "#eeeeee",
        button1Text: "#FF6D00",
        button2Text: "black",
      },
      showLogin: true,
      firstTime: true,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.showLogin !== this.state.showLogin) {
      this.setState({ isError: false });
    }
  }

  // Toogle style between Login & Sign Up buttons
  changeButtonStyleHandler = (button) => {
    this.setState({ firstTime: false });
    if (button === "button1") {
      this.setState({
        showLogin: true,
        buttonColors: {
          button1: "#ffffff",
          button2: "#eeeeee",
          button1Text: "#FF6D00",
          button2Text: "black",
        },
      });
    } else {
      this.setState({
        showLogin: false,
        buttonColors: {
          button2: "#ffffff",
          button1: "#eeeeee",
          button2Text: "#FF6D00",
          button1Text: "black",
        },
      });
    }
  };

  static contextType = UserInfo;

  render() {
    return (
      <div>
        <LoginSignButtons
          loginColor={this.state.buttonColors.button1}
          signupColor={this.state.buttonColors.button2}
          loginTextColor={this.state.buttonColors.button1Text}
          signupTextColor={this.state.buttonColors.button2Text}
          clicked={this.changeButtonStyleHandler}
          first={this.state.firstTime}
        />
        <div className={classes.Container}>
          {this.state.showLogin ? (
            <LoginContainer
              forgot={this.forgotPasswordHandler}
              clicked={() => this.handleLoginClick()}
              error={this.state.isError}
            />
          ) : (
            <SignupContainer
              clicked={() => this.handleSignupClick()}
              error={this.state.isError}
            ></SignupContainer>
          )}
        </div>
      </div>
    );
  }

  forgotPasswordHandler = () => {
    this.props.history.push("/forgot");
  };

  handleLoginClick = () => {
    const payload = {
      email: this.context.email,
      password: this.context.password,
    };
    let url = apiBaseUrl;

    if (this.context.userType === "Customer") {
      url += "customer/login";
    } else if (this.context.userType === "Vendor") {
      url += "vendor/login";
    } else {
      return;
    }
    axios
      .post(url, null, { params: payload })
      .then((response) => {
        this.setState({ isError: false });
        console.log(response.data);
        localStorage.setItem("token", response.data.tokenCode);
        this.context.login(this.state.email, response.data.tokenCode);
        this.context.error = false;

        this.props.signIn();
        this.props.history.push("/");
      })
      .catch((err, response) => {
        console.log(err);
        this.context.error = true;
        console.log("resp daata: " + response);
        this.setState({ isError: true });
      });
  };

  handleSignupClick = () => {
    let payload = {};
    let url = apiBaseUrl;
    if (this.context.userType === "Vendor") {
      payload = {
        name: this.context.name,
        lastName: this.context.surname,
        companyName: this.context.companyName,
        companyDomainName: this.context.companyDomain,
        email: this.context.email,
        password: this.context.password,
        passwordConfirm: this.context.passwordConfirm,
      };
      url += "vendor/signup";
    } else if (this.context.userType === "Customer") {
      payload = {
        name: this.context.name,
        lastName: this.context.surname,
        email: this.context.email,
        password: this.context.password,
        passwordConfirm: this.context.passwordConfirm,
      };
      url += "customer/signup";
    } else {
      return;
    }

    axios
      .post(url, null, { params: payload })
      .then((response) => {
        console.log(response);
        this.context.error = false;
        this.setState({ signUpMessage: "Verification e-mail has been sent" });
      })
      .catch((error) => {
        console.log("ERROR: " + error);
        this.context.error = true;
        this.setState({ signUpMessage: error.response.data.returnMessage });
      });
  };
}

export default withRouter(connect(null, { signIn })(LoginComponent));
