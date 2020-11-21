import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import React, { Component } from "react";

class CustomerSignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      userType: "Customer",
      name: "",
      surname: "",
    };
  }

  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Customer SignUp" />
            <TextField
              hintText="Enter your Email adress"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              type="password"
              hintText="Enter your strong password"
              floatingLabelText="Password"
              onChange={(event, newValue) =>
                this.setState({ password: newValue })
              }
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
            <RaisedButton
              label="SignUp"
              primary={true}
              style={style}
              onClick={(event) => this.handleCustomerSignUp(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
  handleCustomerSignUp(event) {
    var self = this;
    console.log(self.state);
  }
}

const style = {
  margin: 15,
};

export default CustomerSignUp;
