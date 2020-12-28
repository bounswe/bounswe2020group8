import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import classes from "../Product.module.css";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import {
  HeartOutlined,
  HeartFilled,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";
import { Select } from "antd";

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

const ProductActions = ({
  clickSellers,
  seller,
  defaultProduct,
  onProductChange,
  productList,
  handleAddToCart,
}) => {
  const [rating, setRating] = useState(4.6);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(regularCart);

  useEffect(() => {
    if (added) {
      setButtonStyle(addedToCart);
      setTimeout(() => {
        setAdded(false);
        setButtonStyle(regularCart);
      }, 3000);
    }
  }, [added]);

  //let cartButton = added ? addedToCart : regularCart;

  return (
    <div className={classes.ProductActions}>
      <div style={{ height: "60px", display: "flex", position: "relative" }}>
        <div style={{ height: "60px" }}>
          <p
            style={{ marginLeft: "0px", fontSize: "12px", cursor: "pointer" }}
            className={classes.ProductHeader_name}
            onClick={() => alert("Looking for this vendor's products!")}
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
            onClick={() => {
              liked ? setLiked(false) : setLiked(true);
            }}
          />
        </div>
      </div>
      <div style={{ height: "140px" }}>
        <ButtonPrimary
          icon={<ShoppingCartOutlined style={{ fontSize: "26px" }} />}
          style={buttonStyle}
          title={added ? "Added to Cart!" : "Add to Cart"}
          onClick={handleAddToCart}
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

export default ProductActions;
