import React, { useContext, useState, useRef } from "react";
import classes from "./Product.module.css";
import SectionToggle from "./ProductInfo/SectionToggle";
import ProductHeader from "./ProductHeader/ProductHeader";
import ProductActions from "./ProductActions/ProductActions";
import scrollIntoView from "scroll-into-view-if-needed";
import ProductPhotoCarousel from "./ProductPhotoCarousel/ProductPhotoCarousel";
import "react-alice-carousel/lib/alice-carousel.css";

const Product = (props) => {
  const [infoSection, setInfoSection] = useState("features");

  const sectionRef = useRef(null);

  const photoUrls = [
    "https://images-na.ssl-images-amazon.com/images/I/51QWDcpe3JL._AC_SL1024_.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/51em%2BfFP9nL._AC_SL1024_.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/61sZFcEZG5L._AC_SL1500_.jpg",
    "https://images-na.ssl-images-amazon.com/images/I/513LaFkyePL._AC_SL1024_.jpg",
  ];

  const scrollToInfo = (section) => {
    setInfoSection(section);
    console.log(infoSection);
    window.scrollTo({
      left: 0,
      top: 480,
      behavior: "smooth",
    });
    //sectionRef.current.scrollIntoView({behavior: "smooth", block: "start", inline:"start"});
    setTimeout(() => {
      setInfoSection("");
    }, 500);
  };

  return (
    <div className={classes.ProductPage}>
      <div style={{ height: "60px" }}>
        we may display the path here if we want to. e.g.: Ana Sayfa > Telefonlar
        & Aksesuarlar > Cep Telefonları > Android Telefonlar > Samsung Android
        Telefonlar
      </div>
      <div className={classes.ProductOverview}>
        <div className={classes.ProductPhotos}>
          <ProductPhotoCarousel photoUrls={photoUrls} />
        </div>
        <div style={{ width: "10px" }} />
        <div className={classes.ProductRight}>
          <ProductHeader
            clickReviews={() => scrollToInfo("comments")}
            clickFeatures={() => scrollToInfo("features")}
          />
          <ProductActions clickSellers={() => scrollToInfo("sellers")} />
        </div>
      </div>
      <div style={{ height: "40px" }} />
      <div className={classes.ProductInfo} ref={sectionRef}>
        <SectionToggle section={infoSection} />
      </div>
    </div>
  );
};

export default Product;
