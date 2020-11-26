import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import ProductInSearch from './ProductInSearch'
import classes from './ProductCarousel.module.css'

const productCarousel = props => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  return (
    <div className={classes.ProductCarousel}>
      <h2 className={classes.Header}>{props.title}</h2>
      <Carousel
        swipeable={false}
        draggable={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        transitionDuration={500}
        containerClass='carousel-container'
        removeArrowOnDeviceType={['tablet', 'mobile']}
        deviceType={props.deviceType}
        dotListClass='custom-dot-list-style'
        itemClass='carousel-item-padding-40-px'
      >
        {props.productList.map(product => {
          return <ProductInSearch product={product} />
        })}
      </Carousel>
    </div>
  )
}

export default productCarousel
