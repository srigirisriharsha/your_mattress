import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the carousel CSS
import Slider from 'react-slick';
import { Rating } from '../../../components/Rating/Rating';
import { testimonials } from '../../../components/CustomComponents/utils';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'black',
        borderRadius: '50px',
      }}
      onClick={onClick}
    />
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'black',
        borderRadius: '50px',
      }}
      onClick={onClick}
    />
  );
}
export const settings = {
  className: 'center',
  centerMode: true,
  infinite: true,
  centerPadding: '60px',
  slidesToShow: 3, // default for larger screens
  speed: 500,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 768, // for mobile screens
      settings: {
        slidesToShow: 1, // show 1 slide on mobile
        centerPadding: '10px',
      },
    },
    {
      breakpoint: 1024, // for tablets and larger screens
      settings: {
        slidesToShow: 3, // show 3 slides on larger screens
        centerPadding: '60px',
      },
    },
  ],
};
const TestimonialCarousel = () => {
  return (
    <div className="animate-slideUp mt-2 bg-white">
      <div className="">
        <div className="flex flex-col justify-center items-center ">
          <h1
            className="text-xl md:text-3xl  text-center mt-5"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Customers Review
          </h1>
          <div className="w-[10%] h-[1.5px] bg-blue-500 mt-1 items-center"></div>
        </div>
      </div>
      <div className="slider-container bg-white p-6 m-6">
        <Slider {...settings}>
          {testimonials?.map((e, i) => (
            <div key={i}>
              <div className="mr-4 mb-4 p-4 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={e.image}
                    alt={e.name}
                    className="w-20 h-20 mb-2 rounded-full object-cover"
                    onError={(e) => {
                      // Fallback in case of an image load failure
                      e.target.src = 'https://via.placeholder.com/200';
                    }}
                  />
                  <b className="text-center">{e.name}</b>
                  <div className="flex items-center justify-center">
                    <Rating rating={e?.stars} />
                  </div>
                </div>
                <div className="relative h-60">
                  <p className="absolute inset-0 flex items-center justify-center text-black text-center p-4">
                    {e.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
