import React, { useState } from "react";
import services from "../../../apis/services";
import { Button, Form, Input, message, Steps } from "antd";
import classes from "../../Account/VendorAddProduct/AddProduct.module.css";
import OrderDetail from "../../../screens/Account/OrderDetail";
import ProductBox from "../../Product/ProductBox";

const { Step } = Steps;

const layout = {
  labelCol: { span: 14 },
  wrapperCol: { span: 28 },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
const OrderTrack = (props) => {
  const [showOrder, setShowOrder] = useState(false);
  const [order, setOrder] = useState({});

  const getOrder = (values) => {
    const trackNo = values.user.trackNo;
    const URL = "/guest/order/mainOrderId";
    const payload = {
      mainOrderID: trackNo,
    };
    services
      .post(URL, payload)
      .then((response) => {
        console.log(response);
        setOrder(response.data.data);
        setShowOrder(true);
      })
      .catch((error) => {
        console.log(error);
        message.warning("No order found for the given order track number!");
      });
  };

  let component;
  if (!showOrder) {
    component = (
      <div>
        <p style={{ fontSize: "14px", fontWeight: "bold" }}>
          Enter your order tracking number below
        </p>
        <Form
          {...layout}
          className={classes.myReset}
          name="dynamic_form_nest_item"
          onFinish={getOrder}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "trackNo"]}
            label="Order tracking number"
            rules={[{ required: true }]}
          >
            <Input placeholder="order track no" style={{ width: "300px" }} />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  } else {
    component = (
      <div>
        <OrderDetail guest={true} guestOrder={order} />
      </div>
    );
  }
  return <div>{component}</div>;
};
export default OrderTrack;
