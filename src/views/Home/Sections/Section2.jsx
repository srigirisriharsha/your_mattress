import React from 'react';
import choose1 from '../../../assets/Images/matrices/choose1.webp';
import choose2 from '../../../assets/Images/matrices/choose2.webp';
import choose3 from '../../../assets/Images/matrices/choose3.webp';
import choose4 from '../../../assets/Images/matrices/choose4.webp';
import choose5 from '../../../assets/Images/matrices/choose5.jfif';

const Section2 = () => {
  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-center items-center mt-3">
        <div className="flex flex-col justify-center items-center">
          <h1
            className="text-xl md:text-3xl  text-center"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Discover Your Perfect Bed
          </h1>
          <div className="w-[10%] h-[1.5px] bg-blue-500 mt-1 items-center"></div>
          <p className="text-sm text-gray-700">
            Match Your Sleep Style with the Perfect Bed
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center mt-4">
          <div className="w-50 h-64 cursor-pointer bg-white hover:scale-105 transition-transform duration-300">
            <img src={choose1} className="w-full h-[200px] object-cover" />
            <div className="flex items-center justify-center h-[calc(100%-200px)]">
              <p className="text-center font-semibold">
                Orthopedic Firm Support
              </p>
            </div>
          </div>
          <div className="w-50 h-64 cursor-pointer bg-white hover:scale-105 transition-transform duration-300">
            <img src={choose1} className="w-full h-[200px] object-cover" />
            <div className="flex items-center justify-center h-[calc(100%-200px)]">
              <p className="text-center font-semibold">
                Budget-Conscious Choices
              </p>
            </div>
          </div>
          <div className="w-50 h-64 cursor-pointer bg-white hover:scale-105 transition-transform duration-300">
            <img src={choose2} className="w-full h-[200px] object-cover" />
            <div className="flex items-center justify-center h-[calc(100%-200px)]">
              <p className="text-center font-semibold">Trending Items</p>
            </div>
          </div>
          <div className="w-50 h-64 cursor-pointer bg-white hover:scale-105 transition-transform duration-300">
            <img src={choose3} className="w-full h-[200px] object-cover" />
            <div className="flex items-center justify-center h-[calc(100%-200px)]">
              <p className="text-center font-semibold">
                Upgrade from Old to New
              </p>
            </div>
          </div>
          <div className="w-50 h-64 cursor-pointer bg-white hover:scale-105 transition-transform duration-300">
            <img src={choose4} className="w-full h-[200px] object-cover" />
            <div className="flex items-center justify-center h-[calc(100%-200px)]">
              <p className="text-center font-semibold">Latex/Foam Matrress</p>
            </div>
          </div>
          <div className="w-50 h-64 cursor-pointer bg-white hover:scale-105 transition-transform duration-300">
            <img src={choose5} className="w-full h-[200px]" />
            <div className="flex items-center justify-center h-[calc(100%-200px)]">
              <p className="text-center font-semibold">Big Size Matrress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
