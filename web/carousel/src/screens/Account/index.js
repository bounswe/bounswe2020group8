import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  NotificationOutlined,
  GiftOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { Link, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import Address from "./Address";
import Recommendation from "./Recommendation";
import ActiveOrder from "./ActiveOrder";
import InactiveOrder from "./InactiveOrder";
import List from "./List";
import Cart from "./Cart";
import Comments from "./Comments";
import Rate from "./Rate";
import PaymentInfo from "./PaymentInfo";
import { withRouter } from "react-router";
import UserInfo from "../../components/Context/UserInfo";
import AllProducts from "./AllProduct";
import NewProduct from "./NewProduct";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class Account extends Component {
  static contextType = UserInfo;

  renderCustomerSideBar() {
    const { location } = this.props;
    const path = location.pathname.split("/");

    const submenukeys = {
      profile: "/profile",
      address: "/profile",
      payment: "/profile",
      "active-order": "/order",
      "inactive-order": "/order",
      comments: "/comments",
      rate: "/comments",
    };

    return (
      <Sider className="site-layout-background" width={250}>
        <Menu
          mode="inline"
          selectedKeys={[path[2]]}
          defaultOpenKeys={[submenukeys[path[2]]]}
          style={{ height: "100%" }}
        >
          <SubMenu key="/profile" icon={<UserOutlined />} title="My Profile">
            <Menu.Item key="profile">
              <Link to="/account/profile">Profile Info</Link>
            </Menu.Item>
            <Menu.Item key="address">
              <Link to="/account/address">Address Info</Link>
            </Menu.Item>
            <Menu.Item key="payment">
              <Link to="/account/payment">Payment Info</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="/order" icon={<ShoppingOutlined />} title="My Order">
            <Menu.Item key="active-order">
              <Link to="/account/active-order">Active Orders</Link>
            </Menu.Item>
            <Menu.Item key="inactive-order">
              <Link to="/account/inactive-order">Inactive Orders</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item icon={<HeartOutlined />} key="list">
            <Link to="/account/list">All Lists</Link>
          </Menu.Item>

          <Menu.Item icon={<ShoppingCartOutlined />} key="cart">
            <Link to="/account/cart">My Cart</Link>
          </Menu.Item>

          <SubMenu
            key="/comments"
            icon={<CommentOutlined />}
            title="My Feedbacks"
          >
            <Menu.Item key="comments">
              <Link to="/account/comments">Comments</Link>
            </Menu.Item>
            <Menu.Item key="rate">
              <Link to="/account/rate">Rates</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item icon={<NotificationOutlined />} key="recommendation">
            <Link to="/account/recommendation">New Recommendations</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }

  renderVendorSideBar() {
    const { location } = this.props;
    const path = location.pathname.split("/");

    const submenukeys = {
      profile: "/profile",
      address: "/profile",
      "all-products": "/products",
      "new-product": "/products",
      "active-order": "/order",
      "inactive-order": "/order",
      comments: "/comments",
      rate: "/comments",
    };

    return (
      <Sider className="site-layout-background" width={250}>
        <Menu
          mode="inline"
          selectedKeys={[path[2]]}
          defaultOpenKeys={[submenukeys[path[2]]]}
          style={{ height: "100%" }}
        >
          <SubMenu key="/profile" icon={<UserOutlined />} title="My Profile">
            <Menu.Item key="profile">
              <Link to="/account/profile">Profile Info</Link>
            </Menu.Item>
            <Menu.Item key="address">
              <Link to="/account/address">Address Info</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="/products" icon={<GiftOutlined />} title="My products">
            <Menu.Item key="all-products">
              <Link to="/account/all-products">All products</Link>
            </Menu.Item>
            <Menu.Item key="new-product">
              <Link to="/account/new-product">Create new product</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu key="/order" icon={<ShoppingOutlined />} title="My Order">
            <Menu.Item key="active-order">
              <Link to="/account/active-order">Active Orders</Link>
            </Menu.Item>
            <Menu.Item key="inactive-order">
              <Link to="/account/inactive-order">Inactive Orders</Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            key="/comments"
            icon={<CommentOutlined />}
            title="My Feedbacks"
          >
            <Menu.Item key="comments">
              <Link to="/account/comments">Comments</Link>
            </Menu.Item>
            <Menu.Item key="rate">
              <Link to="/account/rate">Rates</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }

  renderContent() {
    return (
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Switch>
          <Route path="/account" exact component={Profile} />
          <Route path="/account/profile" exact component={Profile} />
          <Route path="/account/address" exact component={Address} />
          <Route path="/account/payment" exact component={PaymentInfo} />
          <Route path="/account/active-order" exact component={ActiveOrder} />
          <Route
            path="/account/inactive-order"
            exact
            component={InactiveOrder}
          />
          <Route path="/account/list" exact component={List} />
          <Route path="/account/cart" exact component={Cart} />
          <Route path="/account/all-products" exact component={AllProducts} />
          <Route path="/account/new-product" exact component={NewProduct} />
          <Route path="/account/comments" exact component={Comments} />
          <Route path="/account/rate" exact component={Rate} />
          <Route
            path="/account/recommendation"
            exact
            component={Recommendation}
          />
        </Switch>
      </Content>
    );
  }

  renderCustomerAccount() {
    return (
      <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
        {this.renderCustomerSideBar()}
        {this.renderContent()}
      </Layout>
    );
  }

  renderVendorAccount() {
    return (
      <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
        {this.renderVendorSideBar()}
        {this.renderContent()}
      </Layout>
    );
  }

  render() {
    console.log(this.context);
    return (
      <div>
        <Layout>
          <Content style={{ padding: "0 50px", zIndex: 10 }}>
            {this.renderCustomerAccount()}
          </Content>
        </Layout>
      </div>
    );
  }
}

export default withRouter(Account);
