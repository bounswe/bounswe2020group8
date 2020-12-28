import React, { Component } from "react";
import classes from "../AddProduct.module.css";
import { Button, Form, Input, Radio, Tag } from "antd";
import PicturesWall from "../../../PicturesWall";
import { TweenOneGroup } from "rc-tween-one";
import { PlusOutlined } from "@ant-design/icons";

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
class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentProductId: "",
<<<<<<< HEAD
      photos: "",
=======
      paramValue: 0,
      tagInputVisible: false,
      inputValue: "",
      tags: [],
      categoryIdDic: {},
>>>>>>> web-feature/split-vendor-pages
    };
  }

  componentDidMount() {
    this.setState({ parentProductId: this.props.parentProduct });
  }

<<<<<<< HEAD
  handleSubmit(values) {
    this.props.clicked({ user: { ...values.user, photos: this.state.photos } });
  }

  setPhotos(photos) {
    this.setState({ photos: photos });
  }

=======
  onChange = (e) => {
    this.setState({paramValue: e.target.value});
  };

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
  }

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

>>>>>>> web-feature/split-vendor-pages
  render() {
    let parameterInputs = "";
    let parameterValues = [];

    for (let i = 0; i < this.props.parameterValues.length; i++) {
      let params = [];
      for (let k = 0; k < this.props.parameterValues[i].length; k++) {
        params.push(<Radio value={this.props.parameterValues[i][k]}>{this.props.parameterValues[i][k]}</Radio>);
      }
      parameterValues.push(
        <Radio.Group onChange={(event) => this.onChange(event)} value={this.state.parameterValues}>
          {params}
        </Radio.Group>
      );
    }

    for (let i = 0; i < this.props.parameterInputs.length; i++) {}
    parameterInputs = this.props.parameterInputs.map((param, igKey) => {
      return (
        <Form.Item
          name={["user", "parameter_" + param]}
          rules={[{ required: true }]}
          label={param.charAt(0).toUpperCase() + param.slice(1)}
        >
          {parameterValues[igKey]}
        </Form.Item>
      );
    });

    const tagChild = this.state.tags.map(this.forMap);

    return (
      <Form
        {...layout}
        className={classes.myReset}
        name="nest-messages"
        onFinish={(e) => this.handleSubmit(e)}
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
        <Form.Item name={["user", "parameters"]} label="Parameters">
          <div style={{ height: "20px" }} />
          {parameterInputs}
        </Form.Item>
        <Form.Item>
          <PicturesWall
            setPhotos={(e) => this.setPhotos(e)}
            photos={this.state.photos}
          />
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

export default ProductForm;