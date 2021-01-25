import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  BookOutlined,
  PauseOutlined,
  UsergroupDeleteOutlined,
  FileSearchOutlined,
  FolderOutlined,
  FormOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link, Route, Switch } from "react-router-dom";
import Profile from "./Profile";
import SearchProducts from "./SearchProducts";
import Categories from "./Categories";
import PendingProducts from "./PendingProducts";
import UserAccounts from "./UserAccounts";
import MainProducts from "../../components/Admin/MainProducts/MainProducts";
import OpenTickets from "../../components/Admin/Tickets/OpenTickets";
import ClosedTickets from "../../components/Admin/Tickets/ClosedTickets";
import UnassignedTickets from "../../components/Admin/Tickets/UnassignedTickets";
import Activities from "./Activities";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class AdminAccount extends Component {
  renderSideBar() {
    const { location } = this.props;
    const path = location.pathname.split("/");

    const submenukeys = {
      "pending-products": "/products",
      products: "/products",
      "main-products": "/products",
    };

    return (
      <Sider className="site-layout-background" width={250}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[path[2]]}
          defaultOpenKeys={[submenukeys[path[2]]]}
          style={{ height: "100%" }}
        >
          <Menu.Item icon={<UserOutlined />} key="profile">
            <Link to="/admin/profile">Admin Profile</Link>
          </Menu.Item>

          <SubMenu key="/products" icon={<ShoppingOutlined />} title="Products">
            <Menu.Item key="pending-products" icon={<PauseOutlined />}>
              <Link to="/admin/pending-products">Product Requests</Link>
            </Menu.Item>
            <Menu.Item key="products" icon={<FileSearchOutlined />}>
              <Link to="/admin/products">Available Products</Link>
            </Menu.Item>
            <Menu.Item key="main-products" icon={<FolderOutlined />}>
              <Link to="/admin/main-products">Main Products</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item icon={<BookOutlined />} key="categories">
            <Link to="/admin/categories">Categories</Link>
          </Menu.Item>

          <Menu.Item icon={<UsergroupDeleteOutlined />} key="accounts">
            <Link to="/admin/accounts">User Accounts</Link>
          </Menu.Item>

          <SubMenu key="/tickets" icon={<FormOutlined />} title="Tickets">
            <Menu.Item key="unassigned-tickets">
              <Link to="/admin/unassigned-tickets">Unassigned Tickets</Link>
            </Menu.Item>
            <Menu.Item key="open-tickets">
              <Link to="/admin/open-tickets">Open Tickets</Link>
            </Menu.Item>
            <Menu.Item key="closed-tickets">
              <Link to="/admin/closed-tickets">Closed Tickets</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item icon={<TeamOutlined />} key="activities">
            <Link to="/admin/activities">Activities</Link>
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
          <Route
            path="/admin/pending-products"
            exact
            component={PendingProducts}
          />
          <Route path="/admin/categories" exact component={Categories} />
          <Route path="/admin/products" exact component={SearchProducts} />
          <Route path="/admin/main-products" exact component={MainProducts} />
          <Route path="/admin/accounts" exact component={UserAccounts} />
          <Route path="/admin/open-tickets" exact component={OpenTickets} />
          <Route path="/admin/closed-tickets" exact component={ClosedTickets} />
          <Route
            path="/admin/unassigned-tickets"
            exact
            component={UnassignedTickets}
          />
          <Route path="/admin/activities" exact component={Activities} />
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
