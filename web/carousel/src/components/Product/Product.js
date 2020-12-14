import React from "react";
import classes from "./Product.module.css";
import SectionToggle from "./ProductInfo/SectionToggle";

const Product = (props) => {
  return(
    <div className={classes.ProductPage}>
      <div style={{height:"60px"}}>we may display the path here if we want to. e.g.: Ana Sayfa > Telefonlar & Aksesuarlar > Cep Telefonları >
        Android Telefonlar > Samsung Android Telefonlar</div>
      <div className={classes.ProductOverview}>
        <div className={classes.ProductPhotos}>
          Product Photos
        </div>
        <div className={classes.ProductRight}>
          <div className={classes.ProductHeader}>
            Product Header
          </div>
          <div className={classes.ProductActions}>
            Product Actions
          </div>
        </div>
      </div>
      <div  style={{height:"100px"}}/>
      <div className={classes.ProductInfo}>
        <SectionToggle />
        <div>
          Info Section
        </div>
      </div>
    </div>
  );
}

export default Product;
