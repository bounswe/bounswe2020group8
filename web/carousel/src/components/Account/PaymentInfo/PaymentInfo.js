import classes from "./PaymentInfo.module.css";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import masterLogo from "../../../assets/images/paymentNetworks/master.png";
import visaLogo from "../../../assets/images/paymentNetworks/visa.png";
import Image from "react-image-resizer";
import Cards from "react-credit-cards";

const PaymentInfo = (props) => {
  let cardLogo = null;
  const cardNumber = props.creditCard.cardNumber;

  if (
    cardNumber[0] === "4" &&
    (cardNumber.length === 13 || cardNumber.length == 16)
  ) {
    cardLogo = visaLogo;
  } else if (cardNumber[0] === "5" && cardNumber.length == 16) {
    cardLogo = masterLogo;
  }

  return (
    <div className={classes.PaymentInfoBox}>
      <div className={classes.CreditCard}>
        <Cards
          cvc={props.creditCard.cvc}
          expiry={props.creditCard.expiry}
          name={props.creditCard.name}
          number={props.creditCard.cardNumber}
        />
      </div>
    </div>
  );
};

export default PaymentInfo;
