import React, { Component } from "react";
import classes from "../AddProduct.module.css";
import {Button, Form, Input, Upload, Modal } from "antd";
import { PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        parentProductId: "",

        //photo related states
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-3',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-4',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-xxx',
            percent: 50,
            name: 'image.png',
            status: 'uploading',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
          },
          {
            uid: '-5',
            name: 'image.png',
            status: 'error',
          },
        ],
      };
  }

  componentDidMount() {
    this.setState({parentProductId: this.props.parentProduct});
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    console.log(this.state.parentProduct);
    console.log(this.props.product);
    console.log(this.props.parameterInputs);

    let parameterInputs = "";
    for (let i = 0; i < this.props.parameterInputs.length; i++) {

    }
    parameterInputs = this.props.parameterInputs.map((param, igKey) =>{
      console.log(param);
      return(
        <Form.Item name={['user', "parameter_" + param]} label={param.charAt(0).toUpperCase() + param.slice(1)}>
          <Input />
        </Form.Item>
      );
    });

    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <Form {...layout} className={classes.myReset} name="nest-messages" onFinish={this.props.clicked}
            validateMessages={validateMessages}>
        <Form.Item name={['user', 'title']} label="Product Title" initialValue={this.props.product.title}>
          <Input disabled />
        </Form.Item>
        <Form.Item name={['user', 'brand']} label="Brand" initialValue={this.props.product.brand}>
          <Input disabled/>
        </Form.Item>
        <Form.Item name={['user', 'category']} label="Category" initialValue={this.props.product.category}>
          <Input disabled/>
        </Form.Item>
        <Form.Item name={['user', 'price']} label="Price"  rules={[{required: true}]}>
          <Input placeholder="price in $"/>
        </Form.Item>
        <Form.Item name={['user', 'amount']} label="Amount"  rules={[{required: true}]}>
          <Input placeholder="Amount"/>
        </Form.Item>
        <Form.Item name={['user', 'shipmentPrice']} label="Shipment Price"  rules={[{required: true}]}>
          <Input placeholder="Shipment Price in $"/>
        </Form.Item>
        <Form.Item name={['user', 'cargoCompany']} label="Cargo Company"  rules={[{required: true}]}>
          <Input placeholder="Cargo Company Name"/>
        </Form.Item>
        <Form.Item name={['user', 'tags']} label="Tags" rules={[{required: true}]}>
          <Input placeholder="tag1, tag2, ..."/>
        </Form.Item>
        <Form.Item name={['user', 'parameters']} label="Parameters">
          <div style={{height:"20px"}}/>
          {parameterInputs}
        </Form.Item>
        <Form.Item>
          <>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </>
        </Form.Item>
        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ProductForm;