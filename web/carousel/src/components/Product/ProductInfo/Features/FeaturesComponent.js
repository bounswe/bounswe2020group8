import React from "react";
import { Table, Tag, Space } from "antd";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

export default class FeaturesComponent extends React.Component {
  render() {
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    );
  }
}
