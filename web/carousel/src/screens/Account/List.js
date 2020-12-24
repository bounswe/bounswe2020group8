import React, { useState } from "react";
import { Layout, Divider, Badge } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";
import Image from "react-image-resizer";
import { DeleteOutlined } from "@ant-design/icons";
import { HeartOutlined } from "@ant-design/icons";
import { useHistory, withRouter } from "react-router-dom";

const { Content } = Layout;
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
];

const List = () => {
  const history = useHistory();
  const [productList, setproductList] = useState(productListDemo);
  const handleShopClicked = () => {
    history.push("/");
  };

  const handleDeleteClicked = ({ name }) => {
    const newList = productList.filter((item) => item.name !== name);
    setproductList(newList);
  };

  const handleCartClicked = () => {
    history.push("/account/cart");
  };

  function ProductContent(productList = []) {
    return (
      <div style={{ fontSize: 24, fontWeight: "bold", color: "#d33a09" }}>
        My List
        {productList.map((product) => (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Badge.Ribbon text={<HeartOutlined />} />
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
              <div style={{ fontWeight: "normal" }}>
                <div style={{ fontSize: 16 }}>{product.name}</div>
                <div style={{ fontSize: 12 }}>Vendor: {product.vendorName}</div>
              </div>
              <div>
                <div>{product.price}$</div>
              </div>
              <div>
                <DeleteOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => handleDeleteClicked(product)}
                />
              </div>
              <div>
                <ButtonPrimary
                  title="Add to Cart"
                  style={{ width: 120, height: 50, fontSize: 16 }}
                  onClick={() => handleCartClicked()}
                />
              </div>
            </div>
            <Divider />
          </div>
        ))}
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
            onClick={() => handleShopClicked()}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(List);
