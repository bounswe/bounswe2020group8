import React, { Component } from "react";
import { Space } from "antd";
import classes from "../AddProduct.module.css";
import Table from "antd/lib/table";
import ButtonSecondary from "../../../UI/ButtonSecondary/ButtonSecondary";
import services from "../../../../apis/services";
import MainProductForm from "../MainProductForm/MainProductForm";

class MainProductTable extends Component {
  postMainProduct = () => {
    let url = "/mainProduct/";
    let payload = {
      title: "Nice TV ",
      parameters: [
        { name: "size", values: ["XL", "L", "M"] },
        { name: "color", values: ["blue", "green", "yellow"] },
      ],
      description: "Description",
      rating: 0,
      numberOfRating: 0,
      brand: "Samsung",
      soldAmount: 0,
      category: "electronics",
      isConfirmed: false,
      tags: ["Apple", "blue", "green", "yellow", "XL", "L", "M"],
    };

    services
      .post(url, payload)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("ERROR: " + error);
      });
  };

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
              onClick={() => {
                this.props.clicked(record);
              }}
            >
              List Child Products
            </a>
            <br />
          </Space>
        ),
      },
    ];

    return (
      <div>
        <Table dataSource={this.props.data} columns={columns} />
      </div>
    );
  }
}

export default MainProductTable;
