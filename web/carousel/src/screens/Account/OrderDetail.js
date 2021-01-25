import React, { Component } from "react";
import { Divider, Steps } from "antd";
import services from "../../apis/services";
import ProductBox from "../../components/Product/ProductBox";
import Cards from "react-credit-cards";
import { withRouter } from "react-router-dom";

const { Step } = Steps;

class OrderDetail extends Component {
  state = {
    id: "",
    order: null,
    address: null,
    payment: null,
    shipmentPrice: 0,
    totalPrice: 0,
  };
  stepStatus = {
    "being prepared": 1,
    "on the way": 2,
    delievered: 3,
    "cancelled by the customer": 0,
    "cancelled by the vendor": 0,
  };

  async componentDidMount() {
    const { location } = this.props;
    const path = location.pathname.split("/");

    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const URL = "/customer/order/main";
    const id = path[3];
    const response = await services.get(URL, config);
    if (response) {
      let order = response.data.data;
      if (order) {
        order = order.filter((item) => item._id === id);
        order = order[0].orders;
        let shipmentPrice = 0;
        let price = 0;
        order.map(
          (product) => (
            (shipmentPrice += product.shipmentPrice),
            (price += product.price * product.amount)
          )
        );
        this.setState({
          id: id,
          order: order,
          address: order[0].shippingAddress,
          payment: order[0].creditCard,
          price: price,
          shipmentPrice: shipmentPrice,
          totalPrice: price + shipmentPrice,
          status: order[0].status,
        });
      }
    }
  }

  renderAddressBox() {
    if (this.state.address) {
      return (
        <div
          style={{
            width: "50%",
            marginRight: 10,
            border: "2px solid #e2e2e2",
            borderRadius: 3,
            minHeight: 200,
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 40,
              borderRadius: 3,
              alignItems: "center",
              padding: "0 20px",
              backgroundColor: "#fff8f0",
              fontSize: 16,
              fontWeight: "bold",
              color: "#d33a09",
            }}
          >
            Address Information
          </div>
          <div
            style={{
              padding: 20,
              display: "flex",
              flexDirection: "column",
              fontSize: 18,
            }}
          >
            <div style={{ fontWeight: "bold" }}>{this.state.address.name}</div>
            <div>
              {this.state.address.addressName}
              <div>
                {this.state.address.addressLine} Zip Code:
                {this.state.address.zipCode}
              </div>
              <div>
                {this.state.address.city} / {this.state.address.state}
              </div>
            </div>
            <div>Phone Number: +90 {this.state.address.phone}</div>
          </div>
        </div>
      );
    }
  }

  renderPaymentBox() {
    if (this.state.payment) {
      return (
        <div
          style={{
            width: "50%",
            marginLeft: 10,
            border: "2px solid #e2e2e2",
            borderRadius: 3,
            height: "max-content",
            minHeight: 200,
            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: 40,
              borderRadius: 3,
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 20px",
              backgroundColor: "#fff8f0",
              fontSize: 16,
              fontWeight: "bold",
              color: "#d33a09",
            }}
          >
            Payment Information
          </div>
          <div
            style={{
              padding: 20,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: 300,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>Price</div>
                <div>${this.state.price}</div>
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>ShipmentPrice</div>
                <div>${this.state.shipmentPrice}</div>
              </div>
              <Divider />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <div>Total Price</div>
                <div>${this.state.totalPrice}</div>
              </div>
              <Divider />
            </div>
            <div>
              <Cards
                cvc={this.state.payment.creditCardCvc}
                expiry={this.state.payment.creditCardData}
                name={this.state.payment.creditCardName}
                number={
                  "************" +
                  this.state.payment.creditCardNumber.slice(
                    this.state.payment.creditCardNumber.length - 4
                  )
                }
                preview={true}
                issuer={
                  this.state.payment.creditCardNumber[0] === "4"
                    ? "visa"
                    : this.state.payment.creditCardNumber[0] === "5"
                    ? "mastercard"
                    : ""
                }
              />
            </div>
          </div>
        </div>
      );
    }
  }

  handleReturnClicked(_id, status) {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    const payload = {
      mainOrderID: this.state.id,
      orderID: _id,
      status: status,
    };
    const URL = "/customer/order/main/";
    services
      .patch(URL, payload, config)
      .then((response) => {
        this.props.history.push("/account/inactive-order");
      })
      .catch((err) => console.log(err));
  }

  renderDetails() {
    if (this.state.order) {
      return (
        <div>
          <div
            style={{
              borderRadius: 3,
              backgroundColor: "#fff8f0",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0 20px 0 15px",
              height: 60,
              fontSize: 16,
              fontWeight: "bold",
              color: "#d33a09",
            }}
          >
            <div>Details</div>
          </div>
          <div
            style={{
              padding: "20px 20px 0 20px",
              minHeight: 200,
            }}
          >
            {this.state.order.map((product, index) => (
              <>
                <div style={{ padding: "15px 20px" }}>
                  <Steps
                    current={this.stepStatus[product.status]}
                    status={
                      this.stepStatus[product.status] ? "process" : "error"
                    }
                  >
                    <Step title="Order Received" />
                    <Step title="Being Prepared" />
                    <Step title="On the Way" />
                    <Step title="Delievered" />
                  </Steps>
                </div>
                <ProductBox
                  product={product}
                  orderDetail
                  status={product.status}
                  handleReturnClicked={(status) =>
                    this.handleReturnClicked(product._id, status)
                  }
                />
              </>
            ))}
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div style={{ fontSize: 24, fontWeight: "bold", color: "#d33a09" }}>
          Order Details
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {this.renderAddressBox()}
          {this.renderPaymentBox()}
        </div>
        <div
          style={{
            marginTop: 15,
            borderRadius: 3,
            border: "2px solid #e2e2e2",
            backgroundColor: "white",
          }}
        >
          {this.renderDetails()}
        </div>
      </div>
    );
  }
}

export default withRouter(OrderDetail);
