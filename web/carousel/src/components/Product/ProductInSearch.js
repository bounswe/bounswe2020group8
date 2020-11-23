import styles from './ProductInSearch.module.css';

const productInSearch = (props) => {
    const product = props.product;
    return (
        <div className={styles.ProductInSearch}>
            <img className={styles.Image} src={product.imageUrl} />
            <p>{product.name}</p>
            <p><b>${product.price}</b></p>
        </div>
    )
}

export default productInSearch;