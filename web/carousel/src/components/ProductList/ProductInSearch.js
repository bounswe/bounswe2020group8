import styles from './ProductInSearch.module.css';
import ButtonPrimary from '../UI/ButtonPrimary/ButtonPrimary';
import classes from './ProductInSearch.module.css';
import Image from 'react-image-resizer';
import FixedDiv from '../UI/FixedDiv/FixedDiv';

const productInSearch = (props) => {
    const product = props.product;
    return (
        <div className={styles.ProductInSearch}>
            <FixedDiv width={250} height={35}>
                <p>{product.name}</p>
            </FixedDiv>
            <FixedDiv width={250} height={150} margin={'20px 0px'}>
                <Image height={150} width={250} src={product.imageUrl} />
            </FixedDiv>
            <FixedDiv width={250} height={15} margin={"0px 0px 30px 0px"}>
                <p className={styles.Price}> <b>${product.price}</b></p>
            </FixedDiv>

            <button className={styles.Button}>Add to Cart</button>
        </div>
    )
}

export default productInSearch;