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

export default class FeaturesComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      dataSource: null,
    };
  }

  getDataSource() {
    var dataSource = [];
    if (this.props.product) {
      var i;
      for (i = 0; i < this.props.product.parameters.length; i++) {
        var dataElement = {};
        dataElement = {
          key: i.toString(),
          name: this.props.product.parameters[i].name,
          value: this.props.product.parameters[i].value,
        };
        dataSource.push(dataElement);
      }
    }
    return dataSource;
  }

  // componentDidUpdate(prevState, prevProps) {
  //   console.log(prevProps.product);
  //   console.log(this.props.product);
  //   if (prevProps.product.option !== this.props.product.option) {
  //     console.log(this.props.product);
  //     var dataSource = [];
  //     if (this.props.product) {
  //       var i;
  //       for (i = 0; i < this.props.product.parameters.length; i++) {
  //         var dataElement = {};
  //         dataElement = {
  //           key: i.toString(),
  //           name: this.props.product.parameters[i].name,
  //           value: this.props.product.parameters[i].value,
  //         };
  //         dataSource.push(dataElement);
  //       }
  //     }
  //     console.log(dataSource);
  //     this.setState({ dataSource: dataSource });
  //   }
  // }

  render() {
    const dataSource = this.getDataSource();
    return (
      <div>
        <Table dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}
