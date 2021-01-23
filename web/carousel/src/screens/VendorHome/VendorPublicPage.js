import React, { Component } from "react";
import { Layout, Spin } from "antd";
import SearchProduct from "../../components/ProductList/SearchProduct";
import services from "../../apis/services";
import HomepageProduct from "../../components/ProductList/HomepageProduct";

const { Content } = Layout;

export class VendorPublicPage extends Component {
  state = {
    productList: [],
    vendor: {},
    loading: false,
  };

  async componentDidMount() {
    const { location } = this.props;
    const path = location.pathname.split("/");

    const profileUrl = "/vendor/public/" + path?.[2];
    const response = await services.get(profileUrl);
    if (response) {
      this.setState({ vendor: response.data.data });
      const productUrl = "/product/search";
      const params = {
        vendors: path[2],
      };
      const r = await services.post(productUrl, null, { params: params });
      if (r) {
        this.setState({ productList: r.data.data });
        this.setState({ loading: true });
      }
    }
  }

  /*
    Displays vendors information. It contains two box which are Company Name box 
    and About Us box.
    In about us box. there are four fields;
      Company Name => name
      Contact Info => phone number and domain name, default value is "We will add soon!"
      Store Address => store address, default value is "We will add soon!"
      About Company => about field, default value is "Check our products!"
  */

  renderVendorInfo() {
    return (
      <div>
        <div
          style={{
            height: 60,
            border: "solid 1px #e2e2e2",
            backgroundColor: "#fbf0e5",
            borderRadius: 3,
            marginTop: 20,
            marginBottom: 20,
            padding: "0px 20 px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 20,
            color: "navy",
            fontWeight: "bold",
          }}
        >
          {this.state.vendor.companyName}
        </div>
        <div
          style={{
            borderRadius: 3,
            border: "solid 1px #e2e2e2",
            marginBottom: 20,
          }}
        >
          <div
            style={{
              height: 40,
              backgroundColor: "#fbf0e5",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: "0 20px 0 15px",
              fontSize: 16,
              color: "navy",
              fontWeight: "bold",
            }}
          >
            About Us
          </div>
          <div
            style={{
              padding: 20,
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>Company Name: {this.state.vendor.companyName}</div>
            <div>
              Contact Info:{" "}
              {(this.state.vendor.phoneNumber,
              this.state.vendor.companyDomainName) || "We will add soon!"}
            </div>
            <div>
              Our Store Address:{" "}
              {this.state.vendor.location || "We will add soon!"}
            </div>
            <div>{this.state.vendor.aboutCompany || "Check our products"}</div>
          </div>
        </div>
      </div>
    );
  }

  /* 
    Lists vendor's product as it is on the search page.
    If there is no product of the vendor, it writes "No Product"
  */

  renderProducts() {
    return this.state.productList.length ? (
      <Content
        style={{
          padding: "0 24px",
          minHeight: "280px",
          display: "grid",
          gridGap: "25px",
          gridTemplateColumns: "repeat(auto-fit, 250px)",
          justifyContent: "center",
        }}
      >
        {this.state.productList.map((product) => {
          return <HomepageProduct product={product} />;
        })}
      </Content>
    ) : (
      <Content
        style={{
          padding: "0 24px",
          minHeight: "280px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>No Product</div>
      </Content>
    );
  }

  render() {
    return (
      <div>
        <Layout>
          <Content style={{ padding: "0 150px", zIndex: 10 }}>
            <Layout
              className="site-layout-background"
              style={{ padding: "24px 0" }}
            >
              {this.state.loading ? (
                <div>
                  {this.renderVendorInfo()}
                  {this.renderProducts()}
                </div>
              ) : (
                <Spin size="large" />
              )}
            </Layout>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default VendorPublicPage;
