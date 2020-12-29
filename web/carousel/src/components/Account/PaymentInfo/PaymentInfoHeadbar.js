import classes from "./PaymentInfoHeadbar.module.css";

import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";

const PaymentInfoHeadbar = (props) => {
  return (
    <div className={classes.Headbar}>
      <span style={{ fontSize: "xx-large" }}>My Saved Credit Cards</span>
      <ButtonPrimary
        style={{ width: 140, height: 45 }}
        title="Add Credit Card"
        onClick={() => {
          props.setModal({ visible: true });
        }}
      />
    </div>
  );
};

export default PaymentInfoHeadbar;
