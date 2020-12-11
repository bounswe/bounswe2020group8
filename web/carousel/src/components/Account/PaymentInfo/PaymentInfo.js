import classes from "./PaymentInfo.module.css";

import { DeleteOutlined } from "@ant-design/icons";
import Cards from "react-credit-cards";

const PaymentInfo = (props) => {
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
          console.log(
            `Delete Credit Card: ${JSON.stringify(props.creditCard)}`
          );
        }}
      >
        <DeleteOutlined />
      </div>
    </div>
  );
};

export default PaymentInfo;
