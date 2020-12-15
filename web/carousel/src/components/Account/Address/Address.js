import classes from "./Address.module.css";

import handleSubmit from "../../UI/ConfirmPopup/ConfirmPopup";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

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
        <b>{props.address.title}</b>
      </div>
      <div className={classes.Details}>
        <p>
          <b>
            {props.address.firstName} {props.address.lastName}
          </b>
        </p>
        <p>
          +{props.address.prefix}
          {props.address.phone}
        </p>
        <p>{props.address.details}</p>
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
