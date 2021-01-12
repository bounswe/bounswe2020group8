import React, { useEffect, useState } from "react";
import classes from "../Product.module.css";
import FeaturesComponent from "./Features/FeaturesComponent";
import CommentsComponent from "./Comments/CommentsComponent";
import OtherSellersComponent from "./OtherSellers/OtherSellersComponent";

const styleActive = {
  color: "#D33A09",
  backgroundColor: "#ffffff",
};
const stylePassive = {
  color: "#000000",
  backgroundColor: "#eeeeee",
};

const SectionToggle = (props, { section }) => {
  const [featuresStyle, setFeaturesStyle] = useState(true);
  const [sellersStyle, setSellersStyle] = useState(false);
  const [commentsStyle, setCommentsStyle] = useState(false);

  useEffect(() => {
    if (section !== "") {
      selectInfo(section);
    }
  }, [section]);

  const selectInfo = (value) => {
    const id = value;

    if (id === "features") {
      setFeaturesStyle(true);
      setSellersStyle(false);
      setCommentsStyle(false);
    } else if (id === "sellers") {
      setFeaturesStyle(false);
      setSellersStyle(true);
      setCommentsStyle(false);
    } else if (id === "comments") {
      setFeaturesStyle(false);
      setSellersStyle(false);
      setCommentsStyle(true);
    }
  };

  return (
    <div>
      <div className={classes.SectionToggle}>
        <button
          style={featuresStyle ? styleActive : stylePassive}
          id="features"
          onClick={(event) => selectInfo(event.target.id)}
        >
          Features
        </button>
        <button
          style={sellersStyle ? styleActive : stylePassive}
          id="sellers"
          onClick={(event) => selectInfo(event.target.id)}
        >
          Other Sellers
        </button>
        <button
          style={commentsStyle ? styleActive : stylePassive}
          id="comments"
          onClick={(event) => selectInfo(event.target.id)}
        >
          Comments
        </button>
      </div>
      <div>
        {featuresStyle ? (
          <FeaturesComponent
            product={props.product}
            mainProduct={props.mainProduct}
          />
        ) : null}
        {sellersStyle ? (
          <OtherSellersComponent
            product={props.product}
            mainProduct={props.mainProduct}
            setProductInfo={props.setProductInfo}
          />
        ) : null}
        {commentsStyle ? (
          <CommentsComponent
            product={props.product}
            mainProduct={props.mainProduct}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SectionToggle;
