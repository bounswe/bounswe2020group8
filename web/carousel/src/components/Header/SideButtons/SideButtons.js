import React, { Component } from "react";
import classes from "./SideButtons.module.css";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import DropdownContainer from "../../DropdownContainer/DropdownContainer";
import {
  BookOutlined,
  UserOutlined,
  HeartOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  CommentOutlined,
  NotificationOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../../redux/auth/actions";
import { useGoogleLogout } from "react-google-login";

function SideButtons(props) {
  const clientId =
    "1005866627235-pkltkjsfn593b70jaeqs8bo841dgtob3.apps.googleusercontent.com";

  const onLogoutSuccess = (res) => {
    props.signOut();
    console.log("Logged out Success");
  };

  const onFailure = () => {
    console.log("Handle failure cases");
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const profileMenu = (
    <Menu>
      <Menu.Item>
        <Link to="/account/profile">
          <UserOutlined />
          My Profile
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/account/active-order">
          <ShoppingOutlined />
          My Order
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/account/comments">
          <CommentOutlined />
          My Feedbacks
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/account/recommendation">
          <NotificationOutlined />
          New Recommendations
        </Link>
      </Menu.Item>
      <Menu.Item key="Logout" onClick={signOut}>
        <Link to="/">
          <LogoutOutlined />
          Log out
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={classes.SideButtons}>
      {props.isSignedIn ? (
        <DropdownContainer
          title={"ACCOUNT"}
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
      <ButtonPrimary
        icon={<HeartOutlined />}
        title={"LIST"}
        onClick={() => props.history.push("/account/list")}
      />
      <ButtonPrimary
        icon={<ShoppingCartOutlined />}
        title={"CART"}
        onClick={() => props.history.push("/account/cart")}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default withRouter(connect(mapStateToProps, { signOut })(SideButtons));
