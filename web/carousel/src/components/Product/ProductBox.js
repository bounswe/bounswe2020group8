import React, { useState, useEffect } from "react";
import { Divider, Badge, InputNumber } from "antd";
import ButtonPrimary from "../UI/ButtonPrimary/ButtonPrimary";
import Image from "react-image-resizer";
import { DeleteOutlined } from "@ant-design/icons";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import services from "../../apis/services";
import ButtonSecondary from "../UI/ButtonSecondary/ButtonSecondary";
import { withRouter } from "react-router-dom";

const ProductBox = (props) => {
  const [product, setproduct] = useState({});
  const {
    _id,
    brand,
    photos,
    shipmentPrice,
    vendorSpecifics,
    parentProduct,
  } = product;
  const [vendor, setvendor] = useState({});

  const { orderId, subOrderId, vendorId } = props;

  useEffect(() => {
    getProduct();
  }, [props]);

  const getProduct = async () => {
    const { productId, vendorId } = props.product;
    const URL = "/product/" + productId;
    const response = await services.get(URL);
    if (response.data) {
      const data = response.data.data;
      setproduct(data);
    }
    const U = "/vendor/public/" + vendorId;
    const r = await services.get(U);
    if (r.data) {
      const data = r.data.data;
      setvendor(data);
    }
  };

  function renderContent() {
    return (
      <div>
        {props.list ? <Badge.Ribbon text={<HeartOutlined />} /> : null}
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
            <Image height={70} width={70} src={photos[0]} />
          </div>
          <div>
            <div style={{ fontSize: 16 }}>{brand}</div>
            <div style={{ fontWeight: "normal", fontSize: 12 }}>
              Vendor: {vendor.companyName}{" "}
              <MessageOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => {
                  props.history.push(
                    `/account/messages/${orderId}/${subOrderId}/${vendorId}`
                  );
                }}
              />
            </div>
          </div>

          {props.cart ? (
            <>
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
                  onChange={(value) => props.onAmountChange(value)}
                  defaultValue={props.product.amount}
                />
                <div
                  style={{
                    width: 150,
                  }}
                >
                  ${vendorSpecifics[0].price}
                </div>
              </div>
              <div>
                <DeleteOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => props.handleDeleteClicked()}
                />
              </div>
            </>
          ) : null}
          {props.order ? (
            <>
              <div style={{ fontSize: 16 }}>Amount: {props.product.amount}</div>
              <div>
                <div>${props.product.price * props.product.amount}</div>
              </div>
              <ButtonSecondary
                title="Add review"
                style={{ width: 120, height: 50, fontSize: 18 }}
                onClick={() =>
                  props.handleReviewClicked(
                    _id,
                    vendorSpecifics[0].vendorID,
                    parentProduct
                  )
                }
              />
            </>
          ) : null}
          {props.orderDetail ? (
            <>
              <div style={{ fontSize: 13 }}>
                <div>Amount: {props.product.amount}</div>
                <div>${props.product.price * props.product.amount}</div>
              </div>
              <div style={{ fontSize: 13 }}>
                <div>Arrive after {props.product.arrivesIn} days</div>
              </div>

              {[
                "cancelled by the customer",
                "cancelled by the vendor",
                "returned",
              ].includes(props.status) ? (
                props.status
              ) : (
                <ButtonSecondary
                  title={
                    props.status === "delievered"
                      ? "Return Product"
                      : "Cancel Product"
                  }
                  style={{ width: 150, height: 50, fontSize: 16 }}
                  onClick={() =>
                    props.handleReturnClicked("cancelled by the customer")
                  }
                />
              )}
            </>
          ) : null}
          {props.list ? (
            <>
              <div style={{ fontSize: 18 }}>
                <div>${vendorSpecifics[0].price}</div>
              </div>
              <div>
                <DeleteOutlined
                  style={{ fontSize: 20 }}
                  onClick={() => props.handleDeleteProductClicked(_id)}
                />
              </div>
            </>
          ) : null}
        </div>
        {!props.isLastItem && <Divider />}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {product?._id ? <div>{renderContent()}</div> : null}
    </div>
  );
};

export default withRouter(ProductBox);
