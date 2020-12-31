import React, { useState, useEffect } from "react";
import { Layout, Divider, Collapse } from "antd";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import ButtonSecondary from "../../components/UI/ButtonSecondary/ButtonSecondary";
import Image from "react-image-resizer";
import { useHistory, withRouter } from "react-router-dom";
import services from "../../apis/services";
import ProductBox from "../../components/ProductBox";

let ID = "";
const { Content } = Layout;
const { Panel } = Collapse;

const List = () => {
  const history = useHistory();
  const [productList, setproductList] = useState([]);
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
    const response = await services.get("/customer/me", config);
    if (response) {
      const data = response.data.data;
      ID = data._id;
    }
    const URL = "/shoppingList/all";
    services
      .get(URL, config)
      .then((response) => {
        if (response.data) {
          const newList = response.data;
          console.log("newList", newList);
          setproductList(newList);
        }
      })
      .catch((err) => console.log(err));
  };

  function handleDeleteProductClicked(list, deleteId) {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    const newlist = list.wishedProducts;
    newlist.data.filter((item) => item._id !== deleteId);

    const payload = {
      title: list.title,
      wishedProducts: newlist,
    };
    // const URL = "/shoppingList/" + list._id;
    // services
    //   .delete(URL, payload, config)
    //   .then((response) => {
    //     getLists();
    //   })
    //   .catch((err) => console.log(err));
  }

  const handleEmptyListClicked = (id) => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const URL = "/shoppingList/" + id;
    services
      .delete(URL, null, config)
      .then((response) => {
        getLists();
      })
      .catch((err) => console.log(err));
  };

  const handleEmptyAllListClicked = () => {
    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };
    const URL = "/shoppingList/all";
    services
      .delete(URL, null, config)
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
        _id: ID,
        productId: productId,
        vendorId: vendorId,
        amount: 1,
      };
      const URL = "/customer/shoppingCart/update";
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

  function ProductContent(productList = []) {
    return (
      <div style={{ fontSize: 24, fontWeight: "bold", color: "#d33a09" }}>
        My Lists
        <Divider />
        <Collapse accordion bordered={false} expandIconPosition="right">
          {productList.map((list, i) => (
            <Panel
              header={list.title}
              key={i}
              onClick={() => handleEmptyListClicked()}
            >
              {list.wishedProducts
                ? list.wishedProducts.data.map((product) => (
                    <ProductBox
                      product={product}
                      handleDeleteProductClicked={(_id) =>
                        handleDeleteProductClicked(list, _id)
                      }
                      handleCartClicked={(productId, vendorId) =>
                        handleCartClicked(productId, vendorId)
                      }
                    />
                  ))
                : null}
            </Panel>
          ))}
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
          {ProductContent(productList)}
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
