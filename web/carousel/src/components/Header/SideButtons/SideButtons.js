import React, { useContext } from "react";
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
  GiftOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../../redux/auth/actions";
import { useGoogleLogout } from "react-google-login";
import UserInfo from "../../Context/UserInfo";
import services from "../../../apis/services";

function SideButtons(props) {
  const clientId =
    "1005866627235-pkltkjsfn593b70jaeqs8bo841dgtob3.apps.googleusercontent.com";
  const user = useContext(UserInfo);

  const onLogoutSuccess = (res) => {
    let url = "";
    if (user.userType === "Customer") {
      url = "/customer/logout";
    } else if (user.userType === "Vendor") {
      url = "/vendor/logout";
    } else {
      return;
    }
    const token = localStorage.getItem("token");

    services
      .post(url, null, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        props.signOut();
        user.error = false;
        console.log("Logged out Success");
        props.history.push("/");
      })
      .catch((err, response) => {
        console.log(err);
        user.error = true;
      });
  };

  const onFailure = () => {
    console.log("components > Header > Sidebuttons");
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
      {user.userType === "Customer" ? (
        <Menu.Item>
          <Link to="/account/recommendation">
            <NotificationOutlined />
            New Recommendations
          </Link>
        </Menu.Item>
      ) : (
        <Menu.Item>
          <Link to="/account/all-products">
            <GiftOutlined />
            My Products
          </Link>
        </Menu.Item>
      )}

      <Menu.Item key="Logout" onClick={signOut}>
        <Link to="/">
          <LogoutOutlined />
          Log out
        </Link>
      </Menu.Item>
    </Menu>
  );

  const handleUrlClick = (path) => {
    if (props.isSignedIn) {
      props.history.push("/account/" + path);
    } else {
      props.history.push("/login");
    }
  };

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
        onClick={() => handleUrlClick("list")}
      />
      <ButtonPrimary
        icon={<ShoppingCartOutlined />}
        title={"CART"}
        onClick={() => handleUrlClick("cart")}
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
