import React, { Component } from "react";
import { Divider } from "antd";

class OrderDetail extends Component {
  renderAddressBox() {
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
        <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
          Content
        </div>
      </div>
    );
  }

  renderPaymentBox() {
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
        <div style={{ padding: 20, display: "flex", flexDirection: "column" }}>
          Content
        </div>
      </div>
    );
  }

  renderDetails() {
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
          Details
        </div>
        <div style={{ padding: "20px 20px 0 20px", minHeight: 200 }}>
          Content
        </div>
      </div>
    );
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

export default OrderDetail;
