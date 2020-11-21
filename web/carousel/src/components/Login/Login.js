import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: "Customer",
      redirect: false,
    };
  }

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
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
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

  handleLoginClick(event) {
    var self = this;
    console.log(self.state);
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

export default LoginComponent;
