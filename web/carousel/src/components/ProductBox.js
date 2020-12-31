import React from "react";
import { Divider, Badge } from "antd";
import ButtonPrimary from "./UI/ButtonPrimary/ButtonPrimary";
import Image from "react-image-resizer";
import { DeleteOutlined } from "@ant-design/icons";
import { HeartOutlined } from "@ant-design/icons";
import { useHistory, withRouter } from "react-router-dom";
import services from "../apis/services";

const ProductBox = (props) => {
  console.log("props", props);
  const { _id, brand, photos, shipmentPrice, vendorSpecifics } = props.product;
  return (
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
            onClick={() => props.handleDeleteClicked(_id)}
          />
        </div>
        <div>
          <ButtonPrimary
            title="Add to Cart"
            style={{ width: 120, height: 50, fontSize: 16 }}
            onClick={() => props.handleCartClicked(_id, vendorSpecifics[0]._id)}
          />
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default ProductBox;
