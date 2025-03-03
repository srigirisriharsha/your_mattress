import React from 'react';
import matriceslayers from '../../assets/Images/matrices/matress_layers.jpg';

const ProductKeyFeatures = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row  justify-center p-4">
        {/* Left Section: Image */}
        <div className="md:w-1/2 w-full p-4">
          {/* <div className='flex flex-row items-center'> */}
          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Key Features Inside
          </h1>
          <div className="flex-grow h-[1px] bg-blue-500 px-3 mt-1"></div>
          <div className="p-4">
            <ul
              className="list-disc pl-5 text-lg"
              style={{ fontFamily: 'Lora, serif' }}
            >
              <li>
                Luxurious knitted fabric with Soft Foam Quilting on both sides
              </li>
              <li>Memory foam</li>
              <li>High resilience softy foam</li>
              <li>High quality polypropylene mesh as insulator</li>
              <li>Individually covered pocketed spring</li>
              <li>High density rubberized coir sheet</li>
            </ul>
          </div>
        </div>
        <div className="md:w-1/2 w-full">
          <img src={matriceslayers} alt="Sample" className="w-full h-80" />
        </div>

        {/* Right Section: Content */}
      </div>
    </div>
  );
};

export default ProductKeyFeatures;
