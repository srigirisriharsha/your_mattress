import React from 'react';
import { StarIcon } from '@heroicons/react/solid';
import { FirstLetters } from '../../components/CustomComponents/utils';

const ProductCustomerReviews = ({ productDetails, scrollDirection }) => {
  // Helper to create an array for rating stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} className="w-5 h-5 text-yellow-500" />);
    }
    if (halfStar) {
      stars.push(
        <StarIcon key="half" className="w-5 h-5 text-yellow-500 opacity-50" />
      );
    }
    return stars;
  };
  return (
    <div>
      <h1
        className="text-3xl md:text-3xl"
        style={{ fontFamily: 'Times New Roman, Times, serif' }}
      >
        Customer Reviews
      </h1>
      <div className="w-full h-[1px] bg-blue-500 px-3 mt-1"></div>
      <div className="flex flex-col lg:flex-row justify-between ">
        {/* Left Column: Ratings Section */}
        <div className="flex flex-col lg:w-1/3">
          <div
            className={`${
              scrollDirection === 'up' ? 'animate-slideDown' : 'animate-slideUp'
            } flex flex-col mt-10`}
          >
            <div className="flex flex-col justify-center items-center text-center p-4">
              <div className="flex items-center mb-4">
                <p className="text-5xl font-bold ml-2 text-gray-800">
                  {productDetails?.rating}
                </p>
                <StarIcon className="text-[#FFD700] w-12 h-12 ml-2" />
              </div>
              <p className="text-gray-500 text-sm">
                Overall rating of this product
              </p>
            </div>
            <div className="flex flex-col w-full p-4 h-64 overflow-y-auto">
              {productDetails?.ratingsData?.map((rating, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full py-1"
                >
                  {/* Rating and Star */}
                  <div className="flex items-center min-w-[50px]">
                    <p className="text-lg font-medium text-gray-700 ml-2">
                      {rating.rating}
                    </p>
                    <StarIcon className="text-[#FFD700] w-6 h-6 ml-1" />
                  </div>

                  {/* Progress Bar */}
                  <div className="flex-1 mx-4">
                    <div className="w-full rounded-full h-2.5 bg-gray-200">
                      <div
                        className="bg-purple-600 h-2.5 rounded-full"
                        style={{
                          width: `${(rating.count / productDetails?.ratingsData[0].count) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Rating Count */}
                  <div className="min-w-[50px] text-right">
                    <p className="text-sm text-gray-500">{rating.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Customer QnA */}
        <div className="lg:w-2/3 bg-white rounded-xl p-4 mt-10 lg:mt-10 lg:ml-8 shadow-[0_4px_6px_rgba(67,47,132,0.3)] h-[400px] overflow-y-auto">
          {/* <h1 className="text-3xl font-bold text-gray-800"> Customers QnA </h1> */}
          {productDetails?.customerReviews?.map((e, i) => (
            <div
              key={i}
              className={`${
                scrollDirection === 'up'
                  ? 'animate-slideDown'
                  : 'animate-slideUp'
              } flex flex-col`}
            >
              <div className="flex items-start space-x-4 p-4 border-b border-gray-300">
                <button
                  className="rounded-full w-12 h-12 bg-gray-200"
                  title={e.name}
                >
                  {FirstLetters(e.name)}
                </button>

                {/* Review Content */}
                <div className="flex-1">
                  {/* Star Rating & Date */}
                  <div>
                    <p className="text-gray-700 text-lg font-bold">{e.name}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {renderStars(Number(e.rating))}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{e?.date}</span>
                  {/* Review Text */}
                  <div>
                    <p className="text-md font-semibold text-gray-900 mt-2">
                      {e?.title}
                    </p>
                  </div>
                  <p className="text-gray-600 mt-2">{e.comments}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCustomerReviews;
