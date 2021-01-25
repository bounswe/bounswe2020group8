import React, { useContext, useState, useRef, useEffect } from "react";
import classes from "./Product.module.css";
import SectionToggle from "./ProductInfo/SectionToggle";
import ProductHeader from "./ProductHeader/ProductHeader";
import ProductActions from "./ProductActions/ProductActions";
import scrollIntoView from "scroll-into-view-if-needed";
import ProductPhotoCarousel from "./ProductPhotoCarousel/ProductPhotoCarousel";
import Recommendations from "./Recommendations/Recommendations";
import "react-alice-carousel/lib/alice-carousel.css";
import services from "../../apis/services";
import { useParams, withRouter } from "react-router-dom";

const Product = (props) => {
  const { id } = useParams();

  const [infoSection, setInfoSection] = useState("features");
  const [product, setProduct] = useState(null);
  const [mainProduct, setMainProduct] = useState(null);
  const [allProducts, setAllProducts] = useState(null);
  const [productInfo, setProductInfo] = useState(null);

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
      let vendorName = "";
      const vendorId = productList[0].default.vendorID;
      vendorName = productList[0].vendorSpecifics.filter(
        (v) => v.vendorID._id === vendorId
      )[0].vendorID.companyName;
      setProductInfo({ ...productList[0].default, companyName: vendorName });
    });
  }, []);

  const scrollToInfo = (section) => {
    setInfoSection(section);
    window.scrollTo({
      left: 0,
      top: 480,
      behavior: "smooth",
    });
    setTimeout(() => {
      setInfoSection("");
    }, 500);
  };
  const handleOnProductChange = (value) => {
    const newProduct = allProducts.filter(
      (product) => product._id === value
    )[0];
    setProduct(newProduct);

    let vendorName = "";
    const vendorId = newProduct.default.vendorID;
    vendorName = newProduct.vendorSpecifics.filter(
      (v) => v.vendorID._id === vendorId
    )[0].vendorID.companyName;
    setProductInfo({ ...newProduct.default, companyName: vendorName });
  };

  const handleCartClicked = async ({ productId, vendorId }) => {
    const loggedIn = localStorage.getItem("login");
    if (loggedIn === "false") {
      const id = localStorage.getItem("guestID");
      const URL = "/guest/shoppingCart/main";
      const payload = {
        productId: productId,
        vendorId: vendorId,
        amount: 1,
        _id: id,
      };
      console.log(payload);
      services
        .post(URL, payload)
        .then(response => {

        })
        .catch(error => {
          console.log(error);
        })
    } else {
      const TOKEN = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${TOKEN}` },
      };
      const payload = {
        productId: productId,
        vendorId: vendorId,
        amount: 1,
      };
      const URL = "/customer/shoppingCart/main";
      services
        .post(URL, payload, config)
        .then((response) => {
          props.history.push("/account/cart");
        })
        .catch((err) => console.log(err));
    }


    // if (!TOKEN || TOKEN === "") {
    //   props.history.push("/login");
    // }
    // const config = {
    //   headers: { Authorization: `Bearer ${TOKEN}` },
    // };
    // const payload = {
    //   productId: productId,
    //   vendorId: vendorId,
    //   amount: 1,
    // };
    // const URL = "/customer/shoppingCart/main";
    // services
    //   .post(URL, payload, config)
    //   .then((response) => {
    //     props.history.push("/account/cart");
    //   })
    //   .catch((err) => console.log(err));
  };

  return productInfo ? (
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
            price={productInfo.price}
            name={mainProduct.title}
            rating={mainProduct.rating}
            brand={mainProduct.brand}
          />
          <ProductActions
            seller={productInfo.companyName} //TODO
            sellerId={productInfo.vendorID}
            defaultProduct={product.option}
            productList={allProducts}
            onProductChange={handleOnProductChange}
            handleAddToCart={() =>
              handleCartClicked({
                productId: product._id,
                vendorId: productInfo.vendorID,
              })
            }
            clickSellers={() => scrollToInfo("sellers")}
          />
        </div>
      </div>
      <div style={{ height: "40px" }} />
      <div className={classes.Recommendation}>
        <Recommendations productId={product._id} />
      </div>
      <div style={{ height: "40px" }} />
      <div className={classes.ProductInfo} ref={sectionRef}>
        <SectionToggle
          section={infoSection}
          product={product}
          mainProduct={mainProduct}
          setProductInfo={setProductInfo}
        />
      </div>
    </div>
  ) : null;
};

export default withRouter(Product);
