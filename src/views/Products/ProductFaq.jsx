import React from 'react';

const ProductFaq = ({ productDetails, scrollDirection }) => {
  return (
    <div>
      <h1
        className="text-3xl md:text-3xl"
        style={{ fontFamily: 'Times New Roman, Times, serif' }}
      >
        FAQ
      </h1>
      <div className="w-full h-[1px] bg-blue-500 px-3 mt-1"></div>
      <div className="bg-white rounded-xl p-4  lg:mt-10 lg:ml-8">
        {productDetails?.faq?.map((e, i) => (
          <div
            key={i}
            className={`${
              scrollDirection === 'up' ? 'animate-slideDown' : 'animate-slideUp'
            } flex flex-col`}
          >
            <div>
              <p className="text-md font-semibold text-gray-900 mt-2">
                Q. {e?.question}
              </p>
            </div>
            <p className="text-gray-600 mt-2">A. {e.answers}</p>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFaq;
