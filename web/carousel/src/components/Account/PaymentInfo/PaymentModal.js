import { Form, Input, Select, Modal } from "antd";
import { Component } from "react";
import Cards from "react-credit-cards";

import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import classes from "./PaymentModal.module.css";

export default class PaymentModal extends Component {
  state = {
    cvc: "",
    expiry: "",
    focus: "",
    name: "",
    number: "",
  };

  handleFormSubmit = () => {
    console.log(
      `Add new credit card with values: ${JSON.stringify(this.state)}`
    );

    let issuer = "";

    if (this.state.number[0] === 4) {
      issuer = "visa";
    } else if (this.state.number[0] === 5) {
      issuer = "mastercard";
    }

    let creditCard = { ...this.state, issuer: issuer };
    delete creditCard.focus;

    this.props.setModal({ visible: false });
    this.props.handleAddCreditCard(creditCard);
  };

  handleCancel = () => {
    this.props.setModal({ visible: false });
  };

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "number" && value.length != 19) {
      this.setState({
        [name]: value
          .replace(/\W/gi, "")
          .replace(/(.{4})/g, "$1 ")
          .trim(),
      });
    } else if (name === "expiry") {
      this.setState({
        [name]: value
          .replace(/\W/gi, "")
          .replace(/(.{2})/g, "$1 ")
          .trim()
          .replace(/\W/, "/"),
      });
    } else {
      this.setState({ [name]: value });
    }
  };

  render() {
    const title = this.props.edit
      ? "Edit the Credit Card"
      : "Add a Credit Card";
    const creditCard = this.props.edit ? this.props.creditCard : {};

    return (
      <Modal
        title={title}
        centered
        visible={this.props.visible}
        footer={[
          <ButtonPrimary title={"Save"} onClick={this.handleFormSubmit} />,
        ]}
        onCancel={this.handleCancel}
      >
        <div id="PaymentForm">
          <Cards
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
          <form className={classes.Form}>
            <input
              className={classes.Input}
              type="text"
              name="name"
              placeholder="Card Holder's Name"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              className={classes.Input}
              type="text"
              name="number"
              placeholder="Card Number"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
              value={this.state.number}
              maxLength="19"
            />
            <input
              className={classes.Input}
              type="tel"
              name="cvc"
              placeholder="CVC"
              maxLength="3"
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            <input
              className={classes.Input}
              type="tel"
              name="expiry"
              maxLength="5"
              placeholder="Expire Date"
              value={this.state.expiry}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
          </form>
        </div>
      </Modal>
    );
  }
}
