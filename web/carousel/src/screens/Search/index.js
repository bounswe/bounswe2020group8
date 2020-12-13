import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router";

const { Content, Sider } = Layout;

class Search extends Component {
  renderSideBar() {
    return (
      <Sider className="site-layout-background" width={250}>
        <Menu mode="inline" style={{ height: "100%" }}>
          <Menu.Item>Menu 1</Menu.Item>
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

export default withRouter(Search);
