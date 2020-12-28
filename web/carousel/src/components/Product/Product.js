import React, { useContext, useState, useRef, useEffect } from "react";
import classes from "./Product.module.css";
import SectionToggle from "./ProductInfo/SectionToggle";
import ProductHeader from "./ProductHeader/ProductHeader";
import ProductActions from "./ProductActions/ProductActions";
import scrollIntoView from "scroll-into-view-if-needed";
import ProductPhotoCarousel from "./ProductPhotoCarousel/ProductPhotoCarousel";
import "react-alice-carousel/lib/alice-carousel.css";
import services from "../../apis/services";
import { useParams } from "react-router-dom";

const Product = (props) => {
  const { id } = useParams();

  const [infoSection, setInfoSection] = useState("features");
  const [product, setProduct] = useState(null);
  const [mainProduct, setMainProduct] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  // const [defaultVendor, setDefaultVendor] = useState({});

  const sectionRef = useRef(null);

  useEffect(async () => {
    const getMainProductUrl = `/mainProduct/${id}`;
    const resp = await services.get(getMainProductUrl);
    setMainProduct(resp.data.data);

    const getAllProductsUrl = `/product?parentProduct=${id}`;
    services.get(getAllProductsUrl).then((response) => {
      let productList = response.data.data;
      const optionsList = response.data.data.map((r) => {
        return r.parameters.reduce((acc, current) => {
          return acc + " " + current.value;
        }, "");
      });
      productList = productList.map((p, index) => {
        return { ...p, option: optionsList[index] };
      });
      setAllProducts(productList);
      setProduct(productList[0]);
      console.log(productList);
    });
    // const getVendorUrl = `/vendor/${response.data.data.default.vendorID}`;
    // services.get(getVendorUrl).then((response) => {
    //   console.log(response);
    //   setDefaultVendor(response.data.data);
    // });
  }, []);

  const scrollToInfo = (section) => {
    setInfoSection(section);
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
  let vendorName = "";
  if (product) {
    const vendorId = product.default.vendorID;
    vendorName = product.vendorSpecifics.filter(
      (v) => v.vendorID._id === vendorId
    )[0].vendorID.companyName;
  }

  const handleOnProductChange = (value) => {
    console.log(value);
    const newProduct = allProducts.filter(
      (product) => product._id === value
    )[0];
    setProduct(newProduct);
  };

  return product ? (
    <div className={classes.ProductPage}>
      <div style={{ height: "60px" }}>
        {/* we may display the path here if we want to. e.g.: Ana Sayfa > Telefonlar
        & Aksesuarlar > Cep Telefonları > Android Telefonlar > Samsung Android
        Telefonlar */}
      </div>
      <div className={classes.ProductOverview}>
        <div className={classes.ProductPhotos}>
          <ProductPhotoCarousel photoUrls={product.photos} />
        </div>
        <div style={{ width: "10px" }} />
        <div className={classes.ProductRight}>
          <ProductHeader
            clickReviews={() => scrollToInfo("comments")}
            clickFeatures={() => scrollToInfo("features")}
            reviewCount={mainProduct.numberOfRating}
            price={product.default.price}
            name={mainProduct.title}
            rating={mainProduct.rating}
            brand={mainProduct.brand}
          />
          <ProductActions
            seller={vendorName}
            defaultProduct={product.option}
            productList={allProducts}
            onProductChange={handleOnProductChange}
            clickSellers={() => scrollToInfo("sellers")}
          />
        </div>
      </div>
      <div style={{ height: "40px" }} />
      <div className={classes.ProductInfo} ref={sectionRef}>
        <SectionToggle
          section={infoSection}
          product={product}
          mainProduct={mainProduct}
        />
      </div>
    </div>
  ) : null;
};

export default Product;
