import React, { Component } from "react";
import { Space } from "antd";
import classes from "../AddProduct.module.css";
import Table from "antd/lib/table";

class ExistingProductsTable extends Component {
  render() {
    let data = this.props.data;
    let parameterNames = data[0].parameterNames;
    let products = [];
    for (let i = 0; i < data.length; i++) {
      let params = {};
      for (let k = 0; k < parameterNames.length; k++) {
        const value =
          data[i].parameters[0][k] === undefined
            ? "not defined"
            : data[i].parameters[0][k];
        params = {
          ...params,
          [parameterNames[k]]: value,
        };
      }
      let tags = data[i].tags.join(", ");

      const temp = {
        ...params,
        tags: tags,
        id: data[i].id,
      };
      products = [...products, temp];
      params = {};
    }

    let paramCols = [];
    for (let i = 0; i < parameterNames.length; i++) {
      let temp = {
        title:
          parameterNames[i].charAt(0).toUpperCase() +
          parameterNames[i].slice(1),
        dataIndex: parameterNames[i],
        key: parameterNames[i],
      };
      paramCols = [...paramCols, temp];
    }

    paramCols = [
      ...paramCols,
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
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
              Place Product
            </a>
            <br />
          </Space>
        ),
      },
    ];

    return <Table dataSource={products} columns={paramCols} />;
  }
}

export default ExistingProductsTable;
