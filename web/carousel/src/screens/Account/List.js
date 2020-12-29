import React, { useState, useEffect } from "react";
import { Layout, Divider, Badge } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";
import Image from "react-image-resizer";
import { DeleteOutlined } from "@ant-design/icons";
import { HeartOutlined } from "@ant-design/icons";
import { useHistory, withRouter } from "react-router-dom";
import services from "../../apis/services";

let ID = "";
const { Content } = Layout;
const productListDemo = [
  {
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/41GGPRqTZtL._AC_.jpg",
    productId: "5fe9fe35958f840f7844d706",
    vendorId: "5fe51075ed0d0a79636dcfaa",
    amount: 1,
  },
];

const List = () => {
  const history = useHistory();
  const [productList, setproductList] = useState(productListDemo);
  const handleShopClicked = () => {
    history.push("/");
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    const TOKEN = localStorage.getItem("token");
    const response = await services.get("/customer/me", {
      headers: { Authorization: "Bearer " + TOKEN },
    });
    if (response) {
      const data = response.data.data;
      ID = data._id;
    }
    // const URL = "/customer/shoppingList/get?_id=" + ID;
    // services
    //   .post(URL, null, config)
    //   .then((response) => {
    //     if (response.data) {
    //       const newList = response.data;
    //       setproductList(newList);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleDeleteClicked = ({ productId, vendorId }) => {
    // const config = {
    //   headers: { Authorization: `Bearer ${TOKEN}` },
    // };
    // const payload = {
    //   productId: productId,
    //   vendorId: vendorId,
    // };
    // const URL = "/customer/shoppingList/delete?_id=" + ID;
    // services
    //   .post(URL, payload, config)
    //   .then((response) => {
    //     getList();
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleEmptyClicked = () => {
    // const TOKEN = localStorage.getItem("token");
    // const config = {
    //   headers: { Authorization: `Bearer ${TOKEN}` },
    // };
    // const URL = "/customer/shoppingCart/reset?_id=" + ID;
    // services
    //   .post(URL, null, config)
    //   .then((response) => {
    //     getCarts();
    //   })
    //   .catch((err) => console.log(err));
  };

  function handleCartClicked({ productId, vendorId }) {
    const TOKEN = localStorage.getItem("token");

    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const payload = {
      productId: productId,
      vendorId: vendorId,
      amount: 1,
    };
    const URL = "/customer/shoppingCart/update?_id=" + ID;
    services
      .post(URL, payload, config)
      .then((response) => {
        history.push("/account/cart");
      })
      .catch((err) => console.log(err));
  }

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
                <div style={{ fontSize: 16 }}>{product.productId}</div>
                <div style={{ fontSize: 12 }}>Vendor: {product.vendorId}</div>
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
                  onClick={() => handleCartClicked(product)}
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
