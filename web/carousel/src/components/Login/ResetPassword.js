import React, { Component } from "react";
import classes from "./ResetPassword.module.css";
import { withRouter } from "react-router-dom";
import ButtonSecondary from "../UI/ButtonSecondary/ButtonSecondary";
import qs from "qs";
import { Form } from "antd";
import PasswordForm from "../PasswordForm/PasswordForm";
import services from "../../apis/services";
import userInfo from "../Context/UserInfo";

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
      visible: false,
    };
  }
  static contextType = userInfo;

  eraseError = () => {
    this.setState({ visible: false });
  };
  render() {
    return (
      <div className={classes.ResetPassword}>
        {!this.state.sent ? (
          <div>
            <h1>Reset your password</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Form style={{ alignItems: "center" }}>
                <PasswordForm eraseError={this.eraseError} />
                <div>
                  <Form.Item>
                    <ButtonSecondary
                      title="Reset Password"
                      style={{ width: 300, fontSize: 20 }}
                      onClick={this.resetPasswordHandler}
                    />
                  </Form.Item>
                </div>
              </Form>
            </div>
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

  resetPasswordHandler = () => {
    const token = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true,
    }).token;

    const payload = {
      resetPasswordToken: token,
      newPassword: this.context.password,
      newPasswordCheck: this.context.passwordConfirm,
    };
    const url = "/client/resetPassword";

    services
      .post(url, null, { params: payload })
      .then((response) => {
        this.setState({ isError: false });
        this.setState({ sent: true });
      })
      .catch((err, response) => {
        console.log(err);
        this.setState({ isError: true });
      });
  };
}

export default withRouter(ResetPassword);
