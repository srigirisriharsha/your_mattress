import React from 'react';
import choose1 from '../../../assets/Images/matrices/category1.jpg';
import choose2 from '../../../assets/Images/matrices/category2.jpg';
import choose3 from '../../../assets/Images/matrices/category3.avif';

const ShopByCategories = () => {
  return (
    <div className="w-full bg-white">
      <div className="w-full flex flex-col justify-center items-center mt-3">
        <div className="flex flex-col justify-center items-center mt-3">
          <h1
            className="text-xl md:text-3xl  text-center"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Shop By Category
          </h1>
          <div className="w-[10%] h-[1.5px] bg-blue-500 mt-1 items-center"></div>
          {/* <p className="text-sm text-gray-700">
          Match Your Sleep Style with the Perfect Bed
        </p> */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center mt-4">
          <div className="w-50 h-64 cursor-pointer bg-white  ">
            <img
              src={choose1}
              className="w-full h-[200px] object-cover rounded-xl hover:scale-105 transition-transform duration-300"
            />
            <div className="flex items-center justify-center h-[calc(100%-200px)]">
              <p className="text-center font-semibold">Mattress / Beddings</p>
            </div>
          </div>
          <div className="w-50 h-64 cursor-pointer bg-white  ">
            <img
              src={choose2}
              className="w-full h-[200px] object-cover rounded-xl hover:scale-105 transition-transform duration-300"
            />
            <div className="flex items-center justify-center h-[calc(100%-200px)]">
              <p className="text-center font-semibold">Pillows</p>
            </div>
          </div>
          <div className="w-50 h-64 cursor-pointer bg-white  ">
            <img
              src={choose3}
              className="w-full h-[200px] object-cover rounded-xl hover:scale-105 transition-transform duration-300"
            />
            <div className="flex items-center justify-center h-[calc(100%-200px)]">
              <p className="text-center font-semibold">Bed Sheets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopByCategories;
