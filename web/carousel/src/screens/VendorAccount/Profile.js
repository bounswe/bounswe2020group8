import React, { Component } from "react";
import { Form, Row, Col, Input, Select, DatePicker, Divider } from "antd";
import classes from "../../components/Account/Address/AddressHeadbar.module.css";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import PasswordForm from "../../components/PasswordForm/PasswordForm";
import UserInfo from "../../components/Context/UserInfo";
import services from "../../apis/services";

const { Option } = Select;

export default class Profile extends Component {
  state = { visible: false };
  static contextType = UserInfo;

  prefixSelector = () => {
    return (
      <Form.Item name="prefix" noStyle>
        <Select defaultValue="90" style={{ width: 70 }}>
          <Option value="90">+90</Option>
        </Select>
      </Form.Item>
    );
  };

  eraseError = () => {
    this.setState({ visible: false });
  };

  onChangePassword = () => {
    let url = "";
    // if (this.context.userType === "Customer") {
    //   url = "/customer/changePassword";
    // } else
    if (this.context.userType === "Vendor") {
      url = "/vendor/changePassword";
    } else {
      return;
    }
    const token = localStorage.getItem("token");
    const payload = {
      oldPassword: this.context.oldPassword,
      newPassword: this.context.password,
      newPasswordRepeat: this.context.passwordConfirm,
    };
    services
      .post(url, null, {
        params: payload,
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        this.context.error = false;
        this.setState({ visible: false });
        this.props.history.push("/vendor");
      })
      .catch((err, response) => {
        console.log(err);
        this.context.error = true;
        this.setState({ visible: true });
      });
  };

  renderProfileChangeForm() {
    return (
      <div>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="middle"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            name="Name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input your Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="Surname"
            label="Surname"
            rules={[{ required: true, message: "Please input your Surname!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="email" label="E-mail">
            <Input placeholder={this.context.email} disabled />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number">
            <Input
              addonBefore={this.prefixSelector()}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Birthday Date">
            <DatePicker />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <ButtonPrimary
                title="Save Changes"
                style={{ width: 150 }}
                onClick={() => console.log("clicked")}
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }

  renderPasswordChangeForm() {
    return (
      <div>
        <Form
          style={{ width: 400 }}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="middle"
        >
          <div style={{ padding: 10 }}>
            {this.state.visible ? (
              <p
                style={{
                  backgroundColor: "#ffb3b3",
                  color: "darkred",
                  margin: "auto",
                  marginTop: "-20px",
                  border: "1px solid darkred",
                  width: "240px",
                }}
              >
                Invalid password!
              </p>
            ) : null}
          </div>
          <PasswordForm showOldPassword eraseError={this.eraseError} />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              paddingRight: 100,
            }}
          >
            <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
              <ButtonPrimary
                title="Change Password"
                style={{ width: 150 }}
                onClick={this.onChangePassword}
              />
            </Form.Item>
          </div>
        </Form>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className={classes.Headbar}>
          <span style={{ fontSize: "xx-large" }}>My Profile</span>
        </div>
        <Row
          style={{
            justifyContent: "space-evenly",
            display: "flex",
          }}
        >
          <Col span={10} style={{ textAlign: "left" }}>
            {this.renderProfileChangeForm()}
          </Col>
          <Col span={2}>
            <Divider style={{ height: "100%" }} type="vertical" />
          </Col>

          <Col span={12}>{this.renderPasswordChangeForm()}</Col>
        </Row>
      </div>
    );
  }
}
