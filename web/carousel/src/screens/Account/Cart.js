import React, { useState, useEffect } from "react";
import { Layout, Divider, InputNumber } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";
import Image from "react-image-resizer";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory, withRouter } from "react-router-dom";
import Order from "../../components/Order/Order";
import { Checkbox } from "antd";
import services from "../../apis/services";

const { Content, Sider } = Layout;

const productPrice = 123.43;
const shipmentPrice = 25.5;
let ID = "";

const Cart = () => {
  const history = useHistory();
  const [productList, setproductList] = useState([]);
  const [currentPage, setCurrentPage] = useState("cart");
  const [orderAddress, setOrderAddress] = useState(null);
  const [orderCreditCard, setOrderCreditCard] = useState(null);
  const [consentGiven, setConsentGiven] = useState(false);

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
    const URL = "/customer/shoppingCart/get?_id=" + ID;
    services
      .post(URL, null, config)
      .then((response) => {
        if (response.data) {
          const newList = response.data;
          setproductList(newList);
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

    const URL = "/customer/shoppingCart/reset?_id=" + ID;
    services
      .post(URL, null, config)
      .then((response) => {
        getCarts();
      })
      .catch((err) => console.log(err));
  };

  const onCheckBoxChange = (e) => {
    setConsentGiven(e.target.checked);
  };

  const handleDeleteClicked = ({ productId, vendorId }) => {
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const payload = {
      productId: productId,
      vendorId: vendorId,
    };
    const URL = "/customer/shoppingCart/delete?_id=" + ID;
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
      productId: productId,
      vendorId: vendorId,
      amount: value,
    };
    const URL = "/customer/shoppingCart/update?_id=" + ID;
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

        if (orderAddress._id !== undefined && orderCreditCard._id !== undefined) {
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
              alert("Purchase is successful! Checkout the active order page");
            })
            .catch((err) => console.log(err));
        } else {
          alert("Please enter an address and payment method!")
        }

      } else {
        alert("Please read the sales agreement and accept it");
      }
    }
  };

  function ProductContent(productList = []) {
    return (
      <div style={{ fontSize: 24, fontWeight: "bold", color: "#d33a09" }}>
        My Cart
        {productList.map((product) => (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 20,
                height: 100,
                borderColor: "gray",
                border: "1px solid",
                color: "navy",
              }}
            >
              <div>
                <Image height={70} width={70} src={product.imageUrl} />
              </div>
              <div
                style={{
                  fontWeight: "normal",
                  marginRight: "auto",
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 16 }}>{product.productId}</div>
                <div style={{ fontSize: 12 }}>Vendor: {product.vendorId}</div>
              </div>
              <div
                style={{
                  marginLeft: "auto",
                  padding: 20,
                  display: "flex",
                  flexDirection: "row",
                  textAlign: "center",
                }}
              >
                <InputNumber
                  min={1}
                  onChange={(value) => onAmountChange(value, product)}
                  defaultValue={product.amount}
                />
                <div
                  style={{
                    width: 150,
                  }}
                >
                  {product.price}$
                </div>
              </div>
              <div>
                <DeleteOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => handleDeleteClicked(product)}
                />
              </div>
            </div>
            <Divider />
          </>
        ))}
      </div>
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
                <div style={{ fontSize: 16 }}>{productPrice}</div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 16 }}>Shipment price</div>
                <div style={{ fontSize: 16 }}>{shipmentPrice}</div>
              </div>
              <Divider style={{ width: 220 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 16 }}>Total price</div>
                <div style={{ fontSize: 16 }}>
                  {productPrice + shipmentPrice}
                </div>
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
              {ProductContent(productList)}
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
