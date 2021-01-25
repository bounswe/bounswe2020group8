import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  CommentOutlined,
  GiftOutlined,
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

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

class VendorAccount extends Component {
  static contextType = UserInfo;

  renderSideBar() {
    const { location } = this.props;
    const path = location.pathname.split("/");

    const submenukeys = {
      profile: "/profile",
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
              <Link to="/vendor/account/active">Active Orders</Link>
            </Menu.Item>
            <Menu.Item key="inactive-order">
              <Link to="/vendor/account/inactive-order">Inactive Orders</Link>
            </Menu.Item>
          </SubMenu>

          {/* <SubMenu
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
          </SubMenu> */}
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
          <Route path="/vendor/account/comments" exact component={Comments} />
          <Route path="/vendor/account/rate" exact component={Rate} />
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
