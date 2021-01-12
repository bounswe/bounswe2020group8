import React, { Component } from "react";
import classes from "../AddProduct.module.css";
import { Button, Form, Input } from "antd";

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

class ExistingProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
    };
  }

  render() {
    let parameterInputs = "";
    let productId = ";";
    let params = [this.props.parameterInputs];
    parameterInputs = Object.entries(params[0]).map(([key, val], igKey) => {
      if (key !== "tags" && key !== "id") {
        return (
          <Form.Item
            name={["user", key]}
            initialValue={val}
            label={key.charAt(0).toUpperCase() + key.slice(1)}
          >
            <Input disabled />
          </Form.Item>
        );
      } else if (key === "id") {
        productId = val;
      }
    });

    return (
      <Form
        {...layout}
        className={classes.myReset}
        name="nest-messages"
        onFinish={this.props.clicked}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "title"]}
          label="Product Title"
          initialValue={this.props.product.title}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={["user", "brand"]}
          label="Brand"
          initialValue={this.props.product.brand}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={["user", "category"]}
          label="Category"
          initialValue={this.props.product.category}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          name={["user", "price"]}
          label="Price"
          rules={[{ required: true }]}
        >
          <Input placeholder="price in $" />
        </Form.Item>
        <Form.Item
          name={["user", "amount"]}
          label="Amount"
          rules={[{ required: true }]}
        >
          <Input placeholder="Amount" />
        </Form.Item>
        <Form.Item
          name={["user", "shipmentPrice"]}
          label="Shipment Price"
          rules={[{ required: true }]}
        >
          <Input placeholder="Shipment Price in $" />
        </Form.Item>
        <Form.Item
          name={["user", "cargoCompany"]}
          label="Cargo Company"
          rules={[{ required: true }]}
        >
          <Input placeholder="Cargo Company Name" />
        </Form.Item>
        <Form.Item
          name={["user", "id"]}
          hidden
          label="ID"
          initialValue={productId}
          rules={[{ required: true }]}
        />
        <Form.Item
          name={["user", "tags"]}
          label="Tags"
          rules={[{ required: true }]}
          initialValue={this.props.tags}
        >
          <Input disabled placeholder="tag1, tag2, ..." />
        </Form.Item>
        <Form.Item name={["user", "parameters"]} label="Parameters">
          <div style={{ height: "20px" }} />
          {parameterInputs}
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={this.props.onClick}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ExistingProductForm;
