import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  BookOutlined,
  PauseOutlined,
  UsergroupDeleteOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { Link, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import SearchProducts from "./SearchProducts";
import Categories from "./Categories";
import PendingProducts from "./PendingProducts";
import UserAccounts from "./UserAccounts";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class AdminAccount extends Component {
  renderSideBar() {
    return (
      <Sider className="site-layout-background" width={250}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
        >
          <Menu.Item icon={<UserOutlined />} key="1">
            <Link to="/admin/profile">Admin Profile</Link>
          </Menu.Item>

          <SubMenu key="sub2" icon={<ShoppingOutlined />} title="Products">
            <Menu.Item key="2" icon={<PauseOutlined />}>
              <Link to="/admin/pending-products">Pending Products</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<FileSearchOutlined/>}>
              <Link to="/admin/search-product">Search Product</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item icon={<BookOutlined />} key="4">
            <Link to="/admin/categories">Categories</Link>
          </Menu.Item>

          <Menu.Item icon={<UsergroupDeleteOutlined />} key="5">
            <Link to="/admin/accounts">User Accounts</Link>
          </Menu.Item>



        </Menu>
      </Sider>
    );
  }

  renderContent() {
    return (
      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        <Switch>
          <Route path="/admin" exact component={Profile} />
          <Route path="/admin/profile" exact component={Profile} />
          <Route path="/admin/pending-products" exact component={PendingProducts} />
          <Route path="/admin/categories" exact component={Categories} />
          <Route path="/admin/search-product" exact component={SearchProducts} />
          <Route path="/admin/accounts" exact component={UserAccounts} />
        </Switch>
      </Content>
    );
  }

  render() {
    return (
      <div>
        <Layout>
          <Content style={{ padding: "0 50px" }}>
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