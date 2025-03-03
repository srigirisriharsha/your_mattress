import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoProducts } from '../../../components/CustomComponents/utils';
import 'react-toastify/dist/ReactToastify.css';
import { FaBed, FaSquare } from 'react-icons/fa';
import { FaCartShopping, FaMattressPillow } from 'react-icons/fa6';
import { PriceComponent } from '../../../components/PriceDetailer/Price';
import { Rating } from '../../../components/Rating/Rating';
import { useAuth } from '../../../context/MainContext';

// Product Card Component
const ProductCard = ({ product, goToProductView, goToProductViewToCart }) => (
  <div
    key={product.key}
    className="bg-white border p-4 rounded-lg shadow-md cursor-pointer w-full"
    onClick={(e) => {
      e.stopPropagation();
      goToProductView(product);
    }}
  >
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 w-full">
      {/* Product Image */}
      <div className="w-full h-48 sm:h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden">
        <img
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering the parent div's click event
            goToProductViewToCart(product.id);
          }}
          src={product.image}
          alt={product.name}
          className="w-full h-full cursor-pointer object-cover transform transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col lg:flex-row justify-between w-full">
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
          <div className="gap-4">
            <button
              onClick={() => goToProductView(product.id)}
              className="bg-black text-white text-center rounded-lg p-1 w-32 mt-3 transform transition duration-500 ease-in-out hover:scale-110"
              // className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-center rounded-lg p-1 w-32 mt-3 transform transition duration-500 ease-in-out hover:scale-110"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AdminAddOrder = () => {
  const { adminCart } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const goToProductView = (product) => {
    navigate(`/admin/add-order-product/${product?.id}`);
  };

  const goToProductViewToCart = (productId) => {
    navigate(`/admin/product/${productId}`);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  // Filter products based on selected type
  const filteredData = demoProducts.filter((product) => {
    const productName = product?.name?.toLowerCase();
    const matchesType = selectedType ? product.type === selectedType : true;
    return matchesType && productName.includes(searchTerm.toLowerCase());
  });
  const handleSelectType = (type) => {
    setSelectedType(type); // Update selected type
  };
  return (
    <div className="min-h-screen animate-slideUp m-4">
      <div className="bg-white rounded-lg shadow-md p-2 ">
        <div className="flex justify-between items-center">
          <h1
            className="text-3xl md:text-3xl"
            style={{ fontFamily: 'Times New Roman, Times, serif' }}
          >
            Add Order
          </h1>
          <div className="">
            {adminCart?.length > 0 ? (
              <>
                <div>
                  <button
                    disabled={adminCart?.length === 0}
                    onClick={() => navigate('/admin/Cart/')}
                    className="border bg-black  text-white p-2 rounded-lg w-full gap-2 h-10 flex items-center justify-center"
                  >
                    <FaCartShopping />
                    Cart
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="w-full h-[2px]  bg-[#1d4ed8]  mt-2"></div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-4 mt-4">
        {/* Filters Section */}
        <div className="lg:w-1/4 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow p-2">
          <ul className="my-4 space-y-3">
            <li
              onClick={() => handleSelectType('mattress')}
              className={`flex items-center p-3 text-base font-bold text-gray-900 rounded-lg ${selectedType === 'mattress' ? 'bg-violet-600 hover:bg-violet-700 text-white' : ''} bg-gray-50 hover:bg-gray-200 group hover:shadow cursor-pointer`}
            >
              <FaBed />
              <span className="flex-1 ms-3 whitespace-nowrap">Mattresses</span>
              <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded">
                Popular
              </span>
            </li>
            <li
              onClick={() => handleSelectType('pillow')}
              className={`${selectedType === 'pillow' ? 'bg-violet-600 hover:bg-violet-700 text-white' : ''} flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-200 group hover:shadow cursor-pointer`}
            >
              <FaMattressPillow />
              <span className="flex-1 ms-3 whitespace-nowrap">Pillows</span>
            </li>
            <li
              onClick={() => handleSelectType('bed_cover')}
              className={`${selectedType === 'bed_cover' ? 'bg-violet-600 hover:bg-violet-700 text-white' : ''} flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-200 group hover:shadow cursor-pointer`}
            >
              <FaSquare />
              <span className="flex-1 ms-3 whitespace-nowrap">Bed Covers</span>
            </li>
          </ul>
        </div>

        {/* Products Section */}
        <div className="lg:w-3/4 w-full">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleSearch(e.target.value);
              }}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 w-full mt-4">
            {filteredData.map((product) => (
              <ProductCard
                key={product.key}
                product={product}
                goToProductView={goToProductView}
                goToProductViewToCart={goToProductViewToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddOrder;
