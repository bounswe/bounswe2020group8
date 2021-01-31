import { Dropdown } from "antd";
import classes from "./DropdownContainer.module.css";

export default function DropdownContainer({ list, icon, title }) {
  return (
    <Dropdown
      className={classes.DropdownContainer}
      placement="bottomCenter"
      overlay={list}
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {icon || null}
        <div>{title}</div>
      </a>
    </Dropdown>
  );
}
