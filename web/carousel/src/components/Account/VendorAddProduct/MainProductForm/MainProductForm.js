import React, { Component } from "react";
import classes from "../AddProduct.module.css";
import { Button, Form, Input, Upload, Modal } from "antd";
import PicturesWall from "../../../PicturesWall";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

class MainProductForm extends Component {
  render() {
    // let parameterInputs = "";
    // for (let i = 0; i < this.props.parameterInputs.length; i++) {}
    // parameterInputs = this.props.parameterInputs.map((param, igKey) => {
    //   console.log(param);
    //   return (
    //     <Form.Item
    //       name={["user", "parameter_" + param]}
    //       label={param.charAt(0).toUpperCase() + param.slice(1)}
    //     >
    //       <Input />
    //     </Form.Item>
    //   );
    // });

    return (
      <Form
        {...layout}
        className={classes.myReset}
        name="nest-messages"
        // onFinish={this.props.clicked}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "title"]}
          label="Main Product Title"
          // initialValue={this.props.product.title}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={["user", "description"]}
          label="Main Product Description"
          // initialValue={this.props.product.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "brand"]}
          label="Brand"
          // initialValue={this.props.product.brand}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={["user", "category"]}
          label="Category"
          // initialValue={this.props.product.category}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name={["user", "tags"]}
          label="Tags"
          rules={[{ required: true }]}
        >
          <Input placeholder="tag1, tag2, ..." />
        </Form.Item>
        <Form.Item name={["user", "parameters"]} label="Parameters">
          <div style={{ height: "20px" }} />
          parameterInputs
        </Form.Item>
        <Form.Item>
          <PicturesWall />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default MainProductForm;
