import classes from "./AddressHeadbar.module.css";

import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";

const addressHeadbar = (props) => {
  return (
    <div className={classes.Headbar}>
      <span style={{ fontSize: "xx-large" }}>My Addresses</span>
      <ButtonPrimary
        style={{ width: 140, height: 45 }}
        title="Add New Address"
        onClick={() => {
          props.setModal({ visible: true, edit: false, address: {} });
        }}
      />
    </div>
  );
};

export default addressHeadbar;
