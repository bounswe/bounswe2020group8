import React from "react";
import { Layout, Menu, Divider } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";

const { Content, Sider } = Layout;
const x = "55$";

export default function Cart() {
  return (
    <Layout>
      <Content style={{ padding: "0 50px" }}></Content>
      <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>Content</Content>
        <Sider
          className="site-layout-background"
          width={250}
          style={{
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              padding: 10,
              width: 220,
              marginTop: 15,
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              PRICE
              <Divider style={{ width: 220 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 16 }}>Product price</div>
                <div style={{ fontSize: 16 }}>123.64</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 16 }}>Shipment price</div>
                <div style={{ fontSize: 16 }}>25.5 </div>
              </div>
              <Divider style={{ width: 220 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 16 }}>Total price</div>
                <div style={{ fontSize: 16 }}>165</div>
              </div>
            </div>
            <Divider style={{ width: 220 }} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ButtonPrimary
                title="Confirm"
                style={{ width: 150 }}
                onClick={() => console.log("clicked")}
              />
            </div>
          </div>
        </Sider>
      </Layout>
    </Layout>
  );
}
