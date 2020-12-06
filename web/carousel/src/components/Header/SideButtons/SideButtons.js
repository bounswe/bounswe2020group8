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
import { signIn, signOut } from "../../../redux/auth/actions";

class SideButtons extends Component {
  profileMenu() {
    return (
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
        <Menu.Item key="Logout" onClick={() => this.handleLogoutClicked()}>
          <Link to="/">
            <LogoutOutlined />
            Log out
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
  handleLogoutClicked() {
    this.props.signOut();
  }

  render() {
    return (
      <div className={classes.SideButtons}>
        {this.props.isSignedIn ? (
          <DropdownContainer
            title={"ACCOUNT"}
            icon={<UserOutlined />}
            list={this.profileMenu()}
          />
        ) : (
          <ButtonSecondary
            title={"LOGIN"}
            icon={<BookOutlined />}
            onClick={() => this.props.history.push("/login")}
          ></ButtonSecondary>
        )}
        <ButtonPrimary
          icon={<HeartOutlined />}
          title={"LIST"}
          onClick={() => this.props.history.push("/account/list")}
        />
        <ButtonPrimary
          icon={<ShoppingCartOutlined />}
          title={"CART"}
          onClick={() => this.props.history.push("/account/cart")}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default withRouter(
  connect(mapStateToProps, { signIn, signOut })(SideButtons)
);
