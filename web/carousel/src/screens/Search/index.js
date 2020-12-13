import React, { Component } from "react";
import { Layout, Menu } from "antd";
import { withRouter } from "react-router";

import SearchProduct from "../../components/ProductList/SearchProduct";

const { Content, Sider } = Layout;

class Search extends Component {
  state = {
    selectedFilters: [],
    productList: [
      {
        imageUrl:
          "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16touch-space-select-201911_GEO_TR?wid=892&hei=820&&qlt=80&.v=1582326712648",
        name: "Macbook Pro 16 inch",
        price: 2199.99,
        rate: "5",
        rateCount: 100,
      },
      {
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/41GGPRqTZtL._AC_.jpg",
        name: "PlayStation 4 Pro 1TB",
        price: 399.99,
        rate: "4",
        rateCount: 20,
      },
      {
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/418Ty89Cf3L._SX160_QL100_AC_SCLZZZZZZZ_.jpg",
        name: "Samsung Galaxy Tab S6 Lite 10.4",
        price: 249.99,
        rate: "3",
        rateCount: 32,
      },
      {
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/31DQ1NOBi4L._SX160_QL100_AC_SCLZZZZZZZ_.jpg",
        name: "Bose Noise Cancelling Wireless Bluetooth Headphones 700",
        price: 339.99,
        rate: "3.5",
        rateCount: 112,
      },
      {
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/51TVrxhgLaL._SX160_QL100_AC_SCLZZZZZZZ_.jpg",
        name: "Sony X800H 43 Inch TV",
        price: 448.99,
        rate: "4.5",
        rateCount: 102,
      },
      {
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/81fstJkUlaL._AC_SL1500_.jpg",
        name: "ASUS F512DA-EB51 VivoBook 15",
        price: 14.99,
        rate: "2.5",
        rateCount: 4,
      },
      {
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/71y%2BUGuJl5L._SL1500_.jpg",
        name: "DualSense Wireless Controller ",
        price: 69.99,
        rate: "1.5",
        rateCount: 123,
      },
      {
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/91S1PIX%2ByWL._AC_SL1500_.jpg",
        name: 'SAMSUNG 870 QVO SATA III 2.5" SSD',
        price: 199.99,
        rate: "4.5",
        rateCount: 120,
      },
      {
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/51N5qVjuKAL._SX309_BO1,204,203,200_.jpg",
        name: "To Kill a Mockingbird",
        price: 14.99,
        rate: "3.5",
        rateCount: 120,
      },
      {
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/61BhxjpQn6L._AC_SL1500_.jpg",
        name: "Arlo VMC2030-100NAS Essential Spotlight Camera",
        price: 99.99,
        rate: "5",
        rateCount: 101,
      },
      {
        imageUrl:
          "https://images-na.ssl-images-amazon.com/images/I/318TG3aNKpL._AC_US218_.jpg",
        name: "Introducing Fire TV Stick Lite with Alexa Voice Remote Lite",
        price: 18.99,
        rate: "4",
        rateCount: 111,
      },
    ],
  };

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
      <Content
        style={{
          padding: "0 24px",
          minHeight: "280px",
          width: "1000px",
          display: "grid",
          gridGap: "25px",
          gridTemplateColumns: "repeat(auto-fit, 350px)",
        }}
      >
        {this.state.productList.map((product) => {
          return (
            <span>
              <SearchProduct product={product} />;
            </span>
          );
        })}
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

export default withRouter(Search);
