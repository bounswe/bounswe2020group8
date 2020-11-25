import React from "react";
import classes from "./SideButtons.module.css";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import LogoutButton from "../../LogoutButton";
import DropdownContainer from "../../DropdownContainer/DropdownContainer";
import {
  BookOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signIn, signOut } from "../../../redux/auth/actions";

const profileMenu = (
  <Menu>
    <Menu.Item>
      <Link to="/profile">
        <UserOutlined />
        My Profile
      </Link>
    </Menu.Item>
    <Menu.Item>
      <Link to="/profile">
        <ShoppingOutlined />
        My Order
      </Link>
    </Menu.Item>
    <Menu.Item key="Logout">
      <LogoutOutlined />
      Log out
    </Menu.Item>
  </Menu>
);

const sideButtons = (props) => {
  return (
    <div className={classes.SideButtons}>
      <LogoutButton></LogoutButton>
      {props.isSignedIn ? (
        <DropdownContainer
          title={"PROFILE"}
          icon={<UserOutlined />}
          list={profileMenu}
        />
      ) : (
        <ButtonSecondary
          title={"LOGIN"}
          icon={<BookOutlined />}
          onClick={() => props.history.push("/login")}
        ></ButtonSecondary>
      )}
      <ButtonPrimary icon={<HeartOutlined />} title={"LIST"} />
      <ButtonPrimary icon={<ShoppingCartOutlined />} title={"CART"} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default withRouter(
  connect(mapStateToProps, { signIn, signOut })(sideButtons)
);
