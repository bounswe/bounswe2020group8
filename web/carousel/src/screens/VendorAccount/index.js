import React, { Component } from "react";
import { Layout, Menu, message } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  CommentOutlined,
  GiftOutlined,
  FormOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { Link, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import ActiveOrder from "./ActiveOrder";
import InactiveOrder from "./InactiveOrder";
import Comments from "./Comments";
import Rate from "./Rate";
import { withRouter } from "react-router";
import UserInfo from "../../components/Context/UserInfo";
import Products from "./Products";
import AddProduct from "./AddProduct";
import ProductRequests from "./ProductsRequests";
import Tickets from "../Account/Tickets";
import VendorPublicPage from "../VendorHome/VendorPublicPage";
import Notifications from "../Account/Notifications";
import services from "../../apis/services";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class VendorAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationCount: 0,
    };
  }
  static contextType = UserInfo;
  async componentDidMount() {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const url = `/${this.context.userType.toLowerCase()}/notification/unread`;
    const resp = await services.get(url, config);
    this.setState({ notificationCount: resp.data.data.length });
  }

  renderSideBar() {
    const { location } = this.props;
    const path = location.pathname.split("/");
    const id = localStorage.getItem("id");
    if (!id) {
      message.error(
        "Somethings went wrong please check out the profile page first"
      );
      return;
    }

    const submenukeys = {
      profile: "/profile",
      public: "/profile",
      products: "/products",
      productRequests: "/products",
      addProduct: "/products",
      "active-order": "/order",
      "inactive-order": "/order",
      comments: "/comments",
      rate: "/comments",
    };

    return (
      <Sider className="site-layout-background" width={250}>
        <Menu
          mode="inline"
          selectedKeys={[path[3]]}
          defaultOpenKeys={[submenukeys[path[3]]]}
          style={{ height: "100%" }}
        >
          <SubMenu key="/profile" icon={<UserOutlined />} title="My Profile">
            <Menu.Item key="profile">
              <Link to="/vendor/account/profile">Profile Info</Link>
            </Menu.Item>
            <Menu.Item key="public">
              <Link to={`/v/public/${id}`}>Public Page</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="/products" icon={<GiftOutlined />} title="My Products">
            <Menu.Item key="products">
              <Link to="/vendor/account/products">My Products</Link>
            </Menu.Item>
            <Menu.Item key="productRequests">
              <Link to="/vendor/account/productRequests">
                My Products Requests
              </Link>
            </Menu.Item>
            <Menu.Item key="addProduct">
              <Link to="/vendor/account/addProduct">Add product</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="/order" icon={<ShoppingOutlined />} title="My Order">
            <Menu.Item key="active-order">
              <Link to="/vendor/account/active-order">Active Orders</Link>
            </Menu.Item>
            <Menu.Item key="inactive-order">
              <Link to="/vendor/account/inactive-order">Inactive Orders</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item>
            <Link to="/vendor/account/tickets">
              <FormOutlined />
              My Tickets
            </Link>
          </Menu.Item>
          <SubMenu
            key="/comments"
            icon={<CommentOutlined />}
            title="My Feedbacks"
          >
            <Menu.Item key="comments">
              <Link to="/vendor/account/comments">Comments</Link>
            </Menu.Item>
            <Menu.Item key="rate">
              <Link to="/vendor/account/rate">Rates</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item icon={<NotificationOutlined />} key="notifications">
            <Link to="/account/notifications">
              Notifications
              {this.state.notificationCount
                ? ` (${this.state.notificationCount})`
                : ""}
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

  renderContent() {
    return (
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Switch>
          <Route path="/vendor/account" exact component={Profile} />
          <Route path="/vendor/account/profile" exact component={Profile} />
          <Route
            path="/v/public/:vendorName"
            exact
            component={VendorPublicPage}
          />
          <Route path="/vendor/account/products" exact component={Products} />
          <Route
            path="/vendor/account/productRequests"
            exact
            component={ProductRequests}
          />
          <Route
            path="/vendor/account/addProduct"
            exact
            component={AddProduct}
          />
          <Route
            path="/vendor/account/active-order"
            exact
            component={ActiveOrder}
          />
          <Route
            path="/vendor/account/inactive-order"
            exact
            component={InactiveOrder}
          />
          <Route path="/vendor/account/tickets" exact component={Tickets} />
          <Route path="/vendor/account/comments" exact component={Comments} />
          <Route path="/vendor/account/rate" exact component={Rate} />
          <Route
            path="/account/notifications"
            exact
            component={Notifications}
          />
        </Switch>
      </Content>
    );
  }

  render() {
    return (
      <div>
        <Layout>
          <Content style={{ padding: "0 50px", zIndex: 10 }}>
            <Layout
              className="site-layout-background"
              style={{ padding: "24px 0" }}
            >
              {this.renderSideBar()}
              {this.renderContent()}
            </Layout>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default withRouter(VendorAccount);
