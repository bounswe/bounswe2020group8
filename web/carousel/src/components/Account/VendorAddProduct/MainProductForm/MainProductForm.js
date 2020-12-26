import React, { Component } from "react";
import classes from "../AddProduct.module.css";
import { Button, Form, Input, Space } from "antd";
import PicturesWall from "../../../PicturesWall";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonSecondary from "../../../UI/ButtonSecondary/ButtonSecondary";

const TOKEN = localStorage.getItem("token");

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
    return (
      <Form
        {...layout}
        className={classes.myReset}
        name="dynamic_form_nest_item"
        onFinish={this.props.clicked}
        validateMessages={validateMessages}
      >
        <Form.Item
          name={["user", "title"]}
          label="Main Product Title"
          rules={[{ required: true }]}
        >
          <Input placeholder="example: Iphone 8" />
        </Form.Item>
        <Form.Item
          name={["user", "description"]}
          label="Main Product Description"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "brand"]}
          label="Brand"
          rules={[{ required: true }]}
        >
          <Input placeholder="example: Apple" />
        </Form.Item>
        <Form.Item
          name={["user", "category"]}
          label="Category"
          rules={[{ required: true }]}
        >
          <Input placeholder="example: electronics" />
        </Form.Item>

        <Form.Item
          name={["user", "tags"]}
          label="Tags"
          rules={[{ required: true }]}
        >
          <Input placeholder="tag1, tag2, ..." />
        </Form.Item>
        <Form.Item label="Parameters">
          <Form.List name={["user", "parameters"]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                      rules={[
                        { required: true, message: "Missing parameter name" },
                      ]}
                    >
                      <Input placeholder="color" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "values"]}
                      fieldKey={[field.fieldKey, "values"]}
                      rules={[
                        { required: true, message: "Missing parameter values" },
                      ]}
                    >
                      <Input placeholder="white, black, ..." />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Parameters
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>
        <Form.Item name={["user", "images"]}>
          <PicturesWall />
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

export default MainProductForm;
