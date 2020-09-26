import React from "react";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Carousel = ({ images }) => {
  return (
    <ResponsiveCarousel showStatus={false} showArrows={true} showThumbs={false}>
      {images.map(image => (
        <img
          key="image"
          style={{ objectFit: "cover" }}
          height={200}
          alt="business cover"
          src={image}
        />
      ))}
    </ResponsiveCarousel>
  );
};

export default Carousel;
