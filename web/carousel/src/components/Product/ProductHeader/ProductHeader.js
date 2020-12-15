import React, {useState} from "react";
import StarRatings from "react-star-ratings";
import classes from "../Product.module.css";

const ProductHeader = ({clickReviews, clickFeatures}) => {
  const[rating, setRating] = useState(4.4);

  return (
    <div className={classes.ProductHeader}>
      <div style={{height:"120px", textAlign:"left", marginLeft:"10px"}}>
        <div className={classes.ProductHeader_name}>Iphone 8</div>
        <div style={{marginTop:"-40px",display:"inline-flex", textAlign:"center",alignItems:"center", alignContent: "center"}}>
          <p style={{ marginRight:"6px", marginTop:"12px"}}>{rating}</p>
          <StarRatings
            style={{marginTop:"-20px"}}
            starDimension="15px"
            rating={rating}
            starRatedColor="#FF9100"
            numberOfStars={5}
            name='rating'
            starSpacing="2px"
          />
          <p
            style={{fontSize:"12px", marginTop:"10px", marginLeft:"18px", textDecoration:"underline", cursor:"pointer"}}
            onClick={clickReviews}
          >1254 reviews ></p>
        </div>
      </div>
      <div style={{height:"80px"}}>
        <p className={classes.ProductHeader_price}>245.99 $</p>
      </div>
      <div
        style={{height:"20px", marginBottom:"20px", fontSize:"12px", textDecoration:"underline", cursor:"pointer"}}
        onClick={clickFeatures}
      >
        See features >
      </div>


    </div>
  );
}

export default ProductHeader;