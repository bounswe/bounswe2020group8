import React, { useState } from "react";
import { Layout, Divider } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";
import Image from "react-image-resizer";
import { DeleteOutlined } from "@ant-design/icons";
import { useHistory, withRouter } from "react-router-dom";

const { Content, Sider } = Layout;
const productListDemo = [
  {
    imageUrl:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16touch-space-select-201911_GEO_TR?wid=892&hei=820&&qlt=80&.v=1582326712648",
    name: "Macbook Pro 16 inch",
    price: 2199.99,
    vendorName: "AA",
  },
  {
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/41GGPRqTZtL._AC_.jpg",
    name: "PlayStation 4 Pro 1TB",
    price: 399.99,
    vendorName: "AA",
  },
  {
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/61BhxjpQn6L._AC_SL1500_.jpg",
    name: "Arlo VMC2030-100NAS Essential Spotlight Camera",
    price: 99.99,
    vendorName: "AA",
  },
  {
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/318TG3aNKpL._AC_US218_.jpg",
    name: "Introducing Fire TV Stick Lite with Alexa Voice Remote Lite",
    price: 18.99,
    vendorName: "AA",
  },
];
const productPrice = 123.43;
const shipmentPrice = 25.5;

const Cart = () => {
  const history = useHistory();
  const [productList, setproductList] = useState(productListDemo);

  const onShopClicked = () => {
    history.push("/");
  };

  const handleDeleteClicked = ({ name }) => {
    const newList = productList.filter((item) => item.name !== name);
    setproductList(newList);
  };

  const handleConfirmClicked = () => {
    console.log("Confirm");
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
                <div style={{ fontSize: 16 }}>{product.name}</div>
                <div style={{ fontSize: 12 }}>Vendor: {product.vendorName}</div>
              </div>
              <div style={{ marginLeft: "auto", padding: 50 }}>
                <div>{product.price}$</div>
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ButtonPrimary
                title="Confirm"
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
          {ProductContent(productList)}
          <ButtonSecondary
            title="Go back to Shopping"
            onClick={() => onShopClicked()}
          />
        </Content>
        {PriceSider()}
      </Layout>
    </Layout>
  );
};

export default withRouter(Cart);
