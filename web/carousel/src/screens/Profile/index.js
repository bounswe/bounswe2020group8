import React, { Component } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  ShoppingOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
  NotificationOutlined,
  CommentOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class PROFILE extends Component {
  renderSideBar() {
    return (
      <Sider className="site-layout-background" width={250}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
        >
          <SubMenu key="sub1" icon={<UserOutlined />} title="My Account">
            <Menu.Item key="1">Profile</Menu.Item>
            <Menu.Item key="2">Address Info</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ShoppingOutlined />} title="My Order">
            <Menu.Item key="5">Active Orders</Menu.Item>
            <Menu.Item key="6">Inactive Orders</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<HeartOutlined />} title="My Lists">
            <Menu.Item key="8">All Lists</Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" icon={<ShoppingCartOutlined />} title="My Cart">
            <Menu.Item key="9">option9</Menu.Item>
          </SubMenu>
          <SubMenu key="sub5" icon={<CommentOutlined />} title="My Feedbacks">
            <Menu.Item key="10">Comments</Menu.Item>
            <Menu.Item key="11">Rates</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub6"
            icon={<NotificationOutlined />}
            title="My Recommendations"
          >
            <Menu.Item key="12">New Recommendations</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
  renderContent() {
    return (
      <Content style={{ padding: "0 24px", minHeight: 280 }}>Content</Content>
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
