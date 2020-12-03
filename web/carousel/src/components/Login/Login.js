import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
    // if(prevState.isError !== this.state.isError) {
    if (prevState.showLogin !== this.state.showLogin) {
      this.setState({ isError: false });
      // this.state.isError = false;
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

  // general input change handler
  onChangeInputHandler = (e, stateToChange) => {
    const name = e.target.name;
    if (name === "email") {
      this.setState({ email: e.target.value });
    } else if (name === "password") {
      this.setState({ password: e.target.value });
    }
  };

  emailChangeHandler = (newEmail) => {
    this.setState({ email: newEmail });
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
              change={(event) => this.onChangeInputHandler(event)}
              forgot={this.forgotPasswordHandler}
              clicked={() => this.handleLoginClick()}
              error={this.state.isError}
            />
          ) : (
            <SignupContainer
              change={(event) => this.onChangeInputHandler(event)}
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

  // login request
  handleLoginClick = () => {
    console.log("bas");
    let userTypeToPayload;
    if (this.context.userType === "Customer") {
      userTypeToPayload = "CLIENT";
    } else if (this.context.userType === "Vendor") {
      userTypeToPayload = "VENDOR";
    }
    const payload = {
      password: this.context.password,
      email: this.context.email,
      type: userTypeToPayload,
    };

    axios
      .post(apiBaseUrl + "client/login", null, { params: payload })
      .then((response) => {
        this.setState({ isError: false });
        console.log(response.data);

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

  // signup request
  handleSignupClick = () => {
    console.log("type req: " + this.context.userType);
    let userTypeToPayload;
    if (this.context.userType === "Customer") {
      userTypeToPayload = "CLIENT";
    } else if (this.context.userType === "Vendor") {
      userTypeToPayload = "VENDOR";
    }
    const payload = {
      password: this.context.password,
      passwordConfirm: this.context.password,
      email: this.context.email,
      type: userTypeToPayload,
      name: this.context.name,
      lastName: this.context.surname,
    };
    console.log(payload);
    axios
      .post(apiBaseUrl + "client/signup", null, { params: payload })
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

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/signup" />;
    }
  };
}

export default withRouter(connect(null, { signIn, signOut })(LoginComponent));
