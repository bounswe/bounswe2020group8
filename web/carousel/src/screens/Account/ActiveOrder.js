import React, { useState, useEffect } from "react";
import { Layout, Divider, Collapse } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";
import Image from "react-image-resizer";
import { DeleteOutlined } from "@ant-design/icons";
import { HeartOutlined } from "@ant-design/icons";
import { useHistory, withRouter } from "react-router-dom";
import services from "../../apis/services";
// import OrderDiv from "../../components/UI/OrderDiv/OrderDiv";
// import classes from "../../components/UI/OrderDiv/OrderDiv.module.css";

let ID = "";
const { Content } = Layout;
const { Panel } = Collapse;

const ActiveOrder = () => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const response = await services.get("/customer/me", config);
    if (response) {
      const data = response.data.data;
      ID = data._id;
    }
    const URL = "/customer/order/getByCustomerID";
    services
      .get(URL, { customerID: ID }, config)
      .then((response) => {
        if (response.data) {
          const newList = response.data;
          console.log("AA ~ .then ~ newList", newList);

          setOrders(newList);
        }
      })
      .catch((err) => console.log(err));
  };

  function OrderContent() {
    return (
      <div style={{ fontSize: 24, fontWeight: "bold", color: "#d33a09" }}>
        My Active Orders
        <Divider />
        <Collapse bordered={false} expandIconPosition="left">
          {orders.map((order) => {
            return <Panel />;
          })}
        </Collapse>
        {/* {Object.values(orders).map((order, index) => {
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
                        <div style={{ fontSize: 16 }}>
                          Estimated Delivery Date:
                        </div>
                        <div style={{ fontSize: 12 }}>03.01-11.01 2021</div>
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
        })} */}
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
          {OrderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(ActiveOrder);
