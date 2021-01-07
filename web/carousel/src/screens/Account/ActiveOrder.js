import React, { useState, useEffect } from "react";
import { Layout, Divider, Steps } from "antd";
import { useHistory, withRouter } from "react-router-dom";
import services from "../../apis/services";
import ProductBox from "../../components/Product/ProductBox";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";

let ID = "";
const { Content } = Layout;
const { Step } = Steps;

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
      .post(URL, { customerID: ID }, config)
      .then((response) => {
        if (response.data) {
          const newList = response.data;
          setOrders(newList);
        }
      })
      .catch((err) => console.log(err));
  };

  function handleReviewClicked(productId, vendorId) {}

  function OrderContent() {
    return (
      <div style={{ fontSize: 24, fontWeight: "bold", color: "#d33a09" }}>
        My Active Orders
        <Divider />
        {orders.map((order) => {
          return (
            <div
              style={{
                border: "1px solid #e2e2e2",
                marginBottom: 15,
                borderRadius: 3,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#fafafa",
                  // justifyContent: "center",
                  // alignItems: "center",
                  padding: "15px 20px",
                }}
              >
                <Steps size="small">
                  <Step title="Finished" description="This is a description." />
                  <Step
                    title="In Progress"
                    subTitle="Left 00:00:08"
                    description="This is a description."
                  />
                  <Step title="Waiting" description="This is a description." />
                </Steps>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Total: $
                  </div>
                  <ButtonPrimary
                    title="Cancel Order"
                    style={{
                      width: 135,
                      height: 40,
                      fontSize: 16,
                    }}
                  />
                </div>
              </div>
              <div style={{ padding: 20 }}>
                {order.orders.map((product) => (
                  <ProductBox
                    product={product}
                    order
                    handleReviewClicked={(productId, vendorId) =>
                      handleReviewClicked(productId, vendorId)
                    }
                  />
                ))}
              </div>
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
          {OrderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(ActiveOrder);
