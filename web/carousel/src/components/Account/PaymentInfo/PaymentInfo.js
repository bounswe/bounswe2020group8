import classes from "./PaymentInfo.module.css";

import { DeleteOutlined } from "@ant-design/icons";
import Cards from "react-credit-cards";
import handleSubmit from "../../UI/ConfirmPopup/ConfirmPopup";

const PaymentInfo = (props) => {
  const handleDelete = () => {
    console.log(`Delete Credit Card: ${JSON.stringify(props.creditCard)}`);
    props.handleDelete(props.creditCard);
  };

  return (
    <div className={classes.PaymentInfoBox}>
      <div className={classes.Card}>
        <Cards
          cvc={props.creditCard.creditCardCvc}
          expiry={props.creditCard.creditCardData}
          name={props.creditCard.creditCardName}
          number={
            "************" +
            props.creditCard.creditCardNumber.slice(
              props.creditCard.creditCardNumber.length - 4
            )
          }
          preview={true}
          issuer={
            props.creditCard.creditCardNumber[0] === "4"
              ? "visa"
              : props.creditCard.creditCardNumber[0] === "5"
              ? "mastercard"
              : ""
          }
        />
      </div>
      <div
        className={classes.Delete}
        onClick={() => {
          handleSubmit(
            "Are you sure to delete this credit card?",
            handleDelete
          );
        }}
      >
        <DeleteOutlined />
      </div>
    </div>
  );
};

export default PaymentInfo;
