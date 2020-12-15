import React, {useEffect, useState} from "react";
import StarRatings from "react-star-ratings";
import classes from "../Product.module.css";
import ButtonSecondary from "../../UI/ButtonSecondary/ButtonSecondary";
import {HeartOutlined, HeartFilled, ShoppingCartOutlined} from "@ant-design/icons";
import ButtonPrimary from "../../UI/ButtonPrimary/ButtonPrimary";

const regularCart = {
  width: "200px",
  fontSize:"20px",
}
const addedToCart = {
  width:"200px",
  backgroundColor: "#46af62",
  fontSize:"20px",
}

const ProductActions = ({clickSellers}) => {
  const[rating, setRating] = useState(4.6);
  const[liked, setLiked] = useState(false);
  const[added, setAdded] = useState(false);
  const[buttonStyle, setButtonStyle] = useState(regularCart);

  useEffect(() => {
    if(added) {
      setButtonStyle(addedToCart);
      setTimeout(() => {
        setAdded(false);
        setButtonStyle(regularCart);
      },3000);
    }
  }, [added]);

  //let cartButton = added ? addedToCart : regularCart;

  return (
    <div className={classes.ProductActions}>
      <div style={{height:"60px", display:"flex", position:"relative"}}>
        <div style={{height:"60px"}}>
          <p
            style={{marginLeft:"8px",fontSize:"12px", cursor:"pointer"}}
            className={classes.ProductHeader_name}
            onClick={() => alert("Looking for this vendor's products!")}>
            satıcı: Apple >
          </p>
          <div style={{marginTop:"-34px", marginLeft:"6px", textAlign:"center",alignItems:"center", alignContent: "center"}}>
            <StarRatings
              starDimension="12px"
              rating={rating}
              starRatedColor="#FF9100"
              numberOfStars={5}
              name='rating'
              starSpacing="2px"
            />
          </div>
        </div>
        <div style={{position:"absolute", right:"0"}}>

          <ButtonSecondary
            icon={liked ? <HeartFilled style={{fontSize:"26px"}}/> : <HeartOutlined style={{fontSize:"26px"}}/>}
            style={{marginTop:"-6px"}}
            onClick={() => {
              liked ?
                setLiked(false) :
                setLiked(true)
            }}/>
        </div>

      </div>
      <div style={{height:"140px" }}>
        <ButtonPrimary
          icon={<ShoppingCartOutlined style={{fontSize:"26px"}}/>}
          style={buttonStyle}
          title={added ? "Added to Cart!" : "Add to Cart"}
          onClick={() => setAdded(true)}/>
          <div>
            Estimated delivery: <strong>23 Jan - 29 Jan</strong>
          </div>
      </div>
      <div
        style={{height:"40px", cursor:"pointer", textDecoration:"underline", fontSize:"12px"}}
        onClick={clickSellers}>
        Check other sellers >
      </div>
    </div>
  );
}

export default ProductActions;