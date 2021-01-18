import React, { Component } from "react";
import { Layout } from "antd";
import SearchProduct from "../../components/ProductList/SearchProduct";

const { Content } = Layout;

export class VendorPublicPage extends Component {
  productList = [
    {
      matches: 1,
      maxPrice: 799.99,
      minPrice: 650,
      vendors: [
        {
          _id: "5fea4ff1d585002036b0fb28",
          companyName: "Teknosa",
        },
        {
          _id: "5fea6a12161e5428c3caa39e",
          companyName: "bilir",
        },
      ],
      mainProduct: [
        {
          _id: "5fea526bd585002036b0fb2e",
          title: "Iphone 10",
          rating: 0,
          numberOfRating: 0,
        },
      ],
      product: {
        _id: "5fea56e4d585002036b0fb38",
        photos: [
          "https://carouselbucket.s3.eu-central-1.amazonaws.com/452a48f2-dcc4-42b4-897d-863d80b7d591",
          "https://carouselbucket.s3.eu-central-1.amazonaws.com/2c490e01-9cd1-4cff-b337-8c4a28a33af5",
          "https://carouselbucket.s3.eu-central-1.amazonaws.com/c0e41112-9199-4f2b-87b8-7bdd1fc6417a",
        ],
      },
      mpid: "5fea526bd585002036b0fb2e",
      brand: "Apple",
      category: "electronics",
    },
  ];

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
          VendorName
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
            VendorInformation
          </div>
          <div style={{ padding: 20, backgroundColor: "white" }}>
            <div>Company Name</div>
            <div>Contact Info</div>
            <div>Our Store Address</div>
          </div>
        </div>
      </div>
    );
  }

  renderProducts() {
    return this.productList.length ? (
      <Content
        style={{
          padding: "0 24px",
          minHeight: "280px",
          width: "1200px",
          display: "grid",
          gridGap: "25px",
          gridTemplateColumns: "repeat(auto-fit, 350px)",
        }}
      >
        {this.productList.map((product) => {
          return (
            <span>
              <SearchProduct product={product} />;
            </span>
          );
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
        <div>No product</div>
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
              {this.renderVendorInfo()}
              {this.renderProducts()}
            </Layout>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default VendorPublicPage;
