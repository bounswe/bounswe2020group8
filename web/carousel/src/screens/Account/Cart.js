import React, { useState, useEffect } from "react";
import { Layout, Divider, Spin, message } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";
import { useHistory, withRouter } from "react-router-dom";
import Order from "../../components/Order/Order";
import OrderGuest from "../../components/Order/OrderGuest";
import { Checkbox } from "antd";
import services from "../../apis/services";
import ProductBox from "../../components/Product/ProductBox";
import PrivacyPolicy from "../../components/Agreements/PrivacyPolicy";
import Terms from "../../components/Agreements/Terms";

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
  const [agreementVisible, setAgreementVisible] = useState(false);

  const [guestPurchaseProcess, setGuestPurchaseProcess] = useState(0);
  const [guestEmail, setGuestEmail] = useState("");
  const [guestAddress, setGuestAddress] = useState({});
  const [guestCreditCart, setGuestCreditCart] = useState({});
  const [guestOrderInfo, setGuestOrderInfo] = useState([]);

  useEffect(() => {
    getCarts();
  }, []);

  const getCarts = async () => {
    const loggedIn = localStorage.getItem("login");
    if (loggedIn !== "true") {
      const URL = "/guest/shoppingCart/main";
      const id = localStorage.getItem("guestID");
      const config = {
        params: {
          _id: id,
        },
      };
      services
        .get(URL, config)
        .then((response) => {
          if (response.data) {
            const newList = response.data[0].data;
            setproductList(newList);
            setloading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const TOKEN = localStorage.getItem("token");
      const config = {
        headers: { Authorization: "Bearer " + TOKEN },
      };
      const URL = "/customer/shoppingCart/main";
      services
        .get(URL, config)
        .then((response) => {
          if (response.data) {
            const newList = response.data[0].data;
            setproductList(newList);
            setloading(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const onShopClicked = () => {
    history.push("/");
  };

  const onEmptyClicked = () => {
    const loggedIn = localStorage.getItem("login");
    if (loggedIn !== "true") {
      const id = localStorage.getItem("guestID");
      const config = {
        body: {
          _id: id,
        },
      };
      const data = {
        _id: id,
      };
      const URL = "/guest/shoppingCart/reset";
      console.log(id);
      services
        .post(URL, data)
        .then((response) => {
          console.log(response);
          getCarts();
        })
        .catch((err) => console.log(err));
    } else {
      const TOKEN = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };
      const URL = "/customer/shoppingCart/reset";
      services
        .post(URL, null, config)
        .then((response) => {
          getCarts();
        })
        .catch((err) => console.log(err));
    }
  };

  const onCheckBoxChange = (e) => {
    setConsentGiven(e.target.checked);
  };

  const handleDeleteClicked = ({ productId, vendorId }) => {
    setloading(true);

    const loggedIn = localStorage.getItem("login");
    if (loggedIn !== "true") {
      const URL = "/guest/shoppingCart/delete";
      const id = localStorage.getItem("guestID");
      const payload = {
        _id: id,
        productId: productId,
        vendorId: vendorId,
      };
      services
        .post(URL, payload)
        .then((response) => {
          if (response.data) {
            getCarts();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const TOKEN = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };
      const payload = {
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
    }
  };

  function onAmountChange(value, { productId, vendorId }) {
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const payload = {
      productId: productId,
      vendorId: vendorId,
      amount: value,
    };
    const URL = "/customer/shoppingCart/main";
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
        const loggedIn = localStorage.getItem("login");
        if (loggedIn !== "true") {
          if (guestPurchaseProcess < 3) {
            message.warning(
              "Please first submit the necessary information for your purchase!"
            );
          } else {
            const id = localStorage.getItem("guestID");
            const URL = "/guest/purchase";
            const payload = {
              _id: id,
              shippingAddressId: guestAddress,
              billingAddressId: guestAddress,
              creditCardId: guestCreditCart,
              email: guestEmail,
            };
            services
              .post(URL, payload)
              .then((response) => {
                if (response.data) {
                  message.success("Purchase is successful!");
                  setGuestOrderInfo(response.data._id);
                  setGuestPurchaseProcess(4);
                  console.log(response);
                  onEmptyClicked();
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        } else {
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
                message.success("Purchase is successful!");
                onEmptyClicked();
                history.push("/account/active-order");
              })
              .catch((err) => console.log(err));
          } else {
            message.warning("Please enter an address and payment method!");
          }
        }
      } else {
        message.warning("Please read the sales agreement and accept it");
      }
    }
  };

  const openAgreement = (open) => {
    setAgreementVisible(open);
  };
  const getGuestEmailValue = (values) => {
    const email = values.email;
    setGuestEmail(email);
    setGuestPurchaseProcess(1);
  };

  const getGuestAddressValues = (values) => {
    const address = {
      addressName: values.addressName,
      name: values.name,
      addressLine: values.addressLine,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      phone: values.phone,
    };
    setGuestAddress(address);
    setGuestPurchaseProcess(2);
  };

  const getGuestCreditCartValues = (values) => {
    const paymentInfo = {
      creditCardCvc: values.creditCardCvc,
      creditCardNumber: values.creditCardNumber,
      creditCardData: values.creditCardData,
      creditCardName: values.creditCardName,
    };
    setGuestCreditCart(paymentInfo);
    setGuestPurchaseProcess(3);
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
          ) : productList.length ? (
            productList.map((product, index) => {
              return (
                (totalPrice = totalPrice + product.price * product.amount),
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
          ) : null}
        </div>
      )
    );
  }

  function PriceSider() {
    console.log(localStorage.getItem("guestID"));
    if (guestPurchaseProcess < 4) {
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ fontSize: 16 }}>Product price</div>
                  <div style={{ fontSize: 16 }}>${totalPrice}</div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ fontSize: 16 }}>Shipment price</div>
                  <div style={{ fontSize: 16 }}>${shipmentPrice}</div>
                </div>
                <Divider style={{ width: 220 }} />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div style={{ fontSize: 16 }}>Total price</div>
                  <div style={{ fontSize: 16 }}>
                    ${totalPrice + shipmentPrice}
                  </div>
                </div>
              </div>
              <Divider style={{ width: 220 }} />
              {currentPage === "order" && (
                <div style={{ fontWeight: "bold" }}>
                  <Checkbox onChange={onCheckBoxChange}>
                    I've read the sales agreement and I accept it.
                  </Checkbox>
                  <a onClick={() => openAgreement(true)}>
                    Click here to read our sales agreement.
                  </a>
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
  }

  return (
    <Layout>
      {agreementVisible ? (
        <div>
          <Terms visible={true} setModal={() => openAgreement(false)} />
        </div>
      ) : null}
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
          ) : localStorage.getItem("login") !== "true" ? (
            <OrderGuest
              process={guestPurchaseProcess}
              setGuestEmail={getGuestEmailValue}
              setGuestAddress={getGuestAddressValues}
              setGuestCreditCart={getGuestCreditCartValues}
              orderInformation={guestOrderInfo}
            />
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
