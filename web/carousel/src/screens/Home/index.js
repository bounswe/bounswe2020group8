import ProductCarousel from "../../components/ProductList/ProductCarousel";
import beautyBanner from "../../assets/images/beauty_banner.png";
import fashionBanner from "../../assets/images/fashion_banner.png";
import smartphonesBanner from "../../assets/images/smartphones_banner.png";
import services from "../../apis/services";

import { Carousel } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [productList, setProductList] = useState([]);

  const getSearchedProducts = async () => {
    const payload = {
      query: "hotsellers",
    };

    let resp = {};
    resp = await services.post(
      "/product/search",
      {
        query: "hotsellers",
      },
      {}
    );
    let newProductList = {};
    newProductList["hotsellers"] = resp.data.data;

    const TOKEN = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${TOKEN}` },
    };

    if (TOKEN) {
      try {
        resp = await services.get("/customer/me/recommendations", config);
        newProductList["recommendations"] = resp.data.data;
      } catch {
        newProductList["recommendations"] = null;
      }
    } else {
      newProductList["recommendations"] = null;
    }

    resp = await services.post(
      "/product/search",
      {
        query: "trendings",
      },
      {}
    );
    newProductList["trendings"] = resp.data.data;

    setProductList(newProductList);
  };

  useEffect(() => {
    getSearchedProducts();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ paddingTop: "30px" }}>
          <div
            style={{
              width: "50%",
              margin: "50px auto",
              alignContent: "center",
            }}
          >
            <Carousel autoplay>
              <img src={fashionBanner} />
              <img src={beautyBanner} />
              <img src={smartphonesBanner} />
            </Carousel>
          </div>
        </div>
        <div style={{ paddingLeft: "100px" }}>
          {productList.hotsellers && (
            <ProductCarousel
              title={"Hotsellers"}
              productList={productList.hotsellers}
            />
          )}
          {productList.recommendations && (
            <ProductCarousel
              title={"Recommendations"}
              productList={productList.recommendations}
            />
          )}
          {productList.trendings && (
            <ProductCarousel
              title={"Trendings"}
              productList={productList.trendings}
            />
          )}
        </div>
      </header>
    </div>
  );
}
