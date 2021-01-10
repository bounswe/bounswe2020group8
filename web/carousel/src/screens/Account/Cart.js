import React, { useState, useEffect } from "react";
import { Layout, Divider, Spin } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";
import { useHistory, withRouter } from "react-router-dom";
import Order from "../../components/Order/Order";
import { Checkbox } from "antd";
import services from "../../apis/services";
import ProductBox from "../../components/Product/ProductBox";

const { Content, Sider } = Layout;

let totalPrice = 0;
let shipmentPrice = 0;
let ID = "";

const Cart = () => {
  const history = useHistory();
  const [productList, setproductList] = useState([]);
  const [currentPage, setCurrentPage] = useState("cart");
  const [orderAddress, setOrderAddress] = useState("null");
  const [orderCreditCard, setOrderCreditCard] = useState("null");
  const [consentGiven, setConsentGiven] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getCarts();
  }, []);

  const getCarts = async () => {
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: "Bearer " + TOKEN },
    };
    const response = await services.get("/customer/me", config);
    if (response) {
      const data = response.data.data;
      ID = data._id;
    }
    const URL = "/customer/shoppingCart/get";
    const payload = {
      _id: ID,
    };
    services
      .post(URL, payload, config)
      .then((response) => {
        if (response.data) {
          const newList = response.data;
          setproductList(newList);
          setloading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  const onShopClicked = () => {
    history.push("/");
  };

  const onEmptyClicked = () => {
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const payload = {
      _id: ID,
    };
    const URL = "/customer/shoppingCart/reset";
    services
      .post(URL, payload, config)
      .then((response) => {
        getCarts();
      })
      .catch((err) => console.log(err));
  };

  const onCheckBoxChange = (e) => {
    setConsentGiven(e.target.checked);
  };

  const handleDeleteClicked = ({ productId, vendorId }) => {
    setloading(true);
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const payload = {
      _id: ID,
      productId: productId,
      vendorId: vendorId,
    };
    const URL = "/customer/shoppingCart/delete";
    services
      .post(URL, payload, config)
      .then((response) => {
        getCarts();
      })
      .catch((err) => console.log(err));
  };

  function onAmountChange(value, { productId, vendorId }) {
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const payload = {
      _id: ID,
      productId: productId,
      vendorId: vendorId,
      amount: value,
    };
    const URL = "/customer/shoppingCart/update";
    services
      .post(URL, payload, config)
      .then((response) => {
        getCarts();
      })
      .catch((err) => console.log(err));
  }

  const handleConfirmClicked = () => {
    if (currentPage === "cart") {
      setCurrentPage("order");
    } else {
      if (consentGiven) {
        const TOKEN = localStorage.getItem("token");

        const config = {
          headers: { Authorization: `Bearer ${TOKEN}` },
        };

        if (
          orderAddress._id !== undefined &&
          orderCreditCard._id !== undefined
        ) {
          const payload = {
            _id: ID,
            shippingAddressId: orderAddress._id,
            billingAddressId: orderAddress._id,
            creditCardId: orderCreditCard._id,
          };

          const URL = "/customer/purchase";
          services
            .post(URL, payload, config)
            .then((response) => {
              alert("Purchase is successful!");
              onEmptyClicked();
              history.push("/account/active-order");
            })
            .catch((err) => console.log(err));
        } else {
          alert("Please enter an address and payment method!");
        }
      } else {
        alert("Please read the sales agreement and accept it");
      }
    }
  };

  function ProductContent() {
    return (
      (totalPrice = 0),
      (shipmentPrice = 0),
      (
        <div style={{ fontSize: 24, fontWeight: "bold", color: "#d33a09" }}>
          My Cart
          <Divider />
          {loading ? (
            <div
              style={{
                padding: "0 24px",
                minHeight: "140",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : (
            productList.map((product, index) => {
              return (
                (totalPrice = totalPrice + product.price),
                (shipmentPrice = shipmentPrice + product.shipmentPrice),
                (
                  <ProductBox
                    product={product}
                    cart
                    handleDeleteClicked={() => handleDeleteClicked(product)}
                    onAmountChange={(value) => onAmountChange(value, product)}
                    isLastItem={productList.length - 1 === index}
                  />
                )
              );
            })
          )}
        </div>
      )
    );
  }

  function PriceSider() {
    return (
      <div>
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
                <div style={{ fontSize: 16 }}>{totalPrice}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 16 }}>Shipment price</div>
                <div style={{ fontSize: 16 }}>{shipmentPrice}</div>
              </div>
              <Divider style={{ width: 220 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 16 }}>Total price</div>
                <div style={{ fontSize: 16 }}>{totalPrice + shipmentPrice}</div>
              </div>
            </div>
            <Divider style={{ width: 220 }} />
            {currentPage === "order" && (
              <div style={{ fontWeight: "bold" }}>
                <Checkbox onChange={onCheckBoxChange}>
                  I've read the <a>sales agreement</a> and I accept it.
                </Checkbox>
                <Divider style={{ width: 220 }} />
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ButtonPrimary
                title={currentPage === "cart" ? "Continue" : "Confirm"}
                style={{ width: 150 }}
                onClick={() => handleConfirmClicked()}
              />
            </div>
          </div>
        </Sider>
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
          {currentPage === "cart" ? (
            <>
              {ProductContent()}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <ButtonSecondary
                  title="Go back to Shopping"
                  onClick={() => onShopClicked()}
                />
                <ButtonSecondary
                  title="Empty Cart"
                  onClick={() => onEmptyClicked()}
                />
              </div>
            </>
          ) : (
            <Order
              setOrderAddress={setOrderAddress}
              setOrderCreditCard={setOrderCreditCard}
            />
          )}
        </Content>
        {PriceSider()}
      </Layout>
    </Layout>
  );
};

export default withRouter(Cart);
