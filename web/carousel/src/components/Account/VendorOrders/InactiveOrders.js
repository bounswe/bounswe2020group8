import React, {Component} from "react";
import Table from "antd/lib/table";

import services from "../../../apis/services";
import {Space} from "antd";
import classes from "./Orders.module.css";

export class InactiveOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      loading: true,  // loading state for the table
    };
  }

  // get orders on mount
  componentDidMount() {
    this.setState({loading: true});
    this.getMyOrders();
  }

  // get all orders
  getMyOrders = () => {
    this.setState({orders: []});
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    services.get("/vendor/order/main", config)
      .then(response => {
        this.sortOrders(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // orders for each product are extracted
  sortOrders = (data) => {
    let list = [];
    for (let i = 0; i < data.length; i++) {
      const customer = data[i].customerID;
      const mainOrderID = data[i]._id;
      for (let k = 0; k < data[i].orders.length; k++) {
        const order = data[i].orders[k];
        const orderID = order._id;
        this.getOrderProduct(order.productId, order, i + "0000" + k, customer, mainOrderID, orderID);
      }
    }
  }

  // get order specific product info
  getOrderProduct = (productID, order, key, customer, mainOrderID, orderID) => {
    let list = [];
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    let data;
    let title;
    let parameters = [];
    services.get("/vendor/me/product/" + productID, config)
      .then(response => {
        data = response.data.data[0];

        // get parameter values
        for (let i = 0; i < data.parameters.length; i++){
          if (i !== data.parameters.length - 1) parameters.push(data.parameters[i].value + ", ");
          else parameters.push(data.parameters[i].value);
        }

        services.get("/mainProduct/" + data.parentProduct, config)
          .then(res => {
            title = res.data.data.title;
            this.setState({loading: false});
            let product;
            product = {
              title: title,
              brand: data.brand,
              parameters: parameters,
            };

            const orderProduct = {
              key: key,
              amount: order.amount,
              status: order.status,
              price: order.price,
              cargoCompany: order.cargoCompany,
              shipmentPrice: order.shipmentPrice,
              address: order.shippingAddress,
              payment: order.creditCard,
              customer: customer,
              product: order.productId,
              title: title,
              brand: data.brand,
              parameters: parameters,
              mainOrderID: mainOrderID,
              orderID: orderID,
            }

            // list only inactive orders
            if(orderProduct.status === "returned" || orderProduct.status === "cancelled by the customer" || orderProduct.status === "delivered")
              this.setState({
                orders: [...this.state.orders, orderProduct],
              });
          })
          .catch(err => {
            console.log(err);
          })

      })
      .catch(error => {
        console.log(error);
      });
  }

  render(){
    const columns = [
      {
        title: "Product Name",
        dataIndex: "title",
        key: "title",
      },
      {
        title: "Customer ID",
        dataIndex: "customer",
        key: "customer",
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.customer - b.customer,
      },
      {
        title: "Parameters",
        dataIndex: "parameters",
        key: "parameters",
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
      },
      {
        title: "Cargo Company",
        dataIndex: "cargoCompany",
        key: "cargoCompany",
      },
      {
        title: "Shipment Price",
        dataIndex: "shipmentPrice",
        key: "shipmentPrice",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        onFilter: (value, record) => record.status.indexOf(value) === 0,
        sorter: (a, b) => a.status.length - b.status.length,
        sortDirections: ['descend', 'ascend'],
      },
    ];

    const data = this.state.orders;
    return (
      <div>
        <Table
          dataSource={data}
          loading={this.state.loading}
          columns={columns}
        />
      </div>
    );
  }
}

export default InactiveOrders;