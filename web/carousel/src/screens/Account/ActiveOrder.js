import React, { useState, useEffect } from "react";
import { Layout, Divider, Steps } from "antd";
import { useHistory, withRouter } from "react-router-dom";
import services from "../../apis/services";
import ProductBox from "../../components/Product/ProductBox";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";

const { Content } = Layout;
const { Step } = Steps;
let amount = 0;
let totalPrice = 0;

const ActiveOrder = () => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});

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
      setUser({ name: data.name, lastName: data.lastName });
    }
    const URL = "/customer/order/main";
    services
      .get(URL, config)
      .then((response) => {
        if (response.data) {
          let newList = response.data.data;
          newList = newList
            .map((orderItem) => {
              let newOrder = orderItem;

              const filteredProducts = orderItem.orders.filter(
                (product) =>
                  product.status === ("being prepared" || "on the way")
              );
              if (filteredProducts.length) {
                newOrder.orders = filteredProducts;
              } else {
                newOrder.orders = null;
              }

              return newOrder.orders?.length ? newOrder : null;
            })
            .filter((e) => e !== null);
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
            (amount = 0),
            (totalPrice = 0),
            (
              <div
                style={{
                  marginBottom: 15,
                  borderRadius: 3,
                  border: "2px solid #e2e2e2",
                  backgroundColor: "white",
                }}
              >
                <div style={{ padding: "15px 20px" }}>
                  <Steps size="small">
                    <Step
                      title="Finished"
                      description="This is a description."
                    />
                    <Step
                      title="In Progress"
                      subTitle="Left 00:00:08"
                      description="This is a description."
                    />
                    <Step
                      title="Waiting"
                      description="This is a description."
                    />
                  </Steps>
                </div>
                <div>
                  <div style={{ padding: 20 }}>
                    {order.orders.map(
                      (product, index) => (
                        (amount = amount + product.amount),
                        (totalPrice =
                          totalPrice + product.price * product.amount),
                        (
                          <ProductBox
                            product={product}
                            order
                            handleReviewClicked={(productId, vendorId) =>
                              handleReviewClicked(productId, vendorId)
                            }
                            isLastItem={order.orders.length - 1 === index}
                          />
                        )
                      )
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#fff8f0",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "15px 20px",
                      fontSize: 16,
                    }}
                  >
                    <div>
                      Customer: {user.name} {user.lastName}
                    </div>
                    <div>Total product: {amount}</div>
                    <div>Total: $ {totalPrice}</div>
                    <ButtonPrimary
                      title="See details"
                      style={{
                        width: 135,
                        height: 40,
                        fontSize: 16,
                      }}
                      onClick={() =>
                        history.push("/account/active-order/" + order._id)
                      }
                    />
                  </div>
                </div>
              </div>
            )
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
