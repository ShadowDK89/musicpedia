import React, { useEffect, useState } from "react";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import "./Carousel.scss";
import { TCarousel } from "../../Models/TCarousel";

type TCarouselProps = {
  imgArr: TCarousel[];
};

const Carousel: React.FC<TCarouselProps> = ({ imgArr }) => {
  const defaultCarousel: TCarousel[] = [];
  const [carouselArr, setCarouselArr] = useState(defaultCarousel);
  let flickityOptions = {
    groupCells: false,
  };

  useEffect(() => {
    setCarouselArr(imgArr);
  }, [imgArr]);

  const carouselArrHtml = carouselArr.map((img) => {
    return (
      <React.Fragment>
        <div key={img.name} className="carousel-cell">
          <img src={img.source} alt="" />
          <div>
            <a href="#">{img.name}</a>
          </div>
        </div>
      </React.Fragment>
    );
  });

  return (
    <div className="carousel-container">
      <Flickity
        className={"carousel"}
        elementType={"div"}
        options={flickityOptions}
      >
        {carouselArrHtml}
      </Flickity>
    </div>
  );
};

export default Carousel;
