import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React, { Component } from "react";
import axios from "axios";
import PasswordForm from "../PasswordForm/PasswordForm";

var apiBaseUrl = "http://18.198.51.178:8080/";

class VendorSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      companyTitle: "",
      surname: "",
      userType: "Vendor",
      signUpMessage: "",
      isWeakPassword: true
    };
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Vendor SignUp" />
            <TextField
              hintText="Enter your Email adress"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <PasswordForm
              password={this.state.password}
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
              setIsWeak={(newValue) => {
                this.setState({isWeakPassword: newValue});
              }}
              wasWeak={this.state.isWeakPassword}
            />
            <br />
            <TextField
              type="name"
              hintText="Enter your name"
              floatingLabelText="Name"
              onChange={(event, newValue) => this.setState({ name: newValue })}
            />
            <br />
            <TextField
              type="surname"
              hintText="Enter your surname"
              floatingLabelText="Surname"
              onChange={(event, newValue) =>
                this.setState({ surname: newValue })
              }
            />
            <br />
            <br />
            <TextField
              type="title"
              hintText="Enter your title of the company"
              floatingLabelText="Company"
              onChange={(event, newValue) =>
                this.setState({ companyTitle: newValue })
              }
            />
            <br />
            <RaisedButton
              label="SignUp"
              primary={true}
              style={style}
              onClick={(event) => this.handleVendorSignUp(event)}
            />
            <p>{this.state.signUpMessage}</p>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
  handleVendorSignUp(event) {
    var self = this;
    if (this.state.isWeakPassword) {
      return;
    }
    var payload = {
      password: self.state.password,
      passwordConfirm: self.state.password,
      email: self.state.email,
      type: "VENDOR",
      name: self.state.name,
      lastName: self.state.surname,
    };
    console.log(payload);
    axios
      .post(apiBaseUrl + "client/signup", null, { params: payload })
      .then((response) => {
        console.log(response);
        this.setState({ signUpMessage: "Verification e-mail has been sent" });
      })
      .catch((error) => {
        console.log(error.response.data.returnMessage);
        this.setState({ signUpMessage: error.response.data.returnMessage });
      });
  }
}
const style = {
  margin: 15,
};

export default VendorSignUp;
