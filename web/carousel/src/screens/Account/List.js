import React, { useState, useEffect } from "react";
import { Layout, Divider, Collapse, Spin } from "antd";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";
import { useHistory, withRouter } from "react-router-dom";
import services from "../../apis/services";
import ProductBox from "../../components/Product/ProductBox";
import { DeleteOutlined } from "@ant-design/icons";

let ID = "";
const { Content } = Layout;
const { Panel } = Collapse;

const List = () => {
  const history = useHistory();
  const [productList, setproductList] = useState([]);
  const [loading, setloading] = useState(false);

  const handleShopClicked = () => {
    history.push("/");
  };

  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const URL = "/shoppingList/all/idonly";
    services
      .get(URL, config)
      .then((response) => {
        if (response.data) {
          const newList = response.data.data;
          setproductList(newList);
          setloading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  function handleDeleteProductClicked(list, deleteId) {
    setloading(true);

    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    let newlist = list.wishedProducts;
    newlist = newlist.filter((item) => item.productId !== deleteId);

    const payload = {
      title: list.title,
      wishedProducts: newlist,
    };
    const URL = "/shoppingList/" + list._id;
    services
      .patch(URL, payload, config)
      .then((response) => {
        getLists();
      })
      .catch((err) => console.log(err));
  }

  const handleEmptyListClicked = (id) => {
    setloading(true);
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const URL = "/shoppingList/" + id;
    services
      .delete(URL, config)
      .then((response) => {
        getLists();
      })
      .catch((err) => console.log(err));
  };

  const handleEmptyAllListClicked = () => {
    setloading(true);
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const URL = "/shoppingList/all";
    services
      .delete(URL, config)
      .then((response) => {
        getLists();
      })
      .catch((err) => console.log(err));
  };

  function handleCartClicked(productId, vendorId) {
    if (productId && vendorId) {
      const TOKEN = localStorage.getItem("token");

      const config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };
      const payload = {
        productId: productId,
        vendorId: vendorId,
        amount: 1,
      };
      const URL = "/customer/shoppingCart/main";
      services
        .post(URL, payload, config)
        .then((response) => {
          history.push("/account/cart");
        })
        .catch((err) => console.log(err));
    } else {
      return;
    }
  }

  const genExtra = (id) => (
    <DeleteOutlined
      onClick={() => {
        handleEmptyListClicked(id);
      }}
    />
  );

  function ProductContent() {
    return (
      <div style={{ fontSize: 24, fontWeight: "bold", color: "#d33a09" }}>
        My Lists
        <Divider />
        <Collapse bordered={false} expandIconPosition="left">
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
            productList.map((list) => {
              return (
                <Panel
                  header={list.title}
                  onClick={() => handleEmptyListClicked()}
                  extra={genExtra(list._id)}
                >
                  {list.wishedProducts
                    ? list.wishedProducts.map((product) => (
                        <ProductBox
                          product={product}
                          list
                          handleDeleteProductClicked={(_id) =>
                            handleDeleteProductClicked(list, _id)
                          }
                          // handleCartClicked={(productId, vendorId) =>
                          //   handleCartClicked(productId, vendorId)
                          // }
                        />
                      ))
                    : null}
                </Panel>
              );
            })
          )}
        </Collapse>
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
          {productList ? ProductContent() : <div>You do not have a list!</div>}

          <ButtonSecondary
            title="Go back to Shopping"
            onClick={() => handleShopClicked()}
          />
          <ButtonSecondary
            title="Empty All Lists"
            onClick={() => handleEmptyAllListClicked()}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(List);
