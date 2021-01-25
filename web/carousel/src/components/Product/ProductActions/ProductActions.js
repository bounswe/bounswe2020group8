import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import classes from "../Product.module.css";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
  BellOutlined,
  BellFilled,
} from "@ant-design/icons";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import { Select, Modal, Button, Form, Input, message, Popconfirm } from "antd";
import services from "../../../apis/services";
import { useHistory, withRouter } from "react-router-dom";

const { Option } = Select;

const regularCart = {
  width: "200px",
  fontSize: "20px",
};
const addedToCart = {
  width: "200px",
  backgroundColor: "#46af62",
  fontSize: "20px",
};

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      centered
      title="Create a new list"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const ProductActions = ({
  clickSellers,
  seller,
  sellerId,
  defaultProduct,
  onProductChange,
  productList,
  handleAddToCart,
}) => {
  const [rating, setRating] = useState(4.6);
  const [liked, setLiked] = useState(false);
  const [watched, setWatched] = useState(false);
  const [watchlistId, setWatchedlistId] = useState("");
  const [added, setAdded] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(regularCart);
  const [isLikedModalVisible, setIsLikedModalVisible] = useState(false);
  const [isUnlikedModalVisible, setIsUnlikedModalVisible] = useState(false);
  const [isWatchedModalVisible, setIsWatchedModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (added) {
      setButtonStyle(addedToCart);
      setTimeout(() => {
        setAdded(false);
        setButtonStyle(regularCart);
      }, 3000);
    }
  }, [added]);

  useEffect(() => {
    getLists();
  }, []);

  const getLists = async () => {
    const { _id, vendorSpecifics, parentProduct } = productList[0];
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
          setLists(newList);
          const l = newList.some((r) =>
            r.wishedProducts.some((w) => w.productId === _id)
          );
          setLiked(l);
        }
      })
      .catch((err) => console.log(err));
    const U = "/shoppingList/watchlist";
    services
      .get(U, config)
      .then((response) => {
        if (response.data) {
          let watchlist = response.data.data;
          const l = watchlist.some(
            (r) => r.data.parentProduct._id === parentProduct
          );
          const f = watchlist.filter((r) => r.data._id === _id);
          setWatchedlistId(f[0]._id);
          setWatched(l);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleCreateNewList = () => {
    setVisible(true);
  };

  const handleOk = (list) => {
    const { _id, vendorSpecifics } = productList[0];
    if (_id && vendorSpecifics && list) {
      const TOKEN = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };

      const payload = {
        title: list.title,
        wishedProducts: [
          ...list.wishedProducts,
          {
            productId: _id,
            vendorId: vendorSpecifics[0].vendorID._id,
          },
        ],
      };
      const URL = "/shoppingList/" + list._id;
      services
        .patch(URL, payload, config)
        .then((response) => {
          message.success(
            "Product is added to your list. You can check it from LIST"
          );
          setIsLikedModalVisible(false);
          setLiked(true);
        })
        .catch(() => {
          message.error("Something went wrong. Please try again");
        });
    }
  };

  const handleUnlike = () => {
    const { _id, vendorSpecifics } = productList[0];
    if (_id && vendorSpecifics) {
      const TOKEN = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };

      const r = lists.some((r) =>
        r.wishedProducts.some((w) => w.productId === _id)
      );
      if (!r) {
        message.error("Not in a list");
        return;
      }
      let newlist = [];
      lists.map((l) =>
        l.wishedProducts.some((w) => w.productId === _id) ? (newlist = l) : null
      );

      newlist.wishedProducts = newlist.wishedProducts.filter(
        (item) => item.productId !== _id
      );

      const payload = newlist;
      const URL = "/shoppingList/" + newlist._id;
      services
        .patch(URL, payload, config)
        .then((response) => {
          message.success(
            "Product is removed from your list. You can check it from LIST"
          );
          setIsUnlikedModalVisible(false);
          setLiked(false);
        })
        .catch(() => {
          message.error("Something went wrong. Please try again");
        });
    }
  };

  const handleCancel = () => {
    setIsLikedModalVisible(false);
    setIsUnlikedModalVisible(false);
  };

  const handleListClicked = () => {
    if (localStorage.getItem("login") === "true") {
      if (liked) {
        setIsUnlikedModalVisible(true);
      } else {
        setIsLikedModalVisible(true);
      }
    } else {
      history.push("/");
    }
  };

  const handleWatchedClicked = async () => {
    if (localStorage.getItem("login") === "true") {
      const TOKEN = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };
      const URL = "/shoppingList/watchlist";
      const { _id, vendorSpecifics } = productList[0];
      if (!watched) {
        const payload = {
          product_id: _id,
          vendor_id: vendorSpecifics[0].vendorID._id,
        };
        const response = await services.post(URL, payload, config);
        if (response) {
          message.success("This product added to your watchlist");
          setWatched(true);
        } else {
          message.error("This item cannot be added to your watchlist");
        }
      } else {
        const payload = {
          watcher_id: watchlistId,
        };
        const response = await services.delete(URL, { ...config, ...payload });
        if (response) {
          message.success("This product removed from your watchlist");
          setWatched(false);
        } else {
          message.error("This item cannot be removed from your watchlist");
        }
      }
    } else {
      history.push("/");
    }
  };

  const onCreate = (values) => {
    const { _id, vendorSpecifics } = productList[0];
    if (values && _id && vendorSpecifics) {
      const payload = {
        title: values.title,
        wishedProducts: [],
      };
      const TOKEN = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };
      const URL = "/shoppingList/";
      services
        .post(URL, payload, config)
        .then((response) => {
          getLists();
        })
        .catch((err) => console.log(err));
    }
    setVisible(false);
  };

  return (
    <div className={classes.ProductActions}>
      <div style={{ height: "60px", display: "flex", position: "relative" }}>
        <div style={{ height: "60px" }}>
          <p
            style={{ marginLeft: "0px", fontSize: "12px", cursor: "pointer" }}
            className={classes.ProductHeader_name}
            onClick={() => history.push("/v/public/" + sellerId)}
          >
            Seller: {seller} &gt;
          </p>
          <div
            style={{
              marginTop: "-34px",
              marginLeft: "6px",
              textAlign: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <div>
              <span>Other Options:</span>
              <span>
                <Select
                  defaultValue={defaultProduct}
                  style={{ width: 120 }}
                  onChange={(value) => {
                    onProductChange(value);
                  }}
                >
                  {productList.map((p) => {
                    return <Option value={p._id}>{p.option}</Option>;
                  })}
                </Select>
              </span>
            </div>

            {/* <StarRatings
              starDimension="12px"
              rating={rating}
              starRatedColor="#FF9100"
              numberOfStars={5}
              name="rating"
              starSpacing="2px"
            /> */}
          </div>
        </div>
        <div style={{}}>
          <ButtonSecondary
            icon={
              watched ? (
                <BellFilled style={{ fontSize: "26px" }} />
              ) : (
                <BellOutlined style={{ fontSize: "26px" }} />
              )
            }
            style={{ marginTop: "-6px" }}
            onClick={() => handleWatchedClicked()}
          />
        </div>
        <div style={{ position: "absolute", right: "0" }}>
          <ButtonSecondary
            icon={
              liked ? (
                <HeartFilled style={{ fontSize: "26px" }} />
              ) : (
                <HeartOutlined style={{ fontSize: "26px" }} />
              )
            }
            style={{ marginTop: "-6px" }}
            onClick={() => handleListClicked()}
          />
          <Modal
            title="Select the list you want to add this product"
            centered
            style={{ justifyContent: "space-between" }}
            visible={isLikedModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleCreateNewList}>
                Create A New List
              </Button>,
            ]}
          >
            {lists.map((list) => (
              <ButtonSecondary
                title={list.title}
                onClick={() => handleOk(list)}
              />
            ))}
          </Modal>
          <Popconfirm
            title="Are you sure to remove this product from your list?"
            visible={isUnlikedModalVisible}
            onConfirm={handleUnlike}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          />

          <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </div>
      </div>
      <div style={{ height: "140px" }}>
        <ButtonPrimary
          icon={<ShoppingCartOutlined style={{ fontSize: "26px" }} />}
          style={buttonStyle}
          title={added ? "Added to Cart!" : "Add to Cart"}
          onClick={() => {
            handleAddToCart();
            setAdded(true);
          }}
        />
        <div>
          Estimated delivery: <strong>3 Jan - 7 Jan</strong>
        </div>
      </div>
      <div
        style={{
          height: "40px",
          cursor: "pointer",
          textDecoration: "underline",
          fontSize: "12px",
        }}
        onClick={clickSellers}
      >
        Check other sellers &gt;
      </div>
    </div>
  );
};

export default withRouter(ProductActions);
