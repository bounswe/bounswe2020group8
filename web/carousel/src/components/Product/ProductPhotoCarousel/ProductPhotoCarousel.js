import Image from "react-image-resizer";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ReactImageZoom from "react-image-zoom";
import React from "react";

const ProductPhotoCarousel = (props) => {
  const renderDotsItem = ({ isActive, activeIndex }) => {
    return (
      <div
        style={{
          height: 50,
          width: 50,
          margin: 2,
          border: isActive ? "1px solid #afafaf" : "0px",
          borderRadius: "5px",
          padding: 2,
        }}
      >
        <Image src={props.photoUrls[activeIndex]} width={46} height={46} />
      </div>
    );
  };

  return (
    <AliceCarousel
      autoHeight={true}
      autoWidth={true}
      renderDotsItem={renderDotsItem}
      disableButtonsControls
    >
      {props.photoUrls.map((url) => {
        return (
          <div
            style={{
              width: "100%",
              height: "100%",
              textAlign: "center",
              alignContent: "center",

              backgroundColor: "white",
            }}
          >

            <Image src={url} width={500} height={300} />
          </div>
        );
      })}
    </AliceCarousel>
  );
};

export default ProductPhotoCarousel;
