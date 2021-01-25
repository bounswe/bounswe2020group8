import React from "react";
import {Button, Form, Input} from "antd";
import ButtonPrimary from "../UI/ButtonPrimary/ButtonPrimary";
import classes from "./Order.module.css";

const { TextArea } = Input;

const OrderGuest = (props) => {
  const [form] = Form.useForm();

  let component;

  if (props.process === 0) {
    // Email info form
    component =
      (
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size="middle"
            form={form}
            onFinish={props.setGuestEmail}
          >
            <Form.Item
              name="formName"
              label="Email Form"
            >
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter your email to we can send you your order information!",
                },
              ]}
            >
              <Input placeholder="your@email.com" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
  } else if (props.process === 1) {
    // Address information form
    component =
      (
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size="middle"
            form={form}
            onFinish={props.setGuestAddress}
          >
            <Form.Item
              name="formName"
              label="Address Form"
            >
            </Form.Item>
            <Form.Item
              name="addressName"
              label="Address Name"
              initialValue="Guest Address"
              rules={[
                {
                  required: true,
                  message: "Please input the title of the address!",
                },
              ]}
            >
              <Input placeholder="Enter Title of the Address" disabled/>
            </Form.Item>

            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input name!",
                },
              ]}
            >
              <Input placeholder="Enter the Name" />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              rules={[
                {
                  required: true,
                  message: "Please input city!",
                },
              ]}
            >
              <Input placeholder="Enter the city" />
            </Form.Item>
            <Form.Item
              name="state"
              label="State"
              rules={[
                {
                  required: true,
                  message: "Please input state!",
                },
              ]}
            >
              <Input placeholder="Enter the state" />
            </Form.Item>
            <Form.Item
              name="zipCode"
              label="ZIP Code"
              rules={[
                {
                  required: true,
                  message: "Please input the ZIP Code!",
                },
              ]}
            >
              <Input placeholder="Enter the state" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input an valid phone number",
                },
              ]}
            >
              <Input placeholder="Enter the phone number" />
            </Form.Item>

            <Form.Item
              name="addressLine"
              label="Address Line"
              rules={[
                {
                  required: true,
                  message: "Please input the Address Details!",
                },
              ]}
            >
              <TextArea placeholder="Enter the details of the address" />
            </Form.Item>
            <Form.Item
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
  } else if (props.process === 2) {
    // Credit Cart information form
    component =
      (
        <div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            size="middle"
            form={form}
            onFinish={props.setGuestCreditCart}
          >
            <Form.Item
              name="paymentForm"
              label="Payment Information"
            >
            </Form.Item>

            <Form.Item
              name="creditCardNumber"
              label="Credit Cart Number"
              rules={[
                {
                  required: true,
                  message: "Please input caart number!",
                },
              ]}
            >
              <Input placeholder="1234567812345678" />
            </Form.Item>
            <Form.Item
              name="creditCardData"
              label="Expiration Date"
              rules={[
                {
                  required: true,
                  message: "Please input expiration date!",
                },
              ]}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>
            <Form.Item
              name="creditCardName"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input name on the cart!",
                },
              ]}
            >
              <Input placeholder="Name Surname" />
            </Form.Item>
            <Form.Item
              name="creditCardCvc"
              label="CVC"
              rules={[
                {
                  required: true,
                  message: "Please input CVC!",
                },
              ]}
            >
              <Input placeholder="***" />
            </Form.Item>

            <Form.Item
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )
  } else if (props.process === 3) {
    component =
      (
        <div>
          You don't have to enter your information every purchase when you sign up to our site!
        </div>
      );
  } else if (props.process === 4) {
    component =
      (
        <div>
          <p>You can track your order with the code below:</p>
          <strong>{props.orderInformation}</strong>
        </div>
      )
  }

  return (
    <div>

      {/*Purchase Process Indicator*/}
      {props.process < 4 ?
        <div style={{height: "40px", width: "720px", margin: "auto", display: "flex"}}>
          <div
            className={props.process > 0 ? classes.OrderProcessFirstDone : classes.OrderProcessFirst}
            style={props.process === 0 ? {backgroundColor: "#FFBC84"} : {}}
          />
          <div className={props.process > 0 ? classes.OrderStepDone : classes.OrderStep} stlye={{marginLeft: "-20px"}}>
            1
          </div>
          <div
            className={props.process > 1 ? classes.OrderProcessSecondDone : classes.OrderProcessSecond}
            style={props.process === 1 ? {backgroundColor: "#FFBC84"} : {}}
          />
          <div className={props.process > 1 ? classes.OrderStepDone : classes.OrderStep} stlye={{marginLeft: "-20px"}}>
            2
          </div>
          <div
            className={props.process > 2 ? classes.OrderProcessThirdDone : classes.OrderProcessThird}
            style={props.process === 2 ? {backgroundColor: "#FFBC84"} : {}}
          />
          <div className={props.process > 2 ? classes.OrderStepDone : classes.OrderStep} stlye={{marginLeft: "-20px"}}>
            3
          </div>
        </div>
        :
        null
      }

      {component}
    </div>
  );
}

export default OrderGuest;