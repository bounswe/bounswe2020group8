import classes from "./PaymentInfo.module.css";

import { DeleteOutlined } from "@ant-design/icons";
import Cards from "react-credit-cards";
import handleSubmit from "../../UI/ConfirmPopup/ConfirmPopup";

const PaymentInfo = (props) => {
  const handleDelete = () => {
    console.log(`Delete Credit Card: ${JSON.stringify(props.creditCard)}`);
  };

  return (
    <div className={classes.PaymentInfoBox}>
      <div className={classes.Card}>
        <Cards
          cvc={props.creditCard.cvc}
          expiry={props.creditCard.expiry}
          name={props.creditCard.name}
          number={props.creditCard.cardNumber}
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
