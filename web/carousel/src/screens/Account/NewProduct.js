import React from "react";
import { Form, Input, Upload, Switch, Checkbox, InputNumber } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import { InboxOutlined } from "@ant-design/icons";
import PicturesWall from "../../components/PicturesWall";

export default function NewProduct() {
  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <div>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size="middle"
      >
        <Form.Item
          name="name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Please input product name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="price"
          label="Product Price"
          rules={[
            {
              required: true,
              message: "Please input product price!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item name={"description"} label="Product Description">
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="input-number"
          rules={[
            {
              required: true,
              message: "Please input product stock info!",
            },
          ]}
        >
          <Form.Item noStyle>
            <InputNumber min={1} />
          </Form.Item>
          <span className="ant-form-text"> products</span>
        </Form.Item>

        <Form.Item name="switch" label="Available" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Product Images">
          <PicturesWall />
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
              title="Add new product"
              style={{ width: 150 }}
              onClick={() => console.log("clicked")}
            />
          </div>
        </Form.Item>
      </Form>
    </div>
  );
}
