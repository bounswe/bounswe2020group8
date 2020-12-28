import classes from "./SearchProduct.module.css";
import ButtonPrimary from "../UI/ButtonPrimary/ButtonPrimary";
import Image from "react-image-resizer";
import FixedDiv from "../UI/FixedDiv/FixedDiv";
import { withRouter } from "react-router-dom";

import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Rate } from "antd";

import { useState } from "react";

const SearchProduct = (props) => {
  const product = props.product;
  const [liked, setLiked] = useState(false);

  const toggleLiked = () => {
    setLiked(!liked);
  };

  const { mainProduct, minPrice } = product;
  const { title, rating, numberOfRating } = mainProduct[0];
  const photos = product.product.photos;
  const handleClick = () => {
    props.history.push(`/product/${mainProduct[0]._id}`);
  };
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

      <div onClick={handleClick}>
        <FixedDiv width={350} height={250} margin={"20px 0px"}>
          <Image height={250} width={350} src={photos[0]} />
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
              defaultValue={rating}
              style={{ fontSize: 15 }}
            />
          </span>
          <span style={{ marginLeft: 10, color: "#afafaf" }}>
            ({numberOfRating})
          </span>
        </div>
        <FixedDiv width={350} height={45} margin={"10px 0px 0px 0px"}>
          <p>{title}</p>
        </FixedDiv>
        <FixedDiv width={350} height={15} margin={"0px 0px 30px 0px"}>
          <p className={classes.Price}>
            <b>${minPrice}</b>
          </p>
        </FixedDiv>
      </div>

      <button className={classes.Button} onClick={() => alert("Add to Cart")}>
        Add to Cart
      </button>
    </div>
  );
};

export default withRouter(SearchProduct);
