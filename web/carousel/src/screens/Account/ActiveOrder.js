import React, { useState, useEffect } from "react";
import { Layout, Divider, Steps } from "antd";
import { useHistory, withRouter } from "react-router-dom";
import services from "../../apis/services";
import ProductBox from "../../components/Product/ProductBox";
import ButtonPrimary from "../../components/UI/ButtonPrimary/ButtonPrimary";
import { Modal, Button } from "antd";
import { Form, Input } from "antd";
import { Rate } from "antd";

const { Content } = Layout;
const { Step } = Steps;
let amount = 0;
let totalPrice = 0;

const { TextArea } = Input;
const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value,
  rateValueProduct,
  rateValueVendor,
  onChangeVendorRate,
  onChangeProductRate,
  errMessage,
}) => (
  <>
    Rate for vendor
    <Form.Item>
      <Rate
        allowHalf
        count={10}
        defaultValue={rateValueProduct}
        onChange={(e) => onChangeVendorRate(e)}
      />
    </Form.Item>
    Rate for product
    <Form.Item>
      <Rate
        allowHalf
        defaultValue={rateValueVendor}
        onChange={(e) => onChangeProductRate(e)}
      />
    </Form.Item>
    Comment
    <Form.Item>
      {<TextArea rows={4} onChange={onChange} value={value} />}
    </Form.Item>
    {errMessage}
    {/* <Form.Item>
      {
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Review
        </Button>
      }
    </Form.Item> */}
  </>
);

const ActiveOrder = () => {
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [onChange, setOnChange] = useState(false);
  const [onSubmit, setOnSubmit] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const [rateValueProduct, setRateValueProduct] = useState(0);
  const [rateValueVendor, setRateValueVendor] = useState(0);
  const [productIdReview, setProductIdReview] = useState();
  const [vendorIdReview, setVendorIdReview] = useState();
  const [errMessageReview, setErrMessageReview] = useState();
  const [parentProduct, setParentProduct] = useState();
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    console.log("submit");
  };

  const onChangeVendorRate = (e) => {
    console.log(e);
    setRateValueVendor(e);
  };
  const onChangeProductRate = (e) => {
    console.log(e);
    setRateValueProduct(e);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (rateValueVendor == 0) {
      setErrMessageReview("You must rate the vendor to add review");
      return;
    }
    if (rateValueProduct == 0) {
      setErrMessageReview("You must rate the product to add review");
      return;
    }
    const TOKEN = localStorage.getItem("token");
    console.log(TOKEN);
    console.log(parentProduct);
    console.log(vendorIdReview);
    var postUrl = "/comment/" + parentProduct;
    setSubmitting(true);
    let postData = {
      text: value,
      rate: rateValueProduct,
    };
    let config = {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    };

    services
      .post(postUrl, postData, config)
      .then((response) => {
        setValue("");
        setSubmitting(false);
        setRateValueProduct(0);
        setRateValueVendor(0);
        setIsModalVisible(false);
      })
      .catch((err, response) => {
        setValue("");
        setSubmitting(false);
        setErrMessageReview("Something Went Wrong");
      });
    const patchUrl = `/rating/${vendorIdReview}`;
    const patchData = {
      rate: rateValueVendor,
    };
    services.patch(patchUrl, patchData, config);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function handleReviewClicked(productId, vendorId, parentProduct) {
    setParentProduct(parentProduct);
    setProductIdReview(productId);
    setVendorIdReview(vendorId);
    showModal();
  }

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
                            handleReviewClicked={(
                              productId,
                              vendorId,
                              parentProduct
                            ) =>
                              handleReviewClicked(
                                productId,
                                vendorId,
                                parentProduct
                              )
                            }
                            isLastItem={order.orders.length - 1 === index}
                          />
                        )
                      )
                    )}
                  </div>
                  <Modal
                    title="Review"
                    centered
                    visible={isModalVisible}
                    onOk={handleOk}
                    okButtonProps={{ loading: submitting }}
                    okText="Add Review"
                    onCancel={handleCancel}
                  >
                    <Editor
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                      submitting={submitting}
                      value={value}
                      rateValueProduct={rateValueProduct}
                      rateValueVendor={rateValueVendor}
                      onChangeVendorRate={onChangeVendorRate}
                      onChangeProductRate={onChangeProductRate}
                      errMessage={errMessageReview}
                    />
                  </Modal>
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
