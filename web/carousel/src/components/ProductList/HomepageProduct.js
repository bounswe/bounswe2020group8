import styles from "./HomepageProduct.module.css";
import Image from "react-image-resizer";
import FixedDiv from "../UI/FixedDiv/FixedDiv";
import { withRouter } from "react-router-dom";

const HomepageProduct = (props) => {
  const { product } = props;
  const { mainProduct, minPrice } = product;
  const { title, rating, numberOfRating } = mainProduct[0];
  const photos = product.product.photos;
  console.log(product);
  return (
    <div className={styles.HomepageProduct}>
      <div
        onClick={() => {
          props.history.push(`/product/${mainProduct[0]._id}`);
        }}
      >
        <FixedDiv width={250} height={35}>
          <p>{title}</p>
        </FixedDiv>
        <FixedDiv width={250} height={150} margin={"20px 0px"}>
          <Image height={150} width={250} src={photos[0]} />
        </FixedDiv>
        <FixedDiv width={250} height={15} margin={"0px 0px 30px 0px"}>
          <p className={styles.Price}>
            {" "}
            <b>${minPrice}</b>
          </p>
        </FixedDiv>
      </div>

      <button className={styles.Button}>Add to Cart</button>
    </div>
  );
};

export default withRouter(HomepageProduct);
