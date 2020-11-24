import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import CustomerSignUp from "./CustomerSignup";
import VendorSignUp from "./VendorSignUp";
import { Redirect } from "react-router-dom";
import GoogleAuth from "../GoogleAuth";

class SignUpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: "Customer",
      comp: null,
      redirect: false,
    };
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
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
          {this.checkRadio()}
          {this.state.comp}
          <p>Do you have an account?</p>
          {this.renderRedirect()}
          <RaisedButton
            label="Go to Login"
            primary={true}
            style={style}
            onClick={this.setRedirect}
          />
        </MuiThemeProvider>
        <GoogleAuth isSignup userType={this.state.userType} />
      </div>
    );
  }

  checkRadio = () => {
    if (this.state.userType == "Customer") {
      this.state.comp = <CustomerSignUp />;
    } else {
      this.state.comp = <VendorSignUp />;
    }
    console.log(this.state);
  };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
  };
}

const style = {
  margin: 15,
};

export default SignUpComponent;
