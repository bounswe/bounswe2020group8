import React, { Component } from "react";
import {Space} from "antd";
import classes from "../AddProduct.module.css";
import Table from "antd/lib/table";

class MainProductTable extends Component {
  render() {
    const columns = [
      {
        title: "Product Name",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Brand",
        dataIndex: "brand",
        key: "brand",
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
      },
      {
        title: "Parameters",
        dataIndex: "parameters",
        key: "parameters",
      },
      {
        title: "Action",
        key: "action",
        render: (id, record) => (

          <Space size="large">

            <a
              className={classes.TableActionsSuspend}
              onClick={() => { this.props.clicked(record);}}
            >
              List Child Products
            </a>
            <br />

          </Space>
        ),
      },
    ];

    return (
      <Table dataSource={this.props.data} columns={columns}/>
    );
  }
}

export default MainProductTable;