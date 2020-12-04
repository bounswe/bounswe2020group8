import React from "react";
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
      <Menu.Item key="Logout" onClick={signOut}>
        <LogoutOutlined />
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={classes.SideButtons}>
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
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default withRouter(connect(mapStateToProps, { signOut })(SideButtons));
