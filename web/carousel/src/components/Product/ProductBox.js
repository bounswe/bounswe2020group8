import React, { useState, useEffect } from "react";
import { Divider, Badge, InputNumber } from "antd";
import ButtonPrimary from "../UI/ButtonPrimary/ButtonPrimary";
import Image from "react-image-resizer";
import { DeleteOutlined } from "@ant-design/icons";
import { HeartOutlined } from "@ant-design/icons";
import services from "../../apis/services";

const ProductBox = (props) => {
  const [product, setproduct] = useState({});
  const { _id, brand, photos, shipmentPrice, vendorSpecifics } = product;

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
  };

  function renderList() {
    return (
      <div>
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
            <Image height={70} width={70} src={photos[0]} />
          </div>
          <div style={{ fontWeight: "normal" }}>
            <div style={{ fontSize: 16 }}>{brand}</div>
            <div style={{ fontSize: 12 }}>Vendor: {vendorSpecifics[0]._id}</div>
          </div>
          <div>
            <div>${vendorSpecifics[0].price}</div>
          </div>
          <div>
            <DeleteOutlined
              style={{ fontSize: 20 }}
              onClick={() => props.handleDeleteProductClicked(_id)}
            />
          </div>
          <div>
            <ButtonPrimary
              title="Add to Cart"
              style={{ width: 120, height: 50, fontSize: 16 }}
              onClick={() =>
                props.handleCartClicked(_id, vendorSpecifics[0]._id)
              }
            />
          </div>
        </div>
        <Divider />
      </div>
    );
  }

  function renderCart() {
    return (
      <div>
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
          <div
            style={{ fontWeight: "normal", marginRight: "auto", padding: 20 }}
          >
            <div style={{ fontSize: 16 }}>{brand}</div>
            <div style={{ fontSize: 12 }}>Vendor: {vendorSpecifics[0]._id}</div>
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
        </div>
        <Divider />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {product?._id ? (
        <div>
          {props.list ? renderList() : null}
          {props.cart ? renderCart() : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProductBox;
