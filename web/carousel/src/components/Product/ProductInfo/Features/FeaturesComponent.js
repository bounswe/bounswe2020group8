import React from "react";
import { Table, Tag, Space } from "antd";
const columns = [
  {
    title: "Feature Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Value",
    dataIndex: "value",
    key: "value",
  },
];

var dataSource = [];

export default class FeaturesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
    };
  }

  componentWillMount() {
    if (this.props.product != null) {
      this.setState({ product: this.props.product });
    }
    if (dataSource.length == 0) {
      if (this.state.product) {
        var i;
        for (i = 0; i < this.state.product.parameters.length; i++) {
          var dataElement = {};
          dataElement = {
            key: i.toString(),
            name: this.state.product.parameters[i].name,
            value: this.state.product.parameters[i].value,
          };
          dataSource.push(dataElement);
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
