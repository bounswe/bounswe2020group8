import classes from "./Address.module.css";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";

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
          +{props.address.phonePrefix}
          {props.address.phone}
        </p>
        <p>{props.address.details}</p>
      </div>
      <div className={classes.ButtonRow}>
        <DeleteOutlined />
        <EditOutlined onClick={handleEdit} />
      </div>
    </div>
  );
};

export default Address;
