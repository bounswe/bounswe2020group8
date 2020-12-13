import classes from "./SearchProduct.module.css";
import ButtonPrimary from "../UI/ButtonPrimary/ButtonPrimary";
import Image from "react-image-resizer";
import FixedDiv from "../UI/FixedDiv/FixedDiv";

import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Rate } from "antd";

import { useState } from "react";

const SearchProduct = (props) => {
  const [liked, setLiked] = useState(false);

  const toggleLiked = () => {
    setLiked(!liked);
  };

  const product = props.product;
  return (
    <div className={classes.SearchProduct}>
      <FixedDiv width={350} height={15} margin={"10px 0px"}>
        <div
          style={{
            float: "right",
            paddingRight: "10px",
            fontSize: "25px",
            color: "red",
            height: "15px",
          }}
        >
          {liked ? (
            <HeartFilled onClick={toggleLiked} />
          ) : (
            <HeartOutlined onClick={toggleLiked} />
          )}
        </div>
      </FixedDiv>

      <FixedDiv width={350} height={250} margin={"20px 0px"}>
        <Image height={250} width={350} src={product.imageUrl} />
      </FixedDiv>
      <div
        style={{
          width: "350px",
          height: "25px",
          textAlign: "left",
          paddingLeft: "20px",
        }}
      >
        <span>
          <Rate
            disabled
            allowHalf
            defaultValue={product.rate}
            style={{ fontSize: 15 }}
          />
        </span>
        <span style={{ marginLeft: 10, color: "#afafaf" }}>
          ({product.rateCount})
        </span>
      </div>
      <FixedDiv width={350} height={45} margin={"10px 0px 0px 0px"}>
        <p>{product.name}</p>
      </FixedDiv>
      <FixedDiv width={350} height={15} margin={"0px 0px 30px 0px"}>
        <p className={classes.Price}>
          <b>${product.price}</b>
        </p>
      </FixedDiv>

      <button className={classes.Button}>Add to Cart</button>
    </div>
  );
};

export default SearchProduct;
