import React, { Component } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import S3FileUpload from "react-s3";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = ({ file, fileList }) => {
    console.log(file);
    console.log(fileList);
    this.setState({ fileList });
  };
  handleUpload({ onSuccess, onError, file, onProgress }) {
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    });
    const myBucket = new AWS.S3({
      params: { Bucket: process.env.REACT_APP_AWS_BUCKET_NAME },
      region: process.env.REACT_APP_AWS_BUCKET_REGION,
    });
    const key = uuidv4();

    const params = {
      ACL: "public-read",
      Key: key,
      ContentType: file.type,
      Body: file,
    };

    myBucket
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // that's how you can keep track of your upload progress
        onProgress({ percent: Math.round((evt.loaded / evt.total) * 100) });
      })
      .send((e) => {
        onSuccess("Ok");
        const url = `https://${process.env.REACT_APP_AWS_BUCKET_NAME}.s3.${process.env.REACT_APP_AWS_BUCKET_REGION}.amazonaws.com/${key}`;
        this.props.setPhotos([...this.props.photos, url]);
        console.log(e);
      });
  }
  render() {
    console.log(this.state.fileList);
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          customRequest={(e) => this.handleUpload(e)}
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
          style={{ marginTop: 100 }}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
