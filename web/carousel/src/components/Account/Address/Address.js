import classes from "./Address.module.css";

import handleSubmit from "../../UI/ConfirmPopup/ConfirmPopup";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Radio } from "antd";

const Address = (props) => {
  const handleEdit = () => {
    props.setModal({
      visible: true,
      edit: true,
      address: props.address,
    });
  };

  return (
    <div className={classes.AddressBox}>
      <div className={classes.Header}>
        {/* {props.isOrder ? (
          <Radio style={{ color: "white" }}>
            <b>{props.address.addressName}</b>
          </Radio> */}
        {/* ) : ( */}
        {props.isOrder ? (
          <>
            <input
              type="radio"
              name="orderAddress"
              value={props.address._id}
              onChange={props.onChangeValue}
            />{" "}
          </>
        ) : null}
        <b>{props.address.addressName}</b>
      </div>
      <div className={classes.Details}>
        <p>
          <b>{props.address.name}</b>
        </p>
        <p>{props.address.phone}</p>
        <p>
          {props.address.city}/{props.address.state}
        </p>
        <p>{props.address.addressLine}</p>
      </div>
      <div className={classes.ButtonRow}>
        <DeleteOutlined
          onClick={() =>
            handleSubmit("Are you sure to delete this address?", () =>
              props.handleDelete(props.address)
            )
          }
          style={{ fontSize: "20px" }}
        />
        <EditOutlined onClick={handleEdit} />
      </div>
    </div>
  );
};

export default Address;
