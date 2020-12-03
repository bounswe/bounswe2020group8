import React, { Component } from "react";
import { Form, Row, Col, Input, Select, DatePicker, Divider } from "antd";
import classes from "../../components/Account/Address/AddressHeadbar.module.css";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";

const { Option } = Select;

export default class Profile extends Component {
  prefixSelector = () => {
    return (
      <Form.Item name="prefix" noStyle>
        <Select defaultValue="90" style={{ width: 70 }}>
          <Option value="90">+90</Option>
        </Select>
      </Form.Item>
    );
  };

  onFinish = () => {
    console.log("finished");
  };

  onFinishFailed = () => {
    console.log("unfinished");
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
            <Input placeholder="@gmail.com" disabled />
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
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="middle"
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Old Password"
            name="old-password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered do not match!"
                  );
                },
              }),
            ]}
          >
            <Input.Password />
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
                title="Change Password"
                style={{ width: 150, justifyContent: "right" }}
                onClick={() => console.log("clicked")}
              />
            </div>
          </Form.Item>
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
          <Col span={11} style={{ textAlign: "left" }}>
            {this.renderProfileChangeForm()}
          </Col>
          <Col span={2}>
            <Divider style={{ height: "100%" }} type="vertical" />
          </Col>

          <Col span={11} style={{ textAlign: "left" }}>
            {this.renderPasswordChangeForm()}
          </Col>
        </Row>
      </div>
    );
  }
}
