import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';

// Custom Previous Arrow Button
const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
    onClick={onClick}
  >
    ‹
  </button>
);

// Custom Next Arrow Button
const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
    onClick={onClick}
  >
    ›
  </button>
);

const ProductImageSlider = ({ images }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const mainSliderSettings = {
    asNavFor: nav2,
    ref: (slider) => (sliderRef1 = slider),
    arrows: false, // No arrows on the main slider
  };

  const thumbSliderSettings = {
    asNavFor: nav1,
    ref: (slider) => (sliderRef2 = slider),
    slidesToShow: 4,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
    prevArrow: <PrevArrow />, // Custom Previous Arrow
    nextArrow: <NextArrow />, // Custom Next Arrow
    centerMode: true,
    centerPadding: '10px',
  };

  return (
    <div className="relative product-slider-container">
      {/* Main Slider */}
      <div className="main-slider">
        <Slider {...mainSliderSettings}>
          {images?.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Product Image ${index + 1}`}
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Thumbnail Slider with Arrows */}
      <div className="thumb-slider relative bg-gray-200 p-2">
        <Slider {...thumbSliderSettings}>
          {images?.map((image, index) => (
            <div key={index} className="px-2">
              {/* Add padding or margin for space */}
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-image w-full h-full object-cover cursor-pointer"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImageSlider;
