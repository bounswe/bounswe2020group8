import React, { Component } from "react";
import classes from "../AddProduct.module.css";
import { Button, Form, Input, Space, Tag } from "antd";
import PicturesWall from "../../../PicturesWall";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { TweenOneGroup } from "rc-tween-one";
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
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    };
  }

  showTagInput = () => {
    this.setState({ tagInputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;

    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      tagInputVisible: false,
      inputValue: "",
    });
    this.props.passTags(tags);
  };

  handleClose = (removedTag) => {
    let id = this.state.categoryIdDic[removedTag];

    const tags = this.state.tags.filter((tag) => tag !== removedTag);
    delete this.state.categoryIdDic[removedTag];
    this.setState({ tags });
  };

  saveInputRef = (input) => {
    this.input = input;
  };

  setFields = (fields) => {
    fields = this.state.tags;
    return fields;
  };

  forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          this.handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: "inline-block" }}>
        {tagElem}
      </span>
    );
  };

  render() {
    const tagChild = this.state.tags.map(this.forMap);

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
          setFieldsValue={this.state.tags}
        >
          <div style={{ marginBottom: 16 }}>
            <TweenOneGroup
              enter={{
                scale: 0.8,
                opacity: 0,
                type: "from",
                duration: 100,
                onComplete: (e) => {
                  e.target.style = "";
                },
              }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              appear={false}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
          <Tag onClick={this.showTagInput} className="site-tag-plus">
            <PlusOutlined /> New Tag
          </Tag>
          {this.state.tagInputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
        </Form.Item>
        {/*<Form.Item*/}
        {/*  name={["user", "tags"]}*/}
        {/*  label="Tags"*/}
        {/*  rules={[{ required: true }]}*/}
        {/*>*/}
        {/*  <Input placeholder="tag1, tag2, ..." />*/}
        {/*</Form.Item>*/}
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
        {/* <Form.Item name={["user", "images"]}>
          <PicturesWall />
        </Form.Item> */}
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
