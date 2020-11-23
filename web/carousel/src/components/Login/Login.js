import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import UserInfo from "../Context/UserInfo";
import { withRouter } from "react-router-dom";
import PasswordForm from "../PasswordForm/PasswordForm";

var apiBaseUrl = "http://18.198.51.178:8080/";

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
    };
  }
  static contextType = UserInfo;
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Login" />
            <TextField
              hintText="Enter your Email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <PasswordForm
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
              password={this.state.password}
            />
            <br />
            <br />
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
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={(event) => this.handleLoginClick(event)}
            />
          </div>
          {this.checkErrorState()}
          <p>{this.state.errorMessage}</p>
          <div>
            Don't you have an account?
            <br />
            <div>
              {this.renderRedirect()}
              <RaisedButton
                label="SignUp"
                primary={true}
                style={style}
                onClick={this.setRedirect}
              />
            </div>
            <br />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }

  handleLoginClick = (event) => {
    var self = this;
    var userTypeToPayload;
    if (self.state.userType == "Customer") {
      userTypeToPayload = "CLIENT";
    } else {
      userTypeToPayload = "VENDOR";
    }
    var payload = {
      password: self.state.password,
      email: self.state.email,
      type: userTypeToPayload,
    };

    axios
      .post(apiBaseUrl + "client/login", null, { params: payload })
      .then((response) => {
        this.setState({ isError: false });
        console.log(response.data);
        this.context.login(self.state.email, response.data.tokenCode);
        this.props.history.push("/");
      })
      .catch((err, response) => {
        console.log(err);
        this.setState({ isError: true });
      });
  };
  checkErrorState() {
    if (this.state.isError) {
      this.state.errorMessage = "False login information";
    } else {
      this.state.errorMessage = "";
    }
  }

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

const style = {
  margin: 15,
};

export default withRouter(LoginComponent);
