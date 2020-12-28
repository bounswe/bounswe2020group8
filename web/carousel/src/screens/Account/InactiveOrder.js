import React, { useState } from "react";
import { Layout, Divider, Badge } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";
import Image from "react-image-resizer";
import { DeleteOutlined } from "@ant-design/icons";
import { HeartOutlined } from "@ant-design/icons";
import { useHistory, withRouter } from "react-router-dom";
// import OrderDiv from "../../components/UI/OrderDiv/OrderDiv";
// import classes from "../../components/UI/OrderDiv/OrderDiv.module.css";

const { Content } = Layout;
const orders = {
  order1: [
    {
      imageUrl:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16touch-space-select-201911_GEO_TR?wid=892&hei=820&&qlt=80&.v=1582326712648",
      name: "Macbook Pro 16 inch",
      price: 2199.99,
      vendorName: "AA",
    },
  ],
  order2: [
    {
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/41GGPRqTZtL._AC_.jpg",
      name: "PlayStation 4 Pro 1TB",
      price: 399.99,
      vendorName: "AA",
    },
    {
      imageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/61nziNd634L._AC_SX679_.jpg",
      name: "Sewatshirt",
      price: 99.99,
      vendorName: "BB",
    },
  ],
};

const InactiveOrder = () => {
  const history = useHistory();

  function OrderContent(productList = []) {
    return (
      <div style={{ fontSize: 24, fontWeight: "bold", color: "#d33a09" }}>
        My Inactive Orders
        {Object.values(orders).map((order, index) => {
          console.log(order);
          const divSize = order.length;
          return (
            <div>
              <div style={{ border: "1px solid black", paddingLeft: "10px" }}>
                Order {index + 1}
                {order.map((product) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      border: "none",
                    }}
                  >
                    {/*<Badge.Ribbon text={<HeartOutlined />} />*/}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 20,
                        height: 100,
                        color: "navy",
                      }}
                    >
                      <div>
                        <Image height={70} width={70} src={product.imageUrl} />
                      </div>
                      <div style={{ fontWeight: "normal" }}>
                        <div style={{ fontSize: 16 }}>{product.name}</div>
                        <div style={{ fontSize: 12 }}>
                          Vendor: {product.vendorName}
                        </div>
                      </div>
                      <div style={{ fontWeight: "normal" }}>
                        <div style={{ fontSize: 16 }}>Delivered At:</div>
                        <div style={{ fontSize: 12 }}>22.09.2020</div>
                      </div>
                      <div>
                        <div>{product.price}$</div>
                      </div>
                    </div>
                    <Divider />
                  </div>
                ))}
              </div>
              <div style={{ height: "10px" }} />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Layout>
      <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
        <Content
          style={{
            padding: "0 24px",
            minHeight: 280,
          }}
        >
          {OrderContent(orders)}
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(InactiveOrder);
