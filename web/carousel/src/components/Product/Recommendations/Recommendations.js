import { useEffect, useState } from "react";
import services from "../../../apis/services";
import ProductCarousel from "../../../components/ProductList/ProductCarousel";

const Recommendations = ({ productId }) => {
  const [products, setProducts] = useState(null);
  useEffect(async () => {
    const url = `/product/recommendations/${productId}`;
    const resp = await services.get(url, {});
    setProducts(resp.data.data);
    console.log(resp);
  }, [productId]);

  return (
    <div style={{ paddingLeft: "20px" }}>
      {products && (
        <ProductCarousel
          title={"Related Products"}
          productList={products}
          items={3}
        />
      )}
    </div>
  );
};

export default Recommendations;
