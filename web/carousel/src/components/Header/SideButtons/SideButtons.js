import React, { useContext, useState, useEffect } from "react";
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
  GiftOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../../redux/auth/actions";
import { useGoogleLogout } from "react-google-login";
import UserInfo from "../../Context/UserInfo";
import services from "../../../apis/services";

export function SideButtons(props) {
  useEffect(() => {
    let guestID;
    const loggedIn = localStorage.getItem("login");
    if (loggedIn === "false") {
      const validateGuestID = localStorage.getItem("guestID");
      console.log(validateGuestID);
      if(validateGuestID !== null) {
        const params = {
          _id: validateGuestID,
        };
        services
          .get("/guest/shoppingCart/main", { params: {_id: validateGuestID} })
          .then(response => {
          })
          .catch(error => {
            console.log(error);
            getGuestUserID();
          });
      }
    }
  }, []);

  const getGuestUserID = () => {
    services.get("/guest/id")
      .then(response => {
        const id = response.data.data._id;
        localStorage.setItem("guestID", id);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const clientId =
    "1005866627235-pkltkjsfn593b70jaeqs8bo841dgtob3.apps.googleusercontent.com";
  const user = useContext(UserInfo);

  const [notificationCount, setNotificationCount] = useState(0);

  const getNotificationCount = async () => {
    if (user.userType === "Vendor" || user.userType === "Customer") {
      const TOKEN = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };
      const url = `/${user.userType.toLowerCase()}/notification/unread`;
      const resp = await services.get(url, config);
      setNotificationCount(resp.data.data.length);
    }
  };

  useEffect(async () => {
    getNotificationCount();
  }, []);

  setInterval(() => getNotificationCount(), 10000);

  const onLogoutSuccess = (res) => {
    let url = "";
    if (user.userType === "Customer") {
      url = "/customer/logout";
    } else if (user.userType === "Vendor") {
      url = "/vendor/logout";
    } else if (user.userType === "Admin") {
      alert("admin log out");
      url = "admin/logoutAdmin";
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
        localStorage.setItem("userType", "guest");
        localStorage.setItem("token", "");
        localStorage.setItem("login", "false");
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        user.setUserType("");
        props.history.push("/");
      })
      .catch((err, response) => {
        console.log(err);
        user.error = true;
      });
  };

  const onFailure = () => {};

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  const notificationMessage = notificationCount
    ? ` (${notificationCount})`
    : "";

  const profileMenu = (
    <Menu>
      {user.userType === "Customer" ? (
        <>
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
            <Link to="/account/tickets">
              <FormOutlined />
              My Tickets
            </Link>
          </Menu.Item>
          <Menu.Item key="notifications">
            <Link to="/account/notifications">
              <NotificationOutlined />
              Notifications{notificationMessage}
            </Link>
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item>
            <Link to="/vendor/account/profile">
              <UserOutlined />
              My Profile
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/vendor/account/products">
              <GiftOutlined />
              My Products
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/vendor/account/active-order">
              <ShoppingOutlined />
              My Order
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/vendor/account/comments">
              <CommentOutlined />
              My Feedbacks
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/vendor/account/tickets">
              <FormOutlined />
              My Tickets
            </Link>
          </Menu.Item>

          <Menu.Item key="notifications">
            <Link to="/vendor/account/notifications">
              <NotificationOutlined />
              Notifications{notificationMessage}
            </Link>
          </Menu.Item>
        </>
      )}

      <Menu.Item key="Logout" onClick={signOut}>
        <LogoutOutlined />
        Log out
      </Menu.Item>
    </Menu>
  );

  const handleUrlClick = (path) => {
    if (localStorage.getItem("login") === "true" || path === "cart") {
      props.history.push("/account/" + path);
    } else {
      props.history.push("/login");
    }
  };

  return (
    <div className={classes.SideButtons}>
      {localStorage.getItem("login") === "true" ? (
        <DropdownContainer
          title={"ACCOUNT" + notificationMessage}
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
      {user.userType !== "Vendor" ? (
        <div>
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
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default withRouter(connect(mapStateToProps, { signOut })(SideButtons));
