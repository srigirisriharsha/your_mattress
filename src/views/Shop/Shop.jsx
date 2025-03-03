import React from 'react';

import { Rating } from '../../components/Rating/Rating';
import { PriceComponent } from '../../components/PriceDetailer/Price';
import { useNavigate } from 'react-router-dom';
import { demoProducts } from '../../components/CustomComponents/utils';

const Shop = () => {
  const navigate = useNavigate();
  const products = demoProducts;
  const goToProductView = (productId) => {
    navigate(`/product/${productId}`);
  };
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="bg-white w-full  mx-auto shadow-lg p-4">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Shop Mattresses
          </h1>
          <div className="bg-gray-100 shadow-lg p-4 rounded-md mb-6">
            {/* <h2 className="text-xl font-bold mb-4 text-gray-700">Filter</h2> */}

            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Search Input */}
              <div className="flex flex-col w-full md:w-1/3">
                <label
                  htmlFor="search"
                  className="font-medium text-gray-600 mb-1"
                >
                  Search:
                </label>
                <input
                  type="text"
                  id="search"
                  placeholder="Search"
                  className="block w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Price Range Filter */}
              <div className="flex flex-col items-start md:w-1/3">
                <label
                  htmlFor="priceRange"
                  className="font-medium text-gray-600 mb-1"
                >
                  Price Range:
                </label>
                <div className="flex items-center">
                  <input
                    type="range"
                    id="priceRange"
                    min="0"
                    max="1000"
                    className="cursor-pointer"
                    onChange={(e) => console.log(e.target.value)} // Handle price range change here
                  />
                  <span className="ml-2">0 - 1000</span>
                  {/* You can update this dynamically */}
                </div>
              </div>

              {/* Sort By Price Filter */}
              <div className="flex flex-col w-full md:w-1/3">
                <label
                  htmlFor="sortPrice"
                  className="font-medium text-gray-600 mb-1"
                >
                  Sort By:
                </label>
                <select
                  id="sortPrice"
                  className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => console.log(e.target.value)} // Handle sorting change here
                >
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {products?.map((product) => (
                <div
                  key={product.key}
                  className="border p-4 rounded-lg shadow-lg"
                >
                  <div className="flex flex-col">
                    <div className="w-full h-48 mb-2 rounded-lg overflow-hidden">
                      <img
                        onClick={() => goToProductView(product.id)}
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full cursor-pointer object-cover transform transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col">
                      <p
                        className="font-semibold cursor-pointer hover:underline"
                        onClick={() => goToProductView(product.id)}
                      >
                        {product.name}
                      </p>
                      <div className="flex items-center">
                        <Rating rating={product.rating} />
                        <p className="ms-2 text-sm font-bold text-gray-900 dark:text-white">
                          {product.rating} / 5
                        </p>
                        <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                        <span className="cursor-pointer text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                          {product.reviews} reviews
                        </span>
                      </div>
                      <p className="text-gray-500">
                        {product.totalOrders} bought this product last month
                      </p>
                      <PriceComponent
                        actualPrice={product.actualPrice}
                        discountPrice={product.discountPrice}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => goToProductView(product.id)}
                        className="bg-yellow-500 text-white text-center rounded-lg p-1 w-32 mt-3 transform transition duration-500 ease-in-out hover:scale-110"
                        // className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-center rounded-lg p-1 w-32 mt-3 transform transition duration-500 ease-in-out hover:scale-110"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
